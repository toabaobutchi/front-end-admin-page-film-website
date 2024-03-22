import './Room.scss'
import FloatLabelInput from './../../components/Input/FloatLabelInput/index'
function Room() {
  const num = 10
  return (
    <>
      <div className='room-action'>
        <button className='room-action-add-btn btn-success'>
          <i className='fas fa-plus'></i>&nbsp; Add new room
        </button>
        <FloatLabelInput
          label='Search room'
          inputAttributes={{ id: 'room-search' }}
          additionalClasses='room-action-search'>
          <button type='button'>
            <i className='fas fa-search'></i>
          </button>
        </FloatLabelInput>
      </div>
    </>
  )
}

export default Room
