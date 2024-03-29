import './Checkbox.scss'

function CheckBox({ label = '', inputAttributes = {}, onChange = () => {} }) {
  if (inputAttributes.type) {
    delete inputAttributes.type
  }
  const handleChange = e => {
    onChange(e.target)
  }
  return (
    <div className='input-group checkbox'>
      <input {...inputAttributes} type='checkbox' onChange={handleChange} />
      <label htmlFor={inputAttributes.id}>{label}</label>
    </div>
  )
}

export default CheckBox
