import { useEffect, useState } from 'react'
import Card from '@components/Card'
import { obtenerMascotas } from '@api/mascotas'

/**
 * Catálogo con todas las mascotas disponibles
 * @method Explorar
 * @return {JSX.Element}
 */
const Explorar = () => {
  const [mascotas, setMascotas] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    /**
     * Carga todas las mascotas desde la API
     * @method cargarMascotas
     */
    const cargarMascotas = async () => {
      try {
        setMascotas(await obtenerMascotas())
      } catch (e) {
        setError(e.message)
      }
    }
    cargarMascotas()
  }, [])

  return (
    <section className="explorar">
      <h2>Explorar</h2>
      <p>Mascotas disponibles: {mascotas.length}</p>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <div className="cuadrilla">
        {mascotas.map((mascota) => (
          <Card key={mascota.id} mascota={mascota} />
        ))}
      </div>
    </section>
  )
}

export default Explorar