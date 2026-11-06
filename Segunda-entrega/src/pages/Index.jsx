import { Link } from 'react-router-dom'
import logo from '@assets/logo.png'
import Footer from '@components/Footer'

/**
 * Página principal: iniciar sesión o crear cuenta
 * @method Index
 * @return {JSX.Element}
 */
const Index = () => (
  <>
    <main className="index">
      <div className="main">
        <img src={logo} alt="Logo de Patitas" className="logo" />
        <h1>Patitas</h1>
        <h4>Adoptá o encontrá el match perfecto para tu próxima mascota con amor y seguridad.</h4>
        <Link to="/iniciar-sesion" className="botones-main">
          Iniciar sesión
        </Link>
        <Link to="/crear-cuenta" className="botones-main">
          Crear cuenta
        </Link>
        <p>Con amor, desde Argentina 🐶🐱</p>
      </div>
    </main>
    <Footer />
  </>
)

export default Index