/**
 * Verifica que un campo no esté vacío
 * @method campoVacio
 * @param {string} valor - lo que escribió el usuario
 * @param {string} nombreCampo - nombre del campo, para el mensaje
 * @return {boolean} true si está vacío (hay error)
 */
const campoVacio = (valor, nombreCampo) => {
    if (valor.trim() === "") {
        alert(`El campo ${nombreCampo} no puede estar vacío`);
        return true;
    }
    return false;
};

/**
 * Verifica que el texto tenga un mínimo de caracteres
 * @method textoCorto
 * @param {string} valor - lo que escribió el usuario
 * @param {number} minimo - cantidad mínima de caracteres
 * @param {string} nombreCampo - nombre del campo, para el mensaje
 * @return {boolean} true si es muy corto (hay error)
 */
const textoCorto = (valor, minimo, nombreCampo) => {
    if (valor.length < minimo) {
        alert(`El campo ${nombreCampo} debe tener al menos ${minimo} caracteres`);
        return true;
    }
    return false;
};

/**
 * Verifica que el valor sea un número
 * @method noEsNumero
 * @param {string} valor - lo que escribió el usuario
 * @param {string} nombreCampo - nombre del campo, para el mensaje
 * @return {boolean} true si no es un número (hay error)
 */
const noEsNumero = (valor, nombreCampo) => {
    if (valor.includes(",")) {
        valor = valor.replace(",", ".");
    }
    if (valor.trim() === "" || isNaN(valor)) {
        alert(`El campo ${nombreCampo} debe ser un número`);
        return true;
    }
    return false;
};

/**
 * Verifica que el email tenga un @ y un punto
 * @method emailInvalido
 * @param {string} email - email que escribió el usuario
 * @return {boolean} true si el email es inválido (hay error)
 */
const emailInvalido = (email) => {
    if (!email.includes("@") || !email.includes(".")) {
        alert("El email ingresado no es válido");
        return true;
    }
    return false;
};

/**
 * Verifica que las dos contraseñas sean iguales
 * @method passwordsDistintas
 * @param {string} password1 - contraseña
 * @param {string} password2 - confirmación de la contraseña
 * @return {boolean} true si son distintas (hay error)
 */
const passwordsDistintas = (password1, password2) => {
    if (password1 !== password2) {
        alert("Las contraseñas no coinciden");
        return true;
    }
    return false;
};

/**
 * Verifica que no se haya dejado una opción sin elegir (radio o select)
 * @method sinSeleccion
 * @param {string} valor - valor elegido (vacío si no eligió nada)
 * @param {string} nombreCampo - nombre del campo, para el mensaje
 * @return {boolean} true si no eligió nada (hay error)
 */
const sinSeleccion = (valor, nombreCampo) => {
    if (valor === "" || valor === null) {
        alert(`Tenés que elegir una opción en ${nombreCampo}`);
        return true;
    }
    return false;
};

/**
 * Verifica que se haya subido un archivo
 * @method sinArchivo
 * @param {object} archivo - archivo del input type="file"
 * @param {string} nombreCampo - nombre del campo, para el mensaje
 * @return {boolean} true si no hay archivo (hay error)
 */
const sinArchivo = (archivo, nombreCampo) => {
    if (archivo === undefined) {
        alert(`Tenés que subir ${nombreCampo}`);
        return true;
    }
    return false;
};

/**
 * Valida el formulario de publicar mascota
 * @method validarPublicacion
 * @param {object} form - el formulario de publicar
 * @return {boolean} true si todo está bien
 */
const validarPublicacion = (form) => {
    const genero = form.querySelector('input[name="genero"]:checked');

    if (sinArchivo(form.foto1.files[0], "la foto principal")) return false;
    if (campoVacio(form.nombre.value, "nombre")) return false;
    if (campoVacio(form.especie.value, "especie")) return false;
    if (campoVacio(form.raza.value, "raza")) return false;
    if (campoVacio(form.edad.value, "edad")) return false;
    if (sinSeleccion(form.tamanio.value, "tamaño")) return false;
    if (sinSeleccion(genero ? genero.value : "", "género")) return false;
    if (textoCorto(form.descripcion.value, 20, "descripción")) return false;
    if (campoVacio(form.publicadoPor.value, "tu nombre")) return false;

    return true;
};