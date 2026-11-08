import { Navigate, Outlet } from 'react-router-dom'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { obtenerSesion } from '@utils/sesion'

/**
 * Estructura común de las páginas internas: header, contenido de la ruta hija y footer.
 * Si no hay sesión iniciada, vuelve al index
 * @method Layout
 * @return {JSX.Element}
 */
const Layout = () => {
  if (!obtenerSesion()) return <Navigate to="/" replace />

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout