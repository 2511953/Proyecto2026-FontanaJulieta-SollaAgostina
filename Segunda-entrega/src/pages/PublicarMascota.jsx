import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Campo from '@components/Campo'
import GrupoOpciones from '@components/GrupoOpciones'
import { crearMascota } from '@api/mascotas'
import { APTO, ESPECIES, GENEROS, PERSONALIDAD, SALUD, TAMANIOS } from '@data/opciones'
import { leerArchivo } from '@utils/imagenes'
import { obtenerSesion } from '@utils/sesion'
import { hayErrores, validarMinimo, validarObligatorio } from '@utils/validaciones'

const DATOS_INICIALES = {
  nombre: '',
  especie: '',
  raza: '',
  edad: '',
  tamanio: '',
  genero: '',
  descripcion: '',
  perfilAdoptante: '',
}
const LISTAS_INICIALES = { salud: [], personalidad: [], apto: [] }
const TAMANIO_MAXIMO_FOTO = 1000000
const ERROR_FOTO_OBLIGATORIA = 'Tenés que subir la foto principal'

/**
 * Valida un campo del formulario de publicar mascota
 * @method validarCampo
 * @param {string} nombre - nombre del campo
 * @param {string} valor - valor escrito o elegido por el usuario
 * @return {string} mensaje de error ('' si está bien)
 */
const validarCampo = (nombre, valor) =>
  nombre === 'descripcion' ? validarMinimo(valor, 20) : validarObligatorio(valor)

/**
 * Formulario para publicar una mascota en adopción
 * @method PublicarMascota
 * @return {JSX.Element}
 */
