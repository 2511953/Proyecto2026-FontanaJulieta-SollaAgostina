/**
 * Muestra la cantidad de mascotas publicadas
 * @method mostrarCantidad()
 */
const mostrarCantidad = () => {
    document.querySelector("#cantidad-mascotas").textContent = mascotas.length;
};

document.addEventListener("DOMContentLoaded", mostrarCantidad);

/**
 * Arma una tarjeta por cada mascota del array
 * @method mostrarTarjetas()
 */
const mostrarTarjetas = () => {
    document.querySelector(".cuadrilla").innerHTML = mascotas
    .map(m => `
        <div class="mascotas">
            <img src="${m.imagen}" alt="${m.nombre}">
            <h3>${m.nombre}</h3>
            <button type="button"><a href="vistaAmpliada.html?id=${m.id}">Ver Mascota</a></button>
            </div>`)
    .join("");
};

const iniciar = () => {
    mostrarCantidad();
    mostrarTarjetas();
};

document.addEventListener("DOMContentLoaded", iniciar);