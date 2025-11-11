import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js';
import { PLANETS, DEFAULT_LANG } from './planets.js';

const root = document.getElementById('app-root');
root.innerHTML = `<div class="layout">
<aside class="sidebar">
<h1 id="app-title">Planetas</h1>
<select id="lang-select"><option value="es">ES</option><option value="en">EN</option></select>
<div id="planet-list" class="planet-list"></div></aside>
<main class="viewer-area"><div id="viewer" class="viewer"></div>
<div id="info" class="info-box"><h2 id="info-title"></h2><p id="info-brief"></p></div></main></div>`;

let lang = DEFAULT_LANG;
const listEl = document.getElementById('planet-list');
const titleEl = document.getElementById('info-title');
const briefEl = document.getElementById('info-brief');

function renderList(){
  listEl.innerHTML = '';
  PLANETS.forEach((p,i)=>{
    const btn = document.createElement('button');
    btn.className = 'planet-btn';
    btn.textContent = p.name[lang];
    btn.addEventListener('click', ()=> focusPlanet(i));
    listEl.appendChild(btn);
  });
}

const container = document.getElementById('viewer');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(800, 600);
container.appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 800/600, 0.1, 5000);
camera.position.set(0, 40, 180);
const hemi = new THREE.HemisphereLight(0xffffff, 0x222244, 0.7); scene.add(hemi);
const dir = new THREE.DirectionalLight(0xffffff, 1.0); dir.position.set(100, 160, 80); scene.add(dir);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; controls.minDistance = 20; controls.maxDistance = 800;
const loader = new GLTFLoader();
const modelsGroup = new THREE.Group(); scene.add(modelsGroup);
let currentModel = null;

async function loadModelOrFallback(index){
  const p = PLANETS[index];
  if(currentModel){ modelsGroup.remove(currentModel); currentModel = null; }
  try{
    const gltf = await loader.loadAsync(p.model);
    const model = gltf.scene || gltf.scenes[0];
    model.scale.setScalar(8); model.position.set(0,0,0);
    modelsGroup.add(model); currentModel = model;
  }catch(err){
    const geom = new THREE.SphereGeometry(12,64,64);
    const mat = new THREE.MeshStandardMaterial({ color: 0x8888ff, metalness:0.05, roughness:0.85 });
    const sph = new THREE.Mesh(geom,mat); modelsGroup.add(sph); currentModel = sph;
  }
}

function focusPlanet(i){
  loadModelOrFallback(i);
  titleEl.textContent = PLANETS[i].name[lang];
  briefEl.textContent = PLANETS[i].brief[lang];
}

renderList(); focusPlanet(2);

gsap.from('#viewer',{duration:1,opacity:0,y:20});
const clock=new THREE.Clock();
function animate(){ requestAnimationFrame(animate); const dt=clock.getDelta(); if(currentModel) currentModel.rotation.y+=0.2*dt; controls.update(); renderer.render(scene,camera);} animate();

document.getElementById('lang-select').addEventListener('change',(e)=>{ lang=e.target.value; renderList(); });
