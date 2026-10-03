/**
 * Devuelve el texto del label vinculado a un input
 * @method textoLabel()
 * @param form - el formulario
 * @param input - el input del que se quiere el label
 */
const textoLabel = (form, input) =>
    form.querySelector(`label[for="${input.id}"]`).textContent;

/**
 * Devuelve los textos de los checkbox marcados con ese name
 * @method obtenerMarcados()
 * @param form - el formulario
 * @param nombre - el name de los checkbox
 */
const obtenerMarcados = (form, nombre) =>
    [...form.querySelectorAll(`input[name="${nombre}"]:checked`)].map(c => textoLabel(form, c));

/**
 * Guarda una mascota nueva en localStorage
 * @method guardarMascota()
 * @param mascota - el objeto con los datos de la mascota
 */
const guardarMascota = (mascota) => {
    const publicadas = JSON.parse(localStorage.getItem("mascotasPublicadas")) || [];
    publicadas.push(mascota);
    localStorage.setItem("mascotasPublicadas", JSON.stringify(publicadas));
};

/**
 * Lee el formulario, arma la mascota y la guarda
 * @method publicar()
 * @param evento - el evento submit del formulario
 */
const publicar = (evento) => {
    evento.preventDefault();

    const form = evento.target;
    const archivo = form.foto1.files[0];
    const generoMarcado = form.querySelector('input[name="genero"]:checked');
    const lector = new FileReader();

    lector.onload = () => {
    const mascota = {
        id: Date.now(),
        nombre: form.nombre.value,
        especie: form.especie.value,
        raza: form.raza.value,
        edad: form.edad.value,
        tamanio: form.tamanio.selectedOptions[0].text,
        genero: textoLabel(form, generoMarcado),
        salud: obtenerMarcados(form, "salud"),
        personalidad: obtenerMarcados(form, "personalidad"),
        apto: obtenerMarcados(form, "apto"),
        descripcion: form.descripcion.value,
        perfilAdoptante: form.perfilAdoptante.value,
        tipo: "Adopción",
        publicadoPor: form.publicadoPor.value,
        imagen: lector.result,
    };

    guardarMascota(mascota);
    window.location.href = "Explorar.html";
    };

    lector.readAsDataURL(archivo);
};

const iniciar = () => {
    document.querySelector("#form-publicar").addEventListener("submit", publicar);
};

document.addEventListener("DOMContentLoaded", iniciar);