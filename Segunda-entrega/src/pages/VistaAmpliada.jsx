import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { obtenerMascota } from '@api/mascotas'
import { rutaImagen } from '@utils/imagenes'

/**
 * Vista ampliada de una mascota
 * @method VistaAmpliada
 * @return {JSX.Element}
 */
const VistaAmpliada = () => {
  const { id } = useParams()
  const [mascota, setMascota] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    /**
     * Carga la mascota elegida desde la API
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

  if (error) {
    return (
      <p className="error" role="alert">
        {error}
      </p>
    )
  }
  if (!mascota) return <p>Cargando...</p>

  const etiquetas = [
    mascota.genero,
    mascota.tamanio,
    ...mascota.salud,
    ...mascota.personalidad,
    ...mascota.apto,
  ]

  return (
    <article className="vista-ampliada">
      <header className="mascota-adopcion">
        <img src={rutaImagen(mascota.imagen)} alt={`${mascota.nombre}, ${mascota.raza}`} />
        <Link to="/explorar" className="volver">
          Volver
        </Link>
      </header>

      <section className="datos-principales">
        <div className="info">
          <h2>{mascota.nombre}</h2>
          <h3>
            {mascota.raza} · {mascota.edad}
          </h3>
        </div>
        <p className="tipo-publicacion">
          <strong>{mascota.tipo}</strong>
        </p>
        <ul className="etiquetas">
          {etiquetas.map((etiqueta) => (
            <li key={etiqueta} className="item">
              {etiqueta}
            </li>
          ))}
        </ul>
      </section>

      <section className="datos-mascota">
        <h3>Sobre {mascota.nombre}</h3>
        <p>{mascota.descripcion}</p>
      </section>

      <section className="perfil-familia">
        <h3>🏠 Perfil del adoptante ideal</h3>
        <p>{mascota.perfilAdoptante}</p>
      </section>

      <p className="datos-publicante">
        <small>
          Publicado por <strong>{mascota.publicadoPor}</strong>
        </small>
      </p>

      <Link to={`/adoptar/${mascota.id}`} className="adoptar">
        🐾 Quiero adoptar
      </Link>
    </article>
  )
}

export default VistaAmpliada