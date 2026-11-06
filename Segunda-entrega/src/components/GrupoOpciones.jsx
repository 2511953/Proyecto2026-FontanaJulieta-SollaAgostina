/**
 * Grupo de checkbox o radio con leyenda y mensaje de error accesible
 * @method GrupoOpciones
 * @param {Object} props - propiedades del componente
 * @param {string} props.leyenda - título del grupo
 * @param {string} props.nombre - name de todas las opciones
 * @param {Array<string>} props.opciones - opciones a mostrar
 * @param {Array<string>} props.valores - opciones seleccionadas
 * @param {Function} props.onChange - se ejecuta al marcar o desmarcar
 * @param {string} [props.tipo] - 'checkbox' (por defecto) o 'radio'
 * @param {string} [props.error] - mensaje de error
 * @return {JSX.Element}
 */
const GrupoOpciones = ({ leyenda, nombre, opciones, valores, onChange, tipo = 'checkbox', error }) => {
  const idError = `${nombre}-error`

  return (
    <fieldset aria-describedby={error ? idError : undefined}>
      <legend>{leyenda}</legend>
      {opciones.map((opcion, indice) => (
        <div key={opcion} className="opcion">
          <input
            type={tipo}
            id={`${nombre}-${indice}`}
            name={nombre}
            value={opcion}
            checked={valores.includes(opcion)}
            onChange={onChange}
          />
          <label htmlFor={`${nombre}-${indice}`}>{opcion}</label>
        </div>
      ))}
      {error && (
        <p id={idError} className="error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  )
}

export default GrupoOpciones