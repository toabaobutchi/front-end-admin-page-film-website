import { useEffect, useState } from 'react'
import './Room.scss'
import FloatLabelInput from '@comps/Input/FloatLabelInput'
import HttpClient from '@utils/HttpClient'
import Modal from '@comps/Modal'
import FormInfo from '@comps/FormInfo'
import toastObj from '@utils/Toast'
import ToastContainer from '@comps/Toast/ToastContainer'
import Toast from '@comps/Toast'

const http = new HttpClient()

function Room() {
  const [rooms, setRooms] = useState([]) // room list
  const [createModal, setCreateModal] = useState(false) // modal to create new room
  const [toast, setToast] = useState(toastObj)

  const handleToggleCreateModal = () => {
    setCreateModal(!createModal)
  }

  function refreshRoomData() {
    http.get('/rooms').then(res => {
      const [data, status] = res
      if (status / 100 !== 2) setRooms([])
      else setRooms(data)
    })
  }

  const handleCreateSubmit = async e => {
    const formData = new FormData(e.target)

    const [data, status] = await http.post('/rooms', {
      name: formData.get('name'),
      seats: formData.get('seats')
    })

    console.log(data, status)

    if (status / 100 != 2) {
      setToast({
        ...toast,
        title: 'Error',
        type: 'error',
        open: true,
        content: 'Error occurred while creating room!',
        closeIcon: <i className='fas fa-times'></i>,
        icon: <i className='fas fa-exclamation-circle'></i>
      })
    } else {
      if (data > 0) {
        setToast({
          ...toast,
          title: 'Notification',
          type: 'success',
          open: true,
          content: 'Create successfully!',
          closeIcon: <i className='fas fa-times'></i>,
          icon: <i className='fas fa-plus-circle'></i>
        })
        refreshRoomData()
      } else {
        setToast({
          ...toast,
          title: 'Error',
          type: 'error',
          open: true,
          content: 'Create successfully!',
          closeIcon: <i className='fas fa-times'></i>,
          icon: <i className='fas fa-bug'></i>
        })
      }
    }
    handleToggleCreateModal()
  }

  useEffect(() => {
    function fetchRooms() {
      http.get('/rooms').then(res => {
        const [data, status] = res
        if (status / 100 !== 2) setRooms([])
        else setRooms(data)
      })
    }
    fetchRooms()
  }, [])

  return (
    <>
      <div className='room-action'>
        <button className='room-action-add-btn btn-success' onClick={handleToggleCreateModal}>
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
          <tbody>
            <tr>
              <th>Room ID</th>
              <th>Name</th>
              <th>Seats</th>
              <th>Action</th>
            </tr>
            {rooms.length <= 0 && (
              <tr>
                <td colSpan={4}>No data</td>
              </tr>
            )}

            {rooms.map(room => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.name}</td>
                <td>{room.seats}</td>
                <td>
                  <button className='room-action-edit-btn btn-warning'>
                    <i className='fas fa-edit'></i> Edit
                  </button>
                  <button className='room-action-delete-btn btn-danger'>
                    <i className='fas fa-trash-alt'></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {createModal && (
        <Modal
          modalType='success'
          header='Add new room'
          closeIcon={<i className='fas fa-times'></i>}
          handleToggleModal={handleToggleCreateModal}
          footerButtons={[
            {
              props: {
                className: 'btn-success',
                form: 'add-room-form'
              },
              title: 'Add'
            },
            {
              props: {
                className: 'btn-danger',
                closeButton: true
              },
              title: 'Cancel'
            }
          ]}>
          <FormInfo id='add-room-form' onSubmit={handleCreateSubmit}>
            <FloatLabelInput
              label='Room name'
              inputAttributes={{
                id: 'room-name',
                name: 'name',
                type: 'text'
              }}
            />

            <FloatLabelInput
              label='Number of seats'
              inputAttributes={{
                id: 'room-seats',
                name: 'seats',
                type: 'number'
              }}
            />
          </FormInfo>
        </Modal>
      )}

      <ToastContainer>{toast.open && <Toast {...toast} />}</ToastContainer>
    </>
  )
}

export default Room
