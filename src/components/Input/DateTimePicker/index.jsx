import './DateTimePicker.scss'
import '../Input.scss'
import { useState } from 'react'

function DateTimePicker({label = '', inputAttributes = {}, onChange = () => {}}) {

  const defaultType = 'date'
  const dateTimeTypes = ['date', 'datetime-local']
  let { value, ...attrs } = inputAttributes
  if (!attrs.type || !dateTimeTypes.includes(attrs.type)) {
    attrs.type = defaultType
  }
  if (value && attrs.type === defaultType) {
    value = value.slice(0, 10) // lấy phần ngày tháng năm
  }
  else {
    value = value.slice(0, 16) // lấy phần ngày tháng năm giờ phút
  }
  const [state, setState] = useState(value ? value : '');

  // không chỉ định hoặc chỉ định sai kiểu input - chỉ nhận 1 trong 2 kiểu date và datetime-local
  

  function handleChange(event) {
    setState(event.target.value)
    onChange(event.target) // gửi về cho component cha
  }

  return <div className='input-group datetime-picker'>
    <input {...attrs} onChange={handleChange} value={state} />
    <label htmlFor={attrs.id} className={!isNaN(Date.parse(state)) ? 'has-value' : ''}>{label}</label>
  </div>
}

export default DateTimePicker;