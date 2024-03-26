import './Select.scss'
import '../Input.scss'

function Select({ name = '', value = '', children = '', selectClasses = '', label = '', id = '', onChange = () => { } }) {
  if (!id) id = name;
  const handleChange = (e) => {
    onChange(e.target);
  }
  return (
    <div className='input-group select-menu'>
      <label htmlFor={id}>{label}</label>
      <select className={selectClasses} name={name} id={id} onChange={handleChange} value={value}>
        {children}
      </select>
    </div>
  )
}
export default Select;