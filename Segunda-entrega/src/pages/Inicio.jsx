import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import banner from '@assets/banner.png'
import camara from '@assets/logo_camara.png'
import patita from '@assets/patita.png'
import Card from '@components/Card'
import { obtenerMascotas } from '@api/mascotas'
import { obtenerSesion } from '@utils/sesion'

const CANTIDAD_RECIENTES = 3

/**
 * Página de inicio: elegir entre publicar o adoptar, y ver las mascotas recién llegadas
 * @method Inicio
 * @return {JSX.Element}
 */
const Inicio = () => {
  const sesion = obtenerSesion()
  const [recientes, setRecientes] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    /**
     * Carga las últimas mascotas publicadas
     * @method cargarRecientes
     */
    const cargarRecientes = async () => {
      try {
        const mascotas = await obtenerMascotas()
        setRecientes(mascotas.slice(-CANTIDAD_RECIENTES))
      } catch (e) {
        setError(e.message)
      }
    }
    cargarRecientes()
  }, [])

  return (
    <section className="inicio">
      <small>Hola, {sesion.nombre} 👋</small>
      <h2 className="titulo">¿Qué querés hacer hoy?</h2>
      <img src={banner} alt="Mascotas esperando un hogar" className="banner" />

      <Link to="/publicar" className="botones">
        <img src={camara} alt="Cámara" />
        <div>
          <h3>Publicar mascota</h3>
          <span>Compartí la historia de tu peludo</span>
        </div>
      </Link>

      <Link to="/explorar" className="botones">
        <img src={patita} alt="Huella de mascota" />
        <div>
          <h3>Adoptar</h3>
          <span>Encontrá a tu compañero ideal</span>
        </div>
      </Link>

      <h3>¡Recién llegados!</h3>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <div className="cuadrilla">
        {recientes.map((mascota) => (
          <Card key={mascota.id} mascota={mascota} />
        ))}
      </div>
    </section>
  )
}

export default Inicio