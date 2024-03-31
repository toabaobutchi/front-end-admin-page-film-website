import HttpClient from '@utils/HttpClient'
import { useEffect, useState } from 'react'
import Modal from '@comps/Modal'
import FormInfo from '@comps/FormInfo'
import { DateTimePicker, Select, CheckBox, FloatLabelInput, InputRow } from '@comps/Input'
import DateTimeHelper from '@utils/DateTimeHelper'

const http = new HttpClient()

function ShowTimeList({ showTimes = [], handleToogleDeleteModal = () => {}, handleRefreshShowTime = () => {} }) {
  const [room, setRoom] = useState(null)
  const [films, setFilms] = useState([])
  const [selectedFilm, setSelectedFilm] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [inUsedShowTimes, setInUseShowTimes] = useState([])
  const [showTimeList, setShowTimeList] = useState([])

  const handleToggleCreateShowTimeModal = async (roomId, sDate) => {
    if (room !== null && films.length > 0) {
      setRoom(null)
      setFilms([])
      setSelectedFilm(null)
      setSelectedDate('')
      setShowTimeList([])
    } else {
      const [roomInfo] = await http.get('/rooms/' + roomId)
      const [filmList] = await http.get('/films')
      setRoom(roomInfo)
      setFilms(filmList)
      setSelectedDate(sDate)
    }
  }
  const handleSelectFilm = async select => {
    const value = select.value
    if (value == 0) {
      setSelectedFilm(null)
    } else {
      const [data] = await http.get('/films/' + value)
      const [inUsedShowTimes] = await http.get('/show-times/rooms/' + room.id)
      setSelectedFilm(data)
      setInUseShowTimes(inUsedShowTimes)
    }
  }
  const handleChangePrice = input => {
    const updatedPrice = [...showTimeList]
    updatedPrice[parseInt(input.getAttribute('index'))].price = input.value
    setShowTimeList(updatedPrice)
  }
  const handleSelectShowTime = (index, checked) => {
    const updatedShowTimes = [...showTimeList]
    updatedShowTimes[index].checked = checked
    setShowTimeList(updatedShowTimes)
  }
  const handleSubmitAddShowTime = (e) => {
    const movieId = selectedFilm.id
    const roomId = room.id
    const showTimes = showTimeList.filter(show => show.checked == true).map(show => ({ time: DateTimeHelper.JSDateToMySQLDate(show.date), price: show.price }))
    http
      .post('/show-times', {
        room_id: roomId,
        film_id: movieId,
        showtimes: showTimes
      })
      .then(res => {
        handleToggleCreateShowTimeModal()
        alert('Add showtime successfully!')
        handleRefreshShowTime(roomId)
      })
  }

  useEffect(() => {
    if (selectedFilm) setShowTimeList(DateTimeHelper.getShowtimes(selectedDate, selectedFilm, inUsedShowTimes))
  }, [selectedFilm])

  return (
    <>
      {showTimes.length !== 0 &&
        showTimes.map((s, index) => {
          const showtime = s.showtime.split(';')
          return (
            <div className='showtime-by-date' key={index}>
              <div className='showtime-date'>
                <div className='line content-left fw-bold mt-1' content={s.showtime_date}></div>
              </div>
              <div className='showtime-info-list'>
                {showtime.map(t => {
                  const { showtime_id, showtime_time } = JSON.parse(t)
                  return (
                    <div className='showtime-info-item' key={showtime_id}>
                      <div className='showtime-info-item-label'> {showtime_time} </div>
                      <button onClick={() => handleToogleDeleteModal(showtime_id)} className='btn showtime-info-item-info-btn'>
                        <i className='fas fa-info-circle'></i>
                      </button>
                    </div>
                  )
                })}
                <button onClick={() => handleToggleCreateShowTimeModal(s.room_id, s.showtime_date)} className='showtime-info-item-add-btn btn btn-success'>
                  <i className='far fa-calendar-plus'></i>&nbsp; Create
                </button>
              </div>
            </div>
          )
        })}
      {room && films.length !== 0 && (
        <Modal
          footerButtons={[
            {
              props: {
                className: 'btn btn-success',
                form: 'add-showtime-form',
                disabled: selectedFilm == null
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
          ]}
          handleToggleModal={handleToggleCreateShowTimeModal}
          header='Add new showtime'
          modalType='success'
          closeIcon={<i className='fas fa-times'></i>}>
          <FormInfo id='add-showtime-form' onSubmit={handleSubmitAddShowTime}>
            <DateTimePicker label='Date' inputAttributes={{ readOnly: true, id: 'showtime-date', name: 'time', type: 'date', value: selectedDate }} />
            <h3>Room {room.name}</h3>
            <Select label='Select movie' onChange={handleSelectFilm}>
              <option value='0'> -- Select a movie -- </option>
              {films.map(item => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                )
              })}
            </Select>
            <h3 className='line content-center' content='Choose showtime(s)'></h3>
            {selectedFilm === null && <p className='error-text'>Please select a film to create showtime!</p>}
            {showTimeList.length <= 0 && selectedFilm !== null && <p className='error-text'>No available showtime!</p>}
            <InputRow>
              {showTimeList.map((s, index) => {
                return (
                  <div key={index}>
                    <CheckBox label={s.getString()} inputAttributes={{ value: s.date.toString(), name: 'showtimes[]', id: `id-${index}` }} onChange={e => handleSelectShowTime(index, e.checked)} />
                    <FloatLabelInput label='Price' onChange={handleChangePrice} inputAttributes={{ type: 'number', id: `price-${index}`, disabled: !s.checked, index: index, required: Boolean(s.checked) }} />
                  </div>
                )
              })}
            </InputRow>
          </FormInfo>
        </Modal>
      )}
    </>
  )
}

export default ShowTimeList
