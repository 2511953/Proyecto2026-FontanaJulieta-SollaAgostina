/**
 * Lee el id de la mascota que viene en la URL (adoptar.html?id=4)
 * @method obtenerId
 * @return {number} id de la mascota
 */
const obtenerId = () => {
    let id = window.location.search.split("=")[1];
    return Number(id);
};

/**
 * Busca en el array de mascotas la que tiene ese id
 * @method buscarMascota
 * @param {number} id - id de la mascota
 * @return {object} la mascota encontrada (o undefined si no existe)
 */
const buscarMascota = (id) => {
    return mascotas.find(m => m.id === id);
};

/**
 * Adapta el mensaje de adopción a la mascota elegida
 * @method mostrarMensaje
 */
const mostrarMensaje = () => {
    let mascota = buscarMascota(obtenerId());

    if (mascota) {
        document.title = `Adoptar a ${mascota.nombre}`;
        document.getElementById("nombre-mascota").innerText = mascota.nombre;
        document.getElementById("nombre-mascota-2").innerText = mascota.nombre;
        document.getElementById("publicado-por").innerText = mascota.publicadoPor;
        document.getElementById("publicado-por-2").innerText = mascota.publicadoPor;
    } else {
        document.getElementById("titulo").innerText = "No encontramos a esa mascota";
        document.getElementById("texto-principal").innerText = "Volvé a explorar para elegir una mascota.";
        document.getElementById("texto-secundario").innerText = "";
    }
};

document.addEventListener("DOMContentLoaded", mostrarMensaje);