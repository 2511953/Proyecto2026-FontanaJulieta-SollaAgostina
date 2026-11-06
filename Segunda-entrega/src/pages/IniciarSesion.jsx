import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Campo from '@components/Campo'
import Footer from '@components/Footer'
import { buscarUsuario } from '@api/usuarios'
import { guardarSesion } from '@utils/sesion'
import { hayErrores, validarEmail, validarObligatorio } from '@utils/validaciones'

const DATOS_INICIALES = { email: '', password: '' }

/**
 * Valida un campo del formulario de inicio de sesión
 * @method validarCampo
 * @param {string} nombre - nombre del campo
 * @param {string} valor - valor escrito por el usuario
 * @return {string} mensaje de error ('' si está bien)
 */
const validarCampo = (nombre, valor) =>
  nombre === 'email' ? validarObligatorio(valor) || validarEmail(valor) : validarObligatorio(valor)

/**
 * Página para iniciar sesión
 * @method IniciarSesion
 * @return {JSX.Element}
 */
const IniciarSesion = () => {
  const navigate = useNavigate()
  const [datos, setDatos] = useState(DATOS_INICIALES)
  const [errores, setErrores] = useState({})
  const [errorEnvio, setErrorEnvio] = useState('')

  /**
   * Guarda lo que escribe el usuario y valida el campo en tiempo real
   * @method manejarCambio
   * @param {Event} evento - evento change del input
   */
  const manejarCambio = (evento) => {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
    setErrores({ ...errores, [name]: validarCampo(name, value) })
  }

  /**
   * Valida el formulario, comprueba el usuario y guarda la sesión
   * @method ingresar
   * @param {Event} evento - evento submit del formulario
   */
  const ingresar = async (evento) => {
    evento.preventDefault()
    setErrorEnvio('')

    const nuevosErrores = {
      email: validarCampo('email', datos.email),
      password: validarCampo('password', datos.password),
    }
    setErrores(nuevosErrores)
    if (hayErrores(nuevosErrores)) return

    try {
      const usuario = await buscarUsuario(datos.email)
      if (!usuario || usuario.password !== datos.password) {
        setErrorEnvio('El email o la contraseña no son correctos')
        setDatos({ ...datos, password: '' })
        return
      }
      guardarSesion(usuario)
      navigate('/inicio')
    } catch {
      setErrorEnvio('No pudimos conectar con el servidor. Probá de nuevo.')
    }
  }

  return (
    <>
      <header>
        <Link to="/" className="volver">
          Volver
        </Link>
      </header>
      <main>
        <div className="main">
          <h2>¡Bienvenido de vuelta! 🐾</h2>
          <p>Ingresá tus datos para continuar</p>

          <form onSubmit={ingresar} noValidate>
            <Campo
              id="email"
              etiqueta="Email"
              tipo="email"
              placeholder="usuario@dominio.com"
              maxLength={30}
              size={30}
              value={datos.email}
              onChange={manejarCambio}
              error={errores.email}
            />
            <Campo
              id="password"
              etiqueta="Contraseña"
              tipo="password"
              placeholder="********"
              maxLength={16}
              size={30}
              value={datos.password}
              onChange={manejarCambio}
              error={errores.password}
            />

            {errorEnvio && (
              <p className="error" role="alert">
                {errorEnvio}
              </p>
            )}

            <button type="submit" className="entrar">
              Entrar
            </button>

            <p className="registro">
              ¿No tenés una cuenta?{' '}
              <Link to="/crear-cuenta" className="registrate">
                Registrate
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default IniciarSesion