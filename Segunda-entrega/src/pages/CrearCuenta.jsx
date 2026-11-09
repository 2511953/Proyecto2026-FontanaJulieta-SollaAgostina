import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Campo from '@components/Campo'
import Footer from '@components/Footer'
import { buscarUsuario, crearUsuario } from '@api/usuarios'
import { guardarSesion } from '@utils/sesion'
import {
  hayErrores,
  validarEmail,
  validarMinimo,
  validarObligatorio,
  validarPasswordsIguales,
} from '@utils/validaciones'

const DATOS_INICIALES = { nombre: '', email: '', password: '', confirmacion: '' }

/**
 * Valida un campo del formulario de crear cuenta
 * @method validarCampo
 * @param {string} nombre - nombre del campo
 * @param {string} valor - valor escrito por el usuario
 * @param {string} password - contraseña escrita (para comparar con la confirmación)
 * @return {string} mensaje de error ('' si está bien)
 */
const validarCampo = (nombre, valor, password) => {
  if (nombre === 'email') return validarObligatorio(valor) || validarEmail(valor)
  if (nombre === 'password') return validarMinimo(valor, 8)
  if (nombre === 'confirmacion') {
    return validarObligatorio(valor) || validarPasswordsIguales(password, valor)
  }
  return validarObligatorio(valor)
}

/**
 * Página para crear una cuenta nueva
 * @method CrearCuenta
 * @return {JSX.Element}
 */
const CrearCuenta = () => {
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
    const nuevosErrores = { ...errores, [name]: validarCampo(name, value, datos.password) }
    if (name === 'password' && datos.confirmacion) {
      nuevosErrores.confirmacion = validarPasswordsIguales(value, datos.confirmacion)
    }
    setDatos({ ...datos, [name]: value })
    setErrores(nuevosErrores)
  }

  /**
   * Valida el formulario, crea la cuenta y guarda la sesión
   * @method registrar
   * @param {Event} evento - evento submit del formulario
   */
  const registrar = async (evento) => {
    evento.preventDefault()
    setErrorEnvio('')

    const nuevosErrores = {}
    Object.keys(DATOS_INICIALES).forEach((campo) => {
      nuevosErrores[campo] = validarCampo(campo, datos[campo], datos.password)
    })
    setErrores(nuevosErrores)
    if (hayErrores(nuevosErrores)) return

    try {
      const existente = await buscarUsuario(datos.email)
      if (existente) {
        setErrores({ ...nuevosErrores, email: 'Ya existe una cuenta con ese email' })
        return
      }
      const usuario = await crearUsuario({
        nombre: datos.nombre,
        email: datos.email,
        password: datos.password,
      })
      guardarSesion(usuario)
      navigate('/inicio')
    } catch {
      setErrorEnvio('No pudimos crear la cuenta. Probá de nuevo.')
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
        <div className="formulario">
          <h1>Creá tu cuenta 🐶</h1>
          <p>Completá tus datos para encontrar el match perfecto</p>

          <form onSubmit={registrar} noValidate>
            <Campo
              id="nombre"
              etiqueta="Nombre completo"
              placeholder="Ingresá tu nombre"
              maxLength={50}
              size={30}
              value={datos.nombre}
              onChange={manejarCambio}
              error={errores.nombre}
            />
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
            <Campo
              id="confirmacion"
              etiqueta="Confirmar contraseña"
              tipo="password"
              placeholder="********"
              maxLength={16}
              size={30}
              value={datos.confirmacion}
              onChange={manejarCambio}
              error={errores.confirmacion}
            />

            {errorEnvio && (
              <p className="error" role="alert">
                {errorEnvio}
              </p>
            )}

            <button type="submit" className="crear-cuenta">
              Crear cuenta
            </button>

            <p className="registro">
              ¿Ya tenés cuenta? <Link to="/iniciar-sesion">Iniciá sesión</Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default CrearCuenta