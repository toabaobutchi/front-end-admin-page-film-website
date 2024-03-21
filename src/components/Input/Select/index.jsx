import './Select.scss'
import '../Input.scss'

function Select({name = '', children = '', selectClasses = '', label = '', id = ''}) {
  if(!id) id = name;
  return (<div className="input-group select-menu">
    <label htmlFor={id}>{label}</label>
    <select className={selectClasses} name={name} id={id}>
      {children}
    </select>
  </div>);
}

export default Select;