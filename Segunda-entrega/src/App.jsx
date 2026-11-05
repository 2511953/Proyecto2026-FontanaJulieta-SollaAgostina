import { Routes, Route } from 'react-router-dom'
import Layout from '@components/Layout'
import Index from '@pages/Index'
import IniciarSesion from '@pages/IniciarSesion'
import CrearCuenta from '@pages/CrearCuenta'
import Inicio from '@pages/Inicio'
import Explorar from '@pages/Explorar'
import VistaAmpliada from '@pages/VistaAmpliada'
import Adoptar from '@pages/Adoptar'
import PublicarMascota from '@pages/PublicarMascota'

const App = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/iniciar-sesion" element={<IniciarSesion />} />
    <Route path="/crear-cuenta" element={<CrearCuenta />} />
    <Route element={<Layout />}>
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/explorar" element={<Explorar />} />
      <Route path="/mascota/:id" element={<VistaAmpliada />} />
      <Route path="/adoptar/:id" element={<Adoptar />} />
      <Route path="/publicar" element={<PublicarMascota />} />
    </Route>
  </Routes>
)

export default App