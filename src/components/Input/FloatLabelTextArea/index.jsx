import { useState } from 'react'
import '../Input.scss'
import './FloatLabelTextArea.scss'

function FloatLabelTextArea({textareaAttributes = {}, label = '', onChange = () => {}}) {

  let {value, ...attrs} = textareaAttributes

  if(!value) value = ''

  const [text, setText] = useState(value)

  function handleChange(event) {
    setText(event.target.value)
    onChange(event.target)
  }

  return (
    <div className='input-group float-label'>
      <textarea {...attrs} value={text} onChange={handleChange}></textarea>
      <label htmlFor={attrs.id} className={text ? 'has-value': ''} >{label}</label>
    </div>
  );
}

export default FloatLabelTextArea;