const PublicarMascota = () => {
  const navigate = useNavigate()
  const sesion = obtenerSesion()
  const [datos, setDatos] = useState(DATOS_INICIALES)
  const [listas, setListas] = useState(LISTAS_INICIALES)
  const [foto, setFoto] = useState('')
  const [errores, setErrores] = useState({})
  const [errorEnvio, setErrorEnvio] = useState('')

  /**
   * Guarda lo que escribe el usuario y valida el campo en tiempo real
   * @method manejarCambio
   * @param {Event} evento - evento change del campo
   */
  const manejarCambio = (evento) => {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
    setErrores({ ...errores, [name]: validarCampo(name, value) })
  }

  /**
   * Marca o desmarca una opción de salud, personalidad o apto
   * @method manejarLista
   * @param {Event} evento - evento change del checkbox
   */
  const manejarLista = (evento) => {
    const { name, value, checked } = evento.target
    const actual = listas[name]
    setListas({
      ...listas,
      [name]: checked ? [...actual, value] : actual.filter((opcion) => opcion !== value),
    })
  }

  /**
   * Lee la foto elegida y valida que exista y no sea muy pesada
   * @method manejarFoto
   * @param {Event} evento - evento change del input file
   */
  const manejarFoto = async (evento) => {
    const archivo = evento.target.files[0]
    let contenido = ''
    let error = ''

    if (!archivo) {
      error = ERROR_FOTO_OBLIGATORIA
    } else if (archivo.size > TAMANIO_MAXIMO_FOTO) {
      error = 'La foto no puede superar 1 MB'
    } else {
      try {
        contenido = await leerArchivo(archivo)
      } catch (e) {
        error = e.message
      }
    }

    setFoto(contenido)
    setErrores((previos) => ({ ...previos, foto: error }))
  }

  /**
   * Valida todo el formulario y publica la mascota
   * @method publicar
   * @param {Event} evento - evento submit del formulario
   */
  const publicar = async (evento) => {
    evento.preventDefault()
    setErrorEnvio('')

    const nuevosErrores = { foto: foto ? '' : ERROR_FOTO_OBLIGATORIA }
    Object.keys(DATOS_INICIALES).forEach((campo) => {
      nuevosErrores[campo] = validarCampo(campo, datos[campo])
    })
    setErrores(nuevosErrores)
    if (hayErrores(nuevosErrores)) return

    try {
      await crearMascota({
        ...datos,
        ...listas,
        tipo: 'Adopción',
        publicadoPor: sesion.nombre,
        imagen: foto,
      })
      navigate('/inicio')
    } catch {
      setErrorEnvio('No se pudo publicar la mascota. Probá de nuevo.')
    }
  }

  return (
    <section className="publicar-mascota">
      <Link to="/inicio" className="volver">
        Volver
      </Link>
      <h2>Datos de la mascota</h2>
      <p>Completá toda la info para encontrar el hogar ideal</p>

      <form onSubmit={publicar} noValidate>
        <Campo
          id="foto"
          etiqueta="📷 Foto principal *"
          tipo="file"
          accept="image/*"
          onChange={manejarFoto}
          error={errores.foto}
        />
        <Campo
          id="nombre"
          etiqueta="Nombre *"
          placeholder="Mochi"
          maxLength={20}
          size={30}
          value={datos.nombre}
          onChange={manejarCambio}
          error={errores.nombre}
        />
        <Campo
          id="especie"
          etiqueta="Especie *"
          tipo="select"
          value={datos.especie}
          onChange={manejarCambio}
          error={errores.especie}
        >
          <option value="">Seleccioná una opción</option>
          {ESPECIES.map((especie) => (
            <option key={especie} value={especie}>
              {especie}
            </option>
          ))}
        </Campo>
        <Campo
          id="raza"
          etiqueta="Raza *"
          placeholder="Golden Retriever"
          maxLength={40}
          size={30}
          value={datos.raza}
          onChange={manejarCambio}
          error={errores.raza}
        />
        <Campo
          id="edad"
          etiqueta="Edad *"
          placeholder="2 años"
          maxLength={20}
          size={30}
          value={datos.edad}
          onChange={manejarCambio}
          error={errores.edad}
        />
        <Campo
          id="tamanio"
          etiqueta="Tamaño *"
          tipo="select"
          value={datos.tamanio}
          onChange={manejarCambio}
          error={errores.tamanio}
        >
          <option value="">Seleccioná una opción</option>
          {TAMANIOS.map((tamanio) => (
            <option key={tamanio} value={tamanio}>
              {tamanio}
            </option>
          ))}
        </Campo>

        <GrupoOpciones
          leyenda="Género *"
          nombre="genero"
          tipo="radio"
          opciones={GENEROS}
          valores={[datos.genero]}
          onChange={manejarCambio}
          error={errores.genero}
        />
        <GrupoOpciones
          leyenda="Salud"
          nombre="salud"
          opciones={SALUD}
          valores={listas.salud}
          onChange={manejarLista}
        />
        <GrupoOpciones
          leyenda="Personalidad"
          nombre="personalidad"
          opciones={PERSONALIDAD}
          valores={listas.personalidad}
          onChange={manejarLista}
        />
        <GrupoOpciones
          leyenda="Apto para"
          nombre="apto"
          opciones={APTO}
          valores={listas.apto}
          onChange={manejarLista}
        />

        <Campo
          id="descripcion"
          etiqueta="Descripción *"
          tipo="textarea"
          rows={6}
          maxLength={500}
          placeholder="Contá la historia de tu mascota, su personalidad y por qué buscás un nuevo hogar..."
          value={datos.descripcion}
          onChange={manejarCambio}
          error={errores.descripcion}
        />
        <p className="contador">
          <small>{datos.descripcion.length}/20 mín.</small>
        </p>
        <Campo
          id="perfilAdoptante"
          etiqueta="Perfil del adoptante ideal *"
          tipo="textarea"
          rows={4}
          maxLength={300}
          placeholder="¿Qué tipo de familia buscás?"
          value={datos.perfilAdoptante}
          onChange={manejarCambio}
          error={errores.perfilAdoptante}
        />

        {errorEnvio && (
          <p className="error" role="alert">
            {errorEnvio}
          </p>
        )}

        <button type="submit" className="publicar">
          Publicar ahora 🐾
        </button>
      </form>
    </section>
  )
}

export default PublicarMascota