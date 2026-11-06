const CLAVE_SESION = 'usuarioActivo'

/**
 * Guarda en localStorage el nombre del usuario que inició sesión
 * @method guardarSesion
 * @param {Object} usuario - usuario que inició sesión
 */
export const guardarSesion = (usuario) =>
  localStorage.setItem(CLAVE_SESION, JSON.stringify({ nombre: usuario.nombre }))

/**
 * Devuelve el usuario que tiene la sesión iniciada
 * @method obtenerSesion
 * @return {Object|null} usuario activo, o null si no hay sesión
 */
export const obtenerSesion = () => JSON.parse(localStorage.getItem(CLAVE_SESION))