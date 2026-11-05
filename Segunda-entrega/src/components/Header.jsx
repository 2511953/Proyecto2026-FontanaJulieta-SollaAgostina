import { Link, useNavigate } from 'react-router-dom'
import logo from '@assets/logo.png'

/**
 * Header con navegación y botón para cerrar sesión
 * @method Header
 * @return {JSX.Element}
 */
const Header = () => {
  const navigate = useNavigate()

  /**
   * Borra el usuario activo y vuelve al index
   * @method cerrarSesion
   */
  const cerrarSesion = () => {
    localStorage.removeItem('usuarioActivo')
    navigate('/')
  }

  return (
    <header>
      <nav>
        <img src={logo} alt="Logo de patitas" id="logo" />
        <h1 id="textologo">Patitas</h1>
        <ul>
          <li><Link to="/inicio">Inicio</Link></li>
          <li><Link to="/explorar">Explorar</Link></li>
          <li>
            <button type="button" className="cerrar-sesion" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header