/* =======================
     MÍMICAS
======================= */
const acciones = [
    "Astronauta flotando",
    "Alien saludando",
    "Nave despegando",
    "Planeta explotando",
    "Robot averiado",
    "Meteorito cayendo",
    "Satélite girando"
];

function mimica() {
    document.getElementById("muestraMimica").innerText =
        acciones[Math.floor(Math.random() * acciones.length)];
}

/* =======================
     PUZZLE
======================= */
function iniciarPuzzle() {
    const puzzle = document.getElementById("puzzle-container");
    if (!puzzle) return;

    let piezas = [];
    let posiciones = [...Array(9).keys()];
    posiciones.sort(() => Math.random() - 0.5);

    posiciones.forEach(i => {
        const div = document.createElement("div");
        div.classList.add("piece");
        div.style.backgroundImage = "url('../b327733e-415b-4b6f-8277-126522758c61.png')";
        div.style.backgroundPosition = `${-(i % 3) * 100}px ${-Math.floor(i / 3) * 100}px`;
        div.draggable = true;

        div.addEventListener("dragstart", dragStart);
        div.addEventListener("drop", drop);
        div.addEventListener("dragover", e => e.preventDefault());

        puzzle.appendChild(div);
    });
}

let piezaActual = null;
function dragStart() { piezaActual = this; }
function drop() {
    let temp = this.style.backgroundPosition;
    this.style.backgroundPosition = piezaActual.style.backgroundPosition;
    piezaActual.style.backgroundPosition = temp;
}

/* =======================
      MEMORAMA
======================= */
const symbols = ["🚀","👽","🛰️","☄️","🌌","🛸"];
let mem = [...symbols, ...symbols];
mem.sort(() => Math.random() - 0.5);

function iniciarMemorama(){
    const grid = document.getElementById("grid");
    if(!grid) return;

    let first = null, second = null, lock = false;

    mem.forEach(sym => {
        let c = document.createElement("div");
        c.classList.add("card");
        c.dataset.value = sym;

        c.onclick = function () {
            if (lock || this === first) return;

            this.innerText = this.dataset.value;

            if (!first) {
                first = this;
            } else {
                second = this;
                lock = true;

                setTimeout(() => {
                    if (first.dataset.value === second.dataset.value) {
                        first.style.background = "#044";
                        second.style.background = "#044";
                    } else {
                        first.innerText = "";
                        second.innerText = "";
                    }
                    first = null;
                    second = null;
                    lock = false;
                }, 600);
            }
        };
        grid.appendChild(c);
    });
}

/* =======================
   PREGUNTAS
======================= */
const preguntas = [
    { p: "¿Cuál es el planeta más grande?", o: ["Marte","Saturno","Júpiter"], c: 2 },
    { p: "¿Cómo se llama nuestra galaxia?", o: ["Andrómeda","Vía Láctea","Sombrero"], c: 1 }
];

let idx = 0;

function iniciarPreguntas(){
    const p = document.getElementById("pregunta");
    const opciones = document.getElementById("opciones");
    if(!p) return;

    function mostrar() {
        p.innerText = preguntas[idx].p;
        opciones.innerHTML = "";
        preguntas[idx].o.forEach((txt,i)=>{
            let op = document.createElement("div");
            op.classList.add("card");
            op.innerText = txt;
            op.onclick = ()=>respuesta(i);
            opciones.appendChild(op);
        });
    }

    function respuesta(i){
        const res = document.getElementById("resultado");
        res.innerText = (i === preguntas[idx].c) ? "Correcto ✔️" : "Incorrecto ❌";
    }

    mostrar();
}

/* Inicializar según página */
window.onload = () => {
    iniciarPuzzle();
    iniciarMemorama();
    iniciarPreguntas();
};
