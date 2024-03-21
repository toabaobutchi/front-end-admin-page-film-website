import { useState } from "react"
import './FloatLabelInput.scss'
import '../Input.scss'

/**
 * 
 * @param inputAttributes object contains html attributes for input element
 * @param label floating label text
 * @param onChange callback function to get input value from parent component
 * @param additionalClasses array of additional classes will be added to wrapper element
 * @param children other elements next to input & label elements
 * @returns
 */
function FloatLabelInput({
    inputAttributes = {}, 
    label = '', 
    onChange = () => {}, 
    additionalClasses = '', 
    children = ''}
    ) {
  // loại bỏ thuộc tính `placeholder`
  if(inputAttributes.placeholder) delete inputAttributes.placeholder;

  // lấy thuộc tính value ra
  let {value, ...attrs} = inputAttributes

  if(value === undefined) value = ''

  const [input, setInput] = useState(value)

  const handleInputChange = (e) => {
    setInput(e.target.value)
    onChange(e.target) // gửi về component cha
  }

  return <div className={`input-group float-label ${additionalClasses}`}>
    <input {...attrs} value={input} placeholder=" " onChange={handleInputChange} />
    <label htmlFor={attrs.id} >{label}</label>
    {children}
  </div>
}

export default FloatLabelInput;