import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { obtenerMascota } from '@api/mascotas'
import { rutaImagen } from '@utils/imagenes'

/**
 * Mensaje de confirmación de la adopción con el nombre y la foto de la mascota
 * @method Adoptar
 * @return {JSX.Element}
 */
const Adoptar = () => {
  const { id } = useParams()
  const [mascota, setMascota] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    /**
     * Carga la mascota que se quiere adoptar
     * @method cargarMascota
     */
    const cargarMascota = async () => {
      try {
        setMascota(await obtenerMascota(id))
      } catch (e) {
        setError(e.message)
      }
    }
    cargarMascota()
  }, [id])

  return (
    <section className="mensaje-adopcion">
      <Link to={`/mascota/${id}`} className="volver">
        Volver
      </Link>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      {mascota && (
        <>
          <img
            src={rutaImagen(mascota.imagen)}
            alt={`Foto de ${mascota.nombre}`}
            className="adopcion"
          />
          <div className="texto">
            <h2>¡{mascota.nombre} te está esperando!</h2>
            <p>
              Conectate con {mascota.publicadoPor} y comenzá una historia de amor a cuatro patas.
            </p>
            <p>
              <small>
                Le notificaremos a <strong>{mascota.publicadoPor}</strong> que alguien especial
                quiere conocer a {mascota.nombre}.
              </small>
            </p>
          </div>
        </>
      )}
    </section>
  )
}

export default Adoptar