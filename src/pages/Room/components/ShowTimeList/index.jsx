function ShowTimeList({ showTimes = [], handleToogleDeleteModal = () => {} }) {
  return (
    <>
      {showTimes.length !== 0 &&
        showTimes.map((s, index) => {
          const showtime = s.showtime.split(';')
          return (
            <div className='showtime-by-date' key={index}>
              <div className='showtime-date'>
                <span>{s.showtime_date}</span> <div className='line'></div>
              </div>
              <div className='showtime-info-list'>
                {showtime.map(t => {
                  const { showtime_id, showtime_time } = JSON.parse(t)
                  return (
                    <div className='showtime-info-item' key={showtime_id}>
                      <div className='showtime-info-item-label'> {showtime_time} </div>
                      <button onClick={() => handleToogleDeleteModal(showtime_id)} className='btn showtime-info-item-delete-btn'>
                        <i className='fas fa-trash-alt'></i>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
    </>
  )
}

export default ShowTimeList
