import { Link } from 'react-router-dom'
import { rutaImagen } from '@utils/imagenes'

/**
 * Tarjeta de una mascota con foto, nombre, especie y botón para ver más
 * @method Card
 * @param {Object} props - propiedades del componente
 * @param {Object} props.mascota - datos de la mascota
 * @return {JSX.Element}
 */
const Card = ({ mascota }) => (
  <article className="mascotas">
    <img src={rutaImagen(mascota.imagen)} alt={`${mascota.nombre}, ${mascota.raza}`} />
    <h3>{mascota.nombre}</h3>
    <p>{mascota.especie}</p>
    <Link to={`/mascota/${mascota.id}`} className="boton">
      Ver Mascota
    </Link>
  </article>
)

export default Card