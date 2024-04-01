import UpdateMovieForm from './components//UpdateMovieForm'
import AddShowTimeForm from './components/AddShowTimeForm'
import CreateMovieForm from './components/CreateMovieForm'
import ToastContainer from '@comps/Toast/ToastContainer'
import { useEffect, useState } from 'react'
import HttpClient from '@utils/HttpClient'
import ActionBar from '@comps/ActionBar'
import MovieCard from '@comps/MovieCard'
import ToastObj from '@utils/Toast'
import Modal from '@comps/Modal'
import Toast from '@comps/Toast'
import './Home.scss'

const http = new HttpClient() // axios utility

function Home() {
  const [createModal, setCreateModal] = useState(false)
  const [categories, setCategories] = useState([])
  const [movies, setMovies] = useState([])
  const [toast, setToast] = useState(new ToastObj())
  const [movieInfo, setMovieInfo] = useState(null)
  const [willDeletedItem, setWillDeletedItem] = useState(null)
  const [rooms, setRooms] = useState([])

  const confirmDeletion = async id => {
    const [data, status] = await http.get(`/films/${id}`) // tìm thông tin
    if (status / 100 == 2) setWillDeletedItem(data)
  }
  const fetchMoviesData = () => {
    http.get('/films').then(response => {
      const [data] = response
      setMovies(data)
    })
  }
  const handleToggleCreateModal = () => {
    setCreateModal(prev => !prev)
    // mở modal thì gọi API
    if (!createModal) {
      http.get('/categories').then(res => {
        const [data] = res
        setCategories(data)
      })
    }
  }
  const handleToggleUpdateModal = async id => {
    if (movieInfo === null) {
      const [categories] = await http.get('/categories')
      const [movie] = await http.get('/films/' + id)
      setCategories(categories)
      setMovieInfo(movie)
    } else {
      setMovieInfo(null) // đóng modal dialog
    }
  }
  const handleCreateSubmit = async e => {
    const formData = new FormData(e.target)
    const [data, status] = await http.post('/films', formData)

    if (status / 100 != 2) {
      setToast(ToastObj.errorToast(toast, { content: 'Error occurred while creating movie' }))
    } else if (data > 0) {
      setToast(ToastObj.successToast(toast, { content: 'A movie was created successfully!' }))
      fetchMoviesData()
    } else {
      setToast(ToastObj.errorToast(toast, { content: 'Can not create the movie!' }))
    }
    handleToggleCreateModal() // đóng modal chứa form
  }
  const handleToggleAddShowtimeModal = async id => {
    if (rooms.length > 0 && movieInfo != null) {
      setRooms([])
      setMovieInfo(null)
    } else {
      const [rooms] = await http.get('/rooms')
      setRooms(rooms)
      const [movie] = await http.get('/films/' + id)
      setMovieInfo(movie)
    }
  }
  const handleDeleteMovie = id => {
    http.delete(`/films/${id}`).then(res => {
      const [data, status] = res
      if (status / 100 !== 2) {
        setToast(ToastObj.errorToast(toast, { content: data.message }))
      } else if (data > 0) {
        setToast(ToastObj.successToast(toast, { content: 'Movie deleted successfully!' }))
        fetchMoviesData()
      } else {
        setToast(ToastObj.errorToast(toast, { content: 'Can not delete the movie!' }))
      }
      setWillDeletedItem(null) // đóng modal
    })
  }
  const handleUpdateSubmit = async (e, id) => {
    const formData = new FormData(e.target)
    const [data, status] = await http.put(`/films/${id}`, formData)
    if (status / 100 != 2) {
      setToast(ToastObj.errorToast(toast, { content: data.message }))
    } else {
      if (data > 0) {
        setToast(ToastObj.successToast(toast, { content: 'Movie updated successfully' }))
        fetchMoviesData()
        setMovieInfo(null) // đóng update modal
      } else {
        setToast(ToastObj.errorToast(toast, { content: 'Can not update the movie!' }))
      }
    }
  }
  const handleShowToastAfterAddShowTime = res => {
    const [data, status] = res
    if (status / 100 !== 2) {
      setToast(ToastObj.errorToast(toast, { content: data.message }))
    } else {
      if (data !== 0) {
        setToast(ToastObj.successToast(toast, { content: 'Showtimes added successfully!' }))
      } else {
        setToast(ToastObj.errorToast(toast, { content: 'Failed to add showtimes!' }))
      }
    }
  }

  // hiển thị data
  useEffect(() => {
    const fetchMovies = () => {
      http.get('/films').then(res => {
        const [data, status] = res
        if (status / 100 !== 2) {
          setMovies([])
        } else setMovies(data)
      })
    }
    fetchMovies()
  }, [])

  return (
    <>
      <ActionBar searchLabel='Search movie' addButtonContent='Add new movie' handleToggleCreateModal={handleToggleCreateModal} />

      <div className='movie-list'>
        {movies &&
          movies.map(item => {
            return (
              <MovieCard
                key={item.id}
                movie={item}
                imgAttributes={{
                  src: `http://localhost:3001/images/${item.poster}`,
                  alt: 'Movie card image'
                }}>
                <button className='btn btn-success' onClick={() => handleToggleAddShowtimeModal(item.id)}>
                  <i className='far fa-calendar-plus'></i> &nbsp; Add new showtimes
                </button>
                <button className='btn btn-warning' onClick={() => handleToggleUpdateModal(item.id)}>
                  <i className='fas fa-edit'></i> &nbsp; Update movie
                </button>
                <button
                  className='btn btn-danger'
                  onClick={() => {
                    confirmDeletion(item.id)
                  }}>
                  <i className='far fa-trash-alt'></i> &nbsp; Delete film
                </button>
              </MovieCard>
            )
          })}
      </div>

      {createModal && (
        <Modal
          handleToggleModal={handleToggleCreateModal}
          header='Add new movie'
          closeIcon={<i className='fas fa-times'></i>}
          modalType='success'
          footerButtons={[
            {
              props: {
                className: 'btn btn-success',
                form: 'add-movie-form'
              },
              title: 'Add'
            },
            {
              props: {
                className: 'btn btn-danger',
                closeButton: true,
                onClick() {}
              },
              title: 'Cancel'
            }
          ]}>
          <CreateMovieForm handleSubmit={handleCreateSubmit} categories={categories} />
        </Modal>
      )}

      {movieInfo !== null && rooms.length == 0 && (
        <Modal
          handleToggleModal={handleToggleUpdateModal}
          header='Update movie'
          closeIcon={<i className='fas fa-times'></i>}
          modalType='warning'
          footerButtons={[
            {
              props: {
                className: 'btn btn-warning',
                form: 'update-movie-form'
              },
              title: 'Update'
            },
            {
              props: {
                className: 'btn btn-danger',
                closeButton: true
              },
              title: 'Cancel'
            }
          ]}>
          <UpdateMovieForm handleSubmit={handleUpdateSubmit} categories={categories} data={movieInfo} />
        </Modal>
      )}

      {willDeletedItem != null && (
        <Modal
          handleToggleModal={() => setWillDeletedItem(null)}
          header='Delete movie'
          closeIcon={<i className='fas fa-times'></i>}
          open={true}
          modalType='danger'
          footerButtons={[
            {
              props: {
                className: 'btn btn-danger'
              },
              title: 'Delete',
              onClick: () => {
                handleDeleteMovie(willDeletedItem.id)
              }
            },
            {
              props: {
                className: 'btn btn-info',
                closeButton: true
              },
              title: 'Cancel'
            }
          ]}>
          <p>
            Are you sure to delete <strong>{willDeletedItem.name}</strong> ?
          </p>
        </Modal>
      )}
      {movieInfo && rooms.length > 0 && <AddShowTimeForm setToast={handleShowToastAfterAddShowTime} handleToggleModal={handleToggleAddShowtimeModal} info={{ movieInfo, rooms }} />}

      <ToastContainer>
        {toast.open && (
          <Toast
            {...toast}
            onRemove={() =>
              setToast({
                ...toast,
                open: false
              })
            }
          />
        )}
      </ToastContainer>
    </>
  )
}

export default Home
