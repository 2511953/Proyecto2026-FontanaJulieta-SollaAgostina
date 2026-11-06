const API_URL = 'http://localhost:3001/usuarios'

/**
 * Busca un usuario por email
 * @method buscarUsuario
 * @param {string} email - email del usuario
 * @return {Promise<Object|undefined>} el usuario, o undefined si no existe
 */
export const buscarUsuario = async (email) => {
  const respuesta = await fetch(`${API_URL}?email=${encodeURIComponent(email)}`)
  if (!respuesta.ok) throw new Error('No se pudo consultar el usuario')
  const usuarios = await respuesta.json()
  return usuarios[0]
}

/**
 * Crea una cuenta nueva
 * @method crearUsuario
 * @param {Object} usuario - datos del usuario
 * @return {Promise<Object>} el usuario creado
 */
export const crearUsuario = async (usuario) => {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario),
  })
  if (!respuesta.ok) throw new Error('No se pudo crear la cuenta')
  return respuesta.json()
}