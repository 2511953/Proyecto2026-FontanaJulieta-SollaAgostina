import { Outlet } from 'react-router-dom'
import Header from '@components/Header'

/**
 * Estructura común de las páginas internas: header + contenido de la ruta hija
 * @method Layout
 * @return {JSX.Element}
 */
const Layout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
  </>
)

export default Layout