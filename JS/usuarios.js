/**
 * Devuelve la lista de usuarios guardados en localStorage
 * @method obtenerUsuarios()
 * @return {Array} lista de usuarios (vacía si no hay ninguno)
 */
const obtenerUsuarios = () => {
    return JSON.parse(localStorage.getItem("usuarios")) || [];
}

/**
 * Lee el formulario de crear cuenta, valida y guarda el usuario
 * @method registrar()
 * @param evento - el evento submit del formulario
 */
const registrar = (evento) => {
    evento.preventDefault();

    const form = evento.target;
    if (!validarRegistro(form)) return;

    const usuario = {
        id: Date.now(),
        nombre: form.nombre.value.trim(),
        sexo: form.sexo.value,
        dni: form.dni.value,
        email: form.email.value.trim().toLowerCase(),
        password: form.password.value,
        ubicacion: form.ubicacion.value.trim(),
        tags: [...form.querySelectorAll('input[name="tags"]:checked')].map(c => c.value),
    };

    const usuarios = obtenerUsuarios();
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    window.location.href = "iniciarsesion.html";
};

/**
 * Lee el formulario de iniciar sesión y deja entrar solo si los datos coinciden
 * @method iniciarSesion()
 * @param evento - el evento submit del formulario
 */
const iniciarSesion = (evento) => {
    evento.preventDefault();

    const form = evento.target;
    if (!validarLogin(form)) return;

    const email = form.email.value.trim().toLowerCase();
    const password = form.password.value;
    const usuarios = obtenerUsuarios();

    if (usuarios.length === 0) {
        alert("No hay cuentas registradas. Creá una cuenta primero");
        return;
    }

    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (!usuario) {
        alert("El email o la contraseña son incorrectos");
        return;
    }

    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    window.location.href = "inicio.html";
};

const iniciar = () => {
    const formRegistro = document.querySelector("#form-registro");
    const formLogin = document.querySelector("#form-login");

    if (formRegistro) formRegistro.addEventListener("submit", registrar);
    if (formLogin) formLogin.addEventListener("submit", iniciarSesion);
};

document.addEventListener("DOMContentLoaded", iniciar);