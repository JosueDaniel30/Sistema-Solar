export const PLANETS = [
  { id: 'mercury', name: { es:'Mercurio', en:'Mercury' }, model: 'assets/models/mercury.glb', brief: { es:'El más cercano al Sol.', en:'Closest planet to the Sun.' }, data: { size:'4,879 km', moons:0, distance:'57.9 M km' } },
  { id: 'venus',   name: { es:'Venus',   en:'Venus'   }, model: 'assets/models/venus.glb',   brief: { es:'Clima extremo y denso.', en:'Extremely hot and dense atmosphere.' }, data: { size:'12,104 km', moons:0, distance:'108.2 M km' } },
  { id: 'earth',   name: { es:'Tierra',  en:'Earth'   }, model: 'assets/models/earth.glb',   brief: { es:'Nuestro hogar azul.', en:'Our blue home.' }, data: { size:'12,742 km', moons:1, distance:'149.6 M km' } },
  { id: 'mars',    name: { es:'Marte',   en:'Mars'    }, model: 'assets/models/mars.glb',    brief: { es:'Planeta rojo.', en:'The red planet.' }, data: { size:'6,779 km', moons:2, distance:'227.9 M km' } },
  { id: 'jupiter', name: { es:'Júpiter', en:'Jupiter' }, model: 'assets/models/jupiter.glb', brief: { es:'Gigante gaseoso.', en:'Gas giant.' }, data: { size:'139,820 km', moons:79, distance:'778.5 M km' } },
  { id: 'saturn',  name: { es:'Saturno', en:'Saturn'  }, model: 'assets/models/saturn.glb',  brief: { es:'Anillos espectaculares.', en:'Spectacular rings.' }, data: { size:'116,460 km', moons:82, distance:'1.429 B km' } },
  { id: 'uranus',  name: { es:'Urano',   en:'Uranus'  }, model: 'assets/models/uranus.glb',  brief: { es:'Eje inclinado.', en:'Tilted axis.' }, data: { size:'50,724 km', moons:27, distance:'2.871 B km' } },
  { id: 'neptune', name: { es:'Neptuno', en:'Neptune' }, model: 'assets/models/neptune.glb', brief: { es:'Vientos extremos.', en:'Extreme winds.' }, data: { size:'49,244 km', moons:14, distance:'4.495 B km' } }
];
export const DEFAULT_LANG = 'es';