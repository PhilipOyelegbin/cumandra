export const FormInput = ({label, type, name, accept, classname, value, onchange, placeholder}) => {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} accept={accept} className={classname} value={value} onChange={onchange} placeholder={placeholder}/>
    </div>
  )
}

export const FormSelect = ({label, name, value, onchange, children}) => {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <select name={name} value={value} onChange={onchange}>
        {children}
      </select>
    </div>
  )
}

export const FormMultiText = ({label, name, placeholder, onchange, value}) => {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label> 
      <textarea name={name} cols="30" rows="5" value={value} placeholder={placeholder} onChange={onchange}></textarea>
    </div>
  )
}
