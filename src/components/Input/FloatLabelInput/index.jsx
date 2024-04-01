import { useState } from 'react'
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
function FloatLabelInput({ inputAttributes = {}, label = '', onChange = () => {}, additionalClasses = '', children = '' }) {
  // loại bỏ thuộc tính `placeholder`
  if (inputAttributes.placeholder) delete inputAttributes.placeholder

  // lấy thuộc tính value ra
  let { value, ...attrs } = inputAttributes

  if (!value) value = ''

  const [inputText, setInputText] = useState(value)
  const [showPassword, setShowPassword] = useState(attrs.type === 'password' ? false : null)

  const handleInputChange = e => {
    setInputText(e.target.value)
    onChange(e.target) // gửi về component cha
  }

  if (showPassword !== null) {
    attrs.type = showPassword ? 'text' : 'password'
  }

  return (
    <>
      <div className={`input-group float-label ${additionalClasses}`}>
        <input {...attrs} value={inputText} placeholder=' ' onChange={handleInputChange} />
        <label htmlFor={attrs.id}>{label}</label>

        {children}

        {showPassword !== null && (
          <div className='show-password'>
            <input type='checkbox' id='show-password-option' checked={showPassword} onChange={() => setShowPassword(!showPassword)} />

            <label htmlFor='show-password-option'>
              {showPassword && (
                <>
                  <i className='fas fa-eye'></i> Hide&nbsp;
                </>
              )}
              {!showPassword && (
                <>
                  <i className='fas fa-eye-slash'></i> Show&nbsp;
                </>
              )}
              password
            </label>
          </div>
        )}
      </div>
    </>
  )
}

export default FloatLabelInput
