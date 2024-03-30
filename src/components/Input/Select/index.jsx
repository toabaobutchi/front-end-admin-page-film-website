import './Select.scss'
import '../Input.scss'
import { useState } from 'react';

function Select({ name = '', value = '', children = '', selectClasses = '', label = '', id = '', onChange = () => { } }) {
  if (!id) id = name;
  const [state, setState] = useState(value)
  const handleChange = (e) => {
    setState(e.target.value)
    onChange(e.target);
  }
  return (
    <div className='input-group select-menu'>
      <label htmlFor={id}>{label}</label>
      <select className={selectClasses} name={name} id={id} onChange={handleChange} value={state}>
        {children}
      </select>
    </div>
  )
}
export default Select;