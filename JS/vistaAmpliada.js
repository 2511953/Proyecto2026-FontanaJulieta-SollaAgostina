/**
 * Consulta el id de la URL para encontrar la mascota correspondiente
 * @method obtenerMascota
 * @return {object} la mascota encontrada (o undefined si no existe)
 */
const obtenerMascota = () => {
  const id = Number(new URLSearchParams(window.location.search).get("id"));
  return mascotas.find(m => m.id === id);
};

/**
 * Muestra los datos de la mascota seleccionada
 * @method mostrarMascota
 * @param {object} mascota - los datos de la mascota que se seleccionó
 */
const mostrarMascota = (mascota) => {
  document.title = `${mascota.nombre} - ${mascota.tipo}`;

  document.querySelector("#mascota-adopcion").innerHTML =
    `<img src="${mascota.imagen}" alt="${mascota.nombre}, ${mascota.raza}">
    <a href="Explorar.html" id="boton-volver" title="Volver a explorar" class="volver">Volver</a>`;

  document.querySelector("#mascota").innerHTML =
    `<h1>${mascota.nombre}</h1>
    <h3>${mascota.raza} · ${mascota.edad}</h3>`;

  document.querySelector("#tipo-publicacion").innerHTML =
    `<strong>${mascota.tipo}</strong>`;

  const etiquetas = [mascota.genero, mascota.tamanio, ...mascota.salud, ...mascota.personalidad, ...mascota.apto];

  document.querySelector("#etiquetas").innerHTML = etiquetas
    .map(texto => `<li class="item">${texto}</li>`)
    .join("");

  document.querySelector("#datos-mascota").innerHTML =
    `<h2>Sobre ${mascota.nombre}</h2>
    <p>${mascota.descripcion}</p>`;

  document.querySelector("#perfil-familia").innerHTML =
    `<h2>🏠 Perfil del adoptante ideal</h2>
    <p>${mascota.perfilAdoptante}</p>`;

  document.querySelector("#datos-publicante").innerHTML =
    `<small>Publicado por <strong>${mascota.publicadoPor}</strong></small>`;

  // El botón "Quiero adoptar" lleva el id de la mascota
  document.getElementById("boton-adoptar").href = `adoptar.html?id=${mascota.id}`;
};

/**
 * Hace que arranque lo que hicimos antes
 * @method iniciar
 */
const iniciar = () => {
  const mascota = obtenerMascota();
  if (mascota) {
    mostrarMascota(mascota);
  } else {
    document.querySelector("#mascota").innerHTML = "<h1>No encontramos a esa mascota</h1>";
  }
};

document.addEventListener("DOMContentLoaded", iniciar);

