/**
 * Devuelve la ruta de la imagen de una mascota
 * @method rutaImagen
 * @param {string} imagen - nombre del archivo (carpeta public/mascotas) o imagen en base64
 * @return {string} ruta lista para usar en un img
 */
export const rutaImagen = (imagen) =>
  imagen.startsWith('data:') ? imagen : `${import.meta.env.BASE_URL}mascotas/${imagen}`

/**
 * Convierte un archivo de imagen a texto base64
 * @method leerArchivo
 * @param {File} archivo - imagen elegida por el usuario
 * @return {Promise<string>} la imagen en base64
 */
export const leerArchivo = (archivo) =>
  new Promise((resolve, reject) => {
    const lector = new FileReader()
    lector.onload = () => resolve(lector.result)
    lector.onerror = () => reject(new Error('No se pudo leer la foto'))
    lector.readAsDataURL(archivo)
  })