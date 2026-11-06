/**
 * Campo de formulario genérico (input, textarea o select) con label y mensaje de error accesible
 * @method Campo
 * @param {Object} props - propiedades del componente
 * @param {string} props.id - id del campo (también se usa como name)
 * @param {string} props.etiqueta - texto del label
 * @param {string} [props.tipo] - 'textarea', 'select' o el type de un input
 * @param {string} props.error - mensaje de error ('' si no hay)
 * @param {JSX.Element} [props.children] - options, solo para select
 * @return {JSX.Element}
 */
const Campo = ({ id, etiqueta, tipo = 'text', error, children, ...resto }) => {
  const idError = `${id}-error`
  const propiedades = {
    id,
    name: id,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': error ? idError : undefined,
    ...resto,
  }

  return (
    <div className="campo">
      <label htmlFor={id}>{etiqueta}</label>
      {tipo === 'textarea' && <textarea {...propiedades} />}
      {tipo === 'select' && <select {...propiedades}>{children}</select>}
      {tipo !== 'textarea' && tipo !== 'select' && <input type={tipo} {...propiedades} />}
      {error && (
        <p id={idError} className="error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default Campo