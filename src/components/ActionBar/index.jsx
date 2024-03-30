import { useState } from 'react'
import './ActionBar.scss'
import { FloatLabelInput } from '@comps/Input'

function ActionBar({
  addButtonContent = 'Add new',
  searchLabel = 'Search',
  handleToggleCreateModal = () => { },
  onChange = () => { }
}) {
  const [text, setText] = useState('')

  const handleInputChange = (input) => { 
    setText(input.value)
    onChange(input) // gửi về component cha
  }
  return (
    <>
      <div className='action-bar'>
        <button className='action-bar-add-btn btn btn-success' onClick={handleToggleCreateModal}>
          <i className='fas fa-plus'></i>&nbsp; {addButtonContent}
        </button>
        <FloatLabelInput onChange={handleInputChange} label={searchLabel} inputAttributes={{ id: 'search', value: text }} additionalClasses='action-bar-search'>
          <button type='button'>
            <i className='fas fa-search'></i>
          </button>
        </FloatLabelInput>
      </div>
    </>
  )
}

export default ActionBar
