import FloatLabelInput from '@comps/Input/FloatLabelInput'
import ToastContainer from '@comps/Toast/ToastContainer'
import ShowTimeList from './components/ShowTimeList'
import { useEffect, useState } from 'react'
import HttpClient from '@utils/HttpClient'
import FormInfo from '@comps/FormInfo'
import Tooltip from '@comps/Tooltip'
import ToastObj from '@utils/Toast'
import Modal from '@comps/Modal'
import Toast from '@comps/Toast'
import './Room.scss'
import ActionBar from '@comps/ActionBar'
import { Link } from 'react-router-dom'

const http = new HttpClient()

function Room() {
  const [rooms, setRooms] = useState([]) // room list
  const [createModal, setCreateModal] = useState(false) // modal to create new room
  const [toast, setToast] = useState(new ToastObj())
  const [willDeletedRoom, setWillDeletedRoom] = useState(null) // modal to delete room
  const [updateRoom, setUpdateRoom] = useState(null) // modal to update room
  const [showTimes, setShowTimes] = useState([]) // modal to show
  const [willDeleteShowTime, setWillDeleteShowTime] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState(0)

  const handleToggleCreateModal = () => {
    setCreateModal(!createModal)
  }
  const handleToggleDeleteModal = async id => {
    if (willDeletedRoom !== null) {
      setWillDeletedRoom(null)
    } else {
      const [data, status] = await http.get('/rooms/' + id)

      if (status / 100 == 2) {
        setWillDeletedRoom(data)
      }
    }
  }
  const handleDeleteRoom = id => {
    http.delete('/rooms/' + id).then(res => {
      const [data, status] = res
      if (status / 100 !== 2) {
        setToast(ToastObj.errorToast(toast, { content: 'We have some problems while deleting!' }))
      } else {
        if (data > 0) {
          setToast(ToastObj.successToast(toast, { content: 'Room deleted successfully!' }))
        } else {
          setToast(ToastObj.errorToast(toast, { content: 'Cannot delete room!' }))
        }
        refreshRoomData()
      }
      handleToggleDeleteModal(0)
    })
  }
  const refreshRoomData = () => {
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
      setToast(ToastObj.errorToast(toast, { content: 'Action cannot be done!' }))
    } else {
      if (data > 0) {
        setToast(ToastObj.successToast(toast, { content: 'Create completelly!' }))
        refreshRoomData()
      } else {
        setToast(ToastObj.errorToast(toast, { content: 'Failed to add new room!' }))
      }
      refreshRoomData()
    }
    handleToggleCreateModal()
  }
  const handleToggleUpdateModal = async id => {
    if (updateRoom !== null) {
      setUpdateRoom(null)
    } else {
      const [data, status] = await http.get('/rooms/' + id)
      if (status / 100 === 2) {
        setUpdateRoom(data)
      }
    }
  }
  const handleUpdateRoom = (e, id) => {
    const formData = new FormData(e.target)
    http.put('/rooms/' + id, { name: formData.get('name'), seats: formData.get('seats') }).then(res => {
      const [data, status] = res
      if (status / 100 !== 2) {
        setToast(ToastObj.errorToast(toast, { content: 'Action cannot be done!' }))
      } else {
        if (data > 0) {
          setToast(ToastObj.successToast(toast, { content: 'Update completelly!' }))
          refreshRoomData()
        } else {
          setToast(ToastObj.errorToast(toast, { content: 'Failed to update room!' }))
        }
      }
      handleToggleUpdateModal(0)
    })
  }
  const getShowTimesByRoom = async id => {
    setSelectedRoom(id)
    const [data, status] = await http.get('/show-times/rooms/' + id + '?mode=brief')
    if (status / 100 === 2) {
      setShowTimes(data)
    }
  }
  const handleConfirmDeleteShowTime = async id => {
    if (willDeleteShowTime !== null) {
      setWillDeleteShowTime(null)
    } else {
      const [data, status] = await http.get('/show-times/' + id)
      if (status / 100 === 2) {
        // if (data.ticket_count !== 0) {
        //   setToast(ToastObj.errorToast(toast, { content: `This show time cannot be deleted as it's now having ${data.ticket_count} ticket(s) !` }))
        // } else {
        //   setWillDeleteShowTime(data)
        // }
        setWillDeleteShowTime(data)
      }
    }
  }
  const handleDeleteShowTime = id => {
    http.delete('/show-times/' + id).then(res => {
      const [data, status] = res
      if (status / 100 !== 2) {
        setToast(ToastObj.errorToast(toast, { content: 'We have some problems while deleting!' }))
      } else {
        if (data > 0) {
          setToast(ToastObj.successToast(toast, { content: 'Show time deleted successfully!' }))
          getShowTimesByRoom(selectedRoom)
        } else {
          setToast(ToastObj.errorToast(toast, { content: 'Cannot delete show time!' }))
        }
      }
      handleConfirmDeleteShowTime(0)
    })
  }
  const handleShowToastAfterAddShowTime = (res) => {
    const [data, status] = res
    if (status / 100 !== 2) {
      setToast(ToastObj.errorToast(toast, { content: data.message }))
    }
    else {
      if (data > 0) {
        setToast(ToastObj.successToast(toast, { content: 'Add showtimes successfully!' }))
      }
      else {
        setToast(ToastObj.errorToast(toast, { content: 'Cannot add showtimes!' }))
      }
    }
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
      <ActionBar searchLabel='Search room' addButtonContent='Add new room' handleToggleCreateModal={handleToggleCreateModal} />

      <div className='room-data'>
        <table className='room-table'>
          <tbody>
            <tr>
              <th>ID</th>
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
                <td>
                  {room.seats} <i className='fas fa-chair'></i>
                </td>
                <td>
                  <button onClick={() => handleToggleUpdateModal(room.id)} className='room-action-edit-btn btn btn-warning'>
                    <i className='fas fa-edit'></i> Edit
                  </button>
                  <button disabled={room.showtime_count !== 0} onClick={() => handleToggleDeleteModal(room.id)} className='room-action-delete-btn btn btn-danger'>
                    <i className='fas fa-trash-alt'></i> Delete
                    {room.showtime_count !== 0 && (
                      <Tooltip direction='top' theme='dark'>
                        <i className='fas fa-exclamation-circle'></i> This room is now having <strong className='error-text'>{room.showtime_count}</strong> showtimes
                      </Tooltip>
                    )}
                  </button>
                  <button className='btn btn-info' onClick={() => getShowTimesByRoom(room.id)}>
                    <i className='fas fa-calendar-alt'></i> Showtimes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='showtimes-detail'>
          <p className='detail-header'>Showtimes</p>
          {selectedRoom == 0 && <p className='error-text'>Choose a room to see showtime detail</p>}
          {showTimes.length <= 0 && selectedRoom != 0 && <p className='error-text'>No available showtime!</p>}
          <ShowTimeList showTimes={showTimes} handleRefreshShowTime={getShowTimesByRoom} handleToogleDeleteModal={handleConfirmDeleteShowTime} setToast={handleShowToastAfterAddShowTime} />
          <p className='mt-1 text-success'>
            <i className='fas fa-check-circle'></i> You can also add new showtime(s) at{' '}
            <Link className='no-underline fw-bold btn btn-outline' to='/movies'>
              Movies page
            </Link>
          </p>
        </div>
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
                className: 'btn btn-success',
                form: 'add-room-form'
              },
              title: 'Add'
            },
            {
              props: {
                className: 'btn btn-danger',
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

      {willDeletedRoom !== null && (
        <Modal
          footerButtons={[
            {
              props: {
                className: 'btn btn-danger'
              },
              title: (
                <>
                  <i className='fas fa-trash-alt'></i> Delete
                </>
              ),
              onClick: () => {
                handleDeleteRoom(willDeletedRoom.id)
              }
            },
            {
              props: {
                className: 'btn btn-info',
                closeButton: true
              },
              title: (
                <>
                  <i className='fas fa-times'></i> Cancel
                </>
              )
            }
          ]}
          handleToggleModal={handleToggleDeleteModal}
          header='Delete room'
          modalType='danger'
          closeIcon={<i className='fas fa-times'></i>}>
          <p>
            Are you sure you want to delete room <strong className='danger-text'>{willDeletedRoom.name}</strong>?
          </p>
        </Modal>
      )}

      {updateRoom && (
        <Modal
          handleToggleModal={handleToggleUpdateModal}
          modalType='warning'
          header='Update room'
          closeIcon={<i className='fas fa-times'></i>}
          footerButtons={[
            {
              props: {
                className: 'btn btn-warning',
                form: 'update-room-form'
              },
              title: 'Update'
            },
            {
              props: {
                className: 'btn btn-info',
                closeButton: true
              },
              title: 'Cancel'
            }
          ]}>
          <FormInfo id='update-room-form' onSubmit={e => handleUpdateRoom(e, updateRoom.id)}>
            <FloatLabelInput
              label='Room name'
              inputAttributes={{
                id: 'room-name',
                name: 'name',
                type: 'text',
                value: updateRoom.name
              }}
            />

            <FloatLabelInput
              label='Number of seats'
              inputAttributes={{
                id: 'room-seats',
                name: 'seats',
                type: 'number',
                value: updateRoom.seats
              }}
            />
          </FormInfo>
        </Modal>
      )}

      {willDeleteShowTime && (
        <Modal
          id='showtime-delete-modal'
          footerButtons={[
            {
              props: {
                className: 'btn btn-danger'
              },
              title: (
                <>
                  <i className='fas fa-trash-alt'></i> Delete
                </>
              ),
              onClick: () => {
                handleDeleteShowTime(willDeleteShowTime.id)
              }
            },
            {
              props: {
                className: 'btn btn-info',
                closeButton: true
              },
              title: (
                <>
                  <i className='fas fa-times'></i> Cancel
                </>
              )
            }
          ]}
          handleToggleModal={() => handleConfirmDeleteShowTime(0)}
          modalType='info'
          header='Showtime detail'
          closeIcon={<i className='fas fa-times'></i>}>
          <fieldset className='message-field'>
            <legend className='message-field-title'>Showtime detail</legend>
            <p>
              <strong>Room:</strong> {willDeleteShowTime.room_name}
            </p>
            <p>
              <strong>Time:</strong> {willDeleteShowTime.time}
            </p>
            <p>
              <strong>Film:</strong> {willDeleteShowTime.film_name}
            </p>
          </fieldset>
        </Modal>
      )}

      <ToastContainer>{toast.open && <Toast {...toast} onRemove={() => setToast({ ...toast, open: false })} />}</ToastContainer>
    </>
  )
}

export default Room
