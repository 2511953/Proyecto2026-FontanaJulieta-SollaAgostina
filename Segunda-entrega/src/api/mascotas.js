const URL = 'http://localhost:3001/mascotas'

/**
 * Trae todas las mascotas
 * @method obtenerMascotas
 * @return {Promise<Array>} lista de mascotas
 */
export const obtenerMascotas = async () => {
  const respuesta = await fetch(URL)
  if (!respuesta.ok) throw new Error('No se pudieron cargar las mascotas')
  return respuesta.json()
}

/**
 * Trae una mascota por id
 * @method obtenerMascota
 * @param {string} id - id de la mascota
 * @return {Promise<Object>} la mascota
 */
export const obtenerMascota = async (id) => {
  const respuesta = await fetch(`${URL}/${id}`)
  if (!respuesta.ok) throw new Error('No encontramos esa mascota')
  return respuesta.json()
}

/**
 * Publica una mascota nueva
 * @method crearMascota
 * @param {Object} mascota - datos de la mascota
 * @return {Promise<Object>} la mascota creada
 */
export const crearMascota = async (mascota) => {
  const respuesta = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mascota),
  })
  if (!respuesta.ok) throw new Error('No se pudo publicar la mascota')
  return respuesta.json()
}