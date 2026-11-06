/**
 * Verifica que un campo no esté vacío
 * @method validarObligatorio
 * @param {string} valor - lo que escribió el usuario
 * @return {string} mensaje de error ('' si está bien)
 */
export const validarObligatorio = (valor) =>
  valor.trim() === '' ? 'Este campo no puede estar vacío' : ''

/**
 * Verifica que el texto tenga un mínimo de caracteres
 * @method validarMinimo
 * @param {string} valor - lo que escribió el usuario
 * @param {number} minimo - cantidad mínima de caracteres
 * @return {string} mensaje de error ('' si está bien)
 */
export const validarMinimo = (valor, minimo) =>
  valor.trim().length < minimo ? `Debe tener al menos ${minimo} caracteres` : ''

/**
 * Verifica que el email tenga formato válido
 * @method validarEmail
 * @param {string} email - email que escribió el usuario
 * @return {string} mensaje de error ('' si está bien)
 */
export const validarEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'El email ingresado no es válido'

/**
 * Verifica que las dos contraseñas sean iguales
 * @method validarPasswordsIguales
 * @param {string} password - contraseña
 * @param {string} confirmacion - confirmación de la contraseña
 * @return {string} mensaje de error ('' si está bien)
 */
export const validarPasswordsIguales = (password, confirmacion) =>
  password === confirmacion ? '' : 'Las contraseñas no coinciden'

/**
 * Indica si algún campo de un formulario tiene error
 * @method hayErrores
 * @param {Object} errores - objeto con el mensaje de error de cada campo
 * @return {boolean} true si hay al menos un error
 */
export const hayErrores = (errores) => Object.values(errores).some(Boolean)