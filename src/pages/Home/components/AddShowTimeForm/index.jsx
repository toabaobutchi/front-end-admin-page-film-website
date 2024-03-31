import { useEffect, useState } from 'react'
import Modal from '@comps/Modal'
import FormInfo from '@comps/FormInfo'
import { DateTimePicker, FloatLabelInput, InputRow, Select } from '@comps/Input'
import HttpClient from '@utils/HttpClient'
import DateTimeHelper from '@utils/DateTimeHelper'
import CheckBox from '@comps/Input/CheckBox'

const http = new HttpClient()

function AddShowTimeForm({ handleToggleModal = () => {}, info = {} }) {
  const { rooms, movieInfo } = info
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0)
  const [inUsedShowTimes, setInUsedShowTimes] = useState([])
  const [selectedDate, setSelectedDate] = useState(movieInfo.launchdate)
  const [selectedShowTimes, setSelectedShowTimes] = useState([])

  const handleSelectRoom = select => {
    const value = select.value
    setSelectedRoomIndex(value)
    // gọi API để lấy dữ liệu (các) suất chiếu của phòng được chọn
    if (value != 0) {
      http.get('/show-times/rooms/' + value).then(res => {
        const [data, status] = res
        if (status / 100 == 2) {
          setInUsedShowTimes(data)
        } else {
          console.log('Error >>> ', status)
        }
      })
    }
  }
  const handleSelectDate = date => {
    setSelectedDate(date.value)
  }
  const handleSelectShowTime = (index, checked) => {
    // bỏ chọn
    const updatedShowTimes = [...selectedShowTimes]
    updatedShowTimes[index].checked = checked
    setSelectedShowTimes(updatedShowTimes)
  }
  const handleChangePrice = input => {
    const updatedPrice = [...selectedShowTimes]
    updatedPrice[parseInt(input.getAttribute('index'))].price = input.value
    setSelectedShowTimes(updatedPrice)
  }
  // const getExpectedShowTimes = movie => {
  //   // tính toán thời gian của suất chiếu đầu tiên
  //   // nếu đang trong ngày chiếu của phim thì lấy thời gian chiếu làm thời gian bắt đầu
  //   const sDate = new Date(selectedDate)
  //   const lDate = new Date(movie.launchdate)

  //   let initTime = 0
  //   if (DateTimeHelper.isSameDay(sDate, lDate)) {
  //     // cùng 1 ngày
  //     initTime = lDate.getHours()
  //   } else {
  //     // thời gian mở cửa rạp phim (có thể chỉ định lại)
  //     if (sDate > lDate) initTime = 8
  //     else {
  //       alert(`Choose a date that is after ${DateTimeHelper.JSDateToMySQLDate(lDate)}`)
  //       return []
  //     }
  //   }

  //   let expectedShowTimes = DateTimeHelper.getExpectedShowTimes(sDate, movie.time, initTime)
  //   if (inUsedShowTimes.length > 0) {
  //     expectedShowTimes = expectedShowTimes.filter(e => {
  //       let check = true
  //       inUsedShowTimes.forEach(u => {
  //         const actualStartTime = new Date(u.stime)
  //         const actualFinishTime = DateTimeHelper.getAfterTime(actualStartTime, u.ftime).date
  //         if (actualStartTime <= e.date) {
  //           if (actualFinishTime > e.date) {
  //             check = false // loại
  //           }
  //         }

  //         if (check && e.date <= actualStartTime) {
  //           const eFinishTime = DateTimeHelper.getAfterTime(e.date, movie.time).date
  //           if (eFinishTime > actualStartTime) {
  //             check = false // loại
  //           }
  //         }
  //       })
  //       return check // xuất chiếu hợp lệ
  //     })
  //   }
  //   return expectedShowTimes
  // }

  useEffect(() => {
    setSelectedShowTimes(DateTimeHelper.getShowtimes(selectedDate, movieInfo, inUsedShowTimes))
  }, [selectedDate, inUsedShowTimes])

  const handleSubmit = e => {
    const movieId = movieInfo.id
    const roomId = selectedRoomIndex
    const showTimes = selectedShowTimes.filter(show => show.checked == true).map(show => ({ time: DateTimeHelper.JSDateToMySQLDate(show.date), price: show.price }))
    http
      .post('/show-times', {
        room_id: roomId,
        film_id: movieId,
        showtimes: showTimes
      })
      .then(res => {
        handleToggleModal(0)
        alert('Add showtime successfully!')
      })
  }

  return (
    <Modal
      modalType='success'
      handleToggleModal={() => {
        setSelectedDate('')
        handleToggleModal(0)
      }}
      header='Add new showtime'
      id='showtime-modal'
      closeIcon={<i className='fas fa-times'></i>}
      footerButtons={[
        {
          props: {
            className: 'btn btn-success',
            form: 'add-showtime-form',
            disabled: selectedRoomIndex == 0
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
      <FormInfo id='add-showtime-form' onSubmit={handleSubmit}>
        <DateTimePicker label='Show time' inputAttributes={{ type: 'date', name: 'date', value: movieInfo.launchdate }} onChange={handleSelectDate} />
        <Select label='Select room' value={selectedRoomIndex} onChange={handleSelectRoom}>
          <option value='0'> -- Select a room -- </option>
          {rooms.map(item => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            )
          })}
        </Select>
        {selectedRoomIndex == 0 && <p style={{ fontSize: '1.2rem', fontWeight: '600', color: 'red' }}> Please choose a room to create show times ! </p>}
        {selectedRoomIndex != 0 && (
          <div className='show-times-container'>
            <p className='show-times-header'>Choose showtime(s)</p>
            <div className='showtimes'>
              <InputRow>
                {selectedShowTimes.length <= 0 && <p className='error-text text-center'> No showtime available for this room! </p>}
                {selectedShowTimes.map((s, index) => {
                  return (
                    <div key={index}>
                      <CheckBox label={s.getString()} inputAttributes={{ value: s.date.toString(), name: 'showtimes[]', id: `id-${index}` }} onChange={e => handleSelectShowTime(index, e.checked)} />
                      <FloatLabelInput label='Price' onChange={handleChangePrice} inputAttributes={{ type: 'number', id: `price-${index}`, disabled: !s.checked, index: index, required: Boolean(s.checked) }} />
                    </div>
                  )
                })}
              </InputRow>
            </div>
          </div>
        )}
      </FormInfo>
    </Modal>
  )
}

export default AddShowTimeForm
