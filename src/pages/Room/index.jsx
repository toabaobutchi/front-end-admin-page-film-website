import './Room.scss'
// import FloatLabelInput from './../../components/Input/FloatLabelInput/index'
import FloatLabelInput from '@comps/Input/FloatLabelInput'
function Room() {
  return (
    <>
      <div className='room-action'>
        <button className='room-action-add-btn btn-success'>
          <i className='fas fa-plus'></i>&nbsp; Add new room
        </button>
        <FloatLabelInput label='Search room' inputAttributes={{ id: 'room-search' }} additionalClasses='room-action-search'>
          <button type='button'>
            <i className='fas fa-search'></i>
          </button>
        </FloatLabelInput>
      </div>

      <div className='room-data'>
        <table className='room-table'>
          <tr>
            <th>Room ID</th>
            <th>Name</th>
            <th>Seats</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Room 1</td>
            <td>4</td>
            <td>
              <button className='room-action-edit-btn btn-warning'>
                <i className='fas fa-edit'></i> Edit
              </button>
              <button className='room-action-delete-btn btn-danger'>
                <i className='fas fa-trash-alt'></i> Delete
              </button>
            </td>
          </tr>
        </table>
      </div>
    </>
  )
}

export default Room
