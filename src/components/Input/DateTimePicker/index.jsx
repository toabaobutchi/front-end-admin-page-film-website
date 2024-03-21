import './DateTimePicker.scss'
import '../Input.scss'
import { useState } from 'react'

function DateTimePicker({label = '', inputAttributes = {}, onChange = () => {}}) {

  const defaultType = 'date'
  const dateTimeTypes = ['date', 'datetime-local']
  const {value, ...attrs} = inputAttributes
  const [state, setState] = useState(value ? value : '');

  // không chỉ định hoặc chỉ định sai kiểu input
  if(!attrs.type || !dateTimeTypes.includes(attrs.type)) {
    attrs.type = defaultType
  }

  function handleChange(event) {
    setState(event.target.value)
    onChange(event.target)
  }

  return <div className='input-group datetime-picker'>
    <input {...attrs} onChange={handleChange} value={state} />
    <label htmlFor={attrs.id} className={!isNaN(Date.parse(state)) ? 'has-value' : ''}>{label}</label>
  </div>
}

export default DateTimePicker;