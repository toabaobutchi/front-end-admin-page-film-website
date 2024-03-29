import UpdateMovieForm from './components//UpdateMovieForm'
import AddShowTimeForm from './components/AddShowTimeForm'
import CreateMovieForm from './components/CreateMovieForm'
import ToastContainer from '@comps/Toast/ToastContainer'
import { FloatLabelInput } from '@comps/Input'
import { useEffect, useState } from 'react'
import HttpClient from '@utils/HttpClient'
import MovieCard from '@comps/MovieCard'
import ToastObj from '@utils/Toast'
import Modal from '@comps/Modal'
import Toast from '@comps/Toast'
import axios from 'axios'
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
      axios.get('http://localhost:3001/api/v1/admin/categories').then(res => {
        setCategories(res.data)
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
      // status code ~=2xx
      setToast({
        ...toast,
        type: 'error',
        title: 'Error',
        content: 'Error occurred while creating movie!',
        open: true,
        icon: <i className='fas fa-exclamation-circle'></i>,
        closeIcon: <i className='fas fa-times'></i>
      })
    } else if (data > 0) {
      setToast({
        ...toast,
        type: 'success',
        title: 'Notification',
        content: 'A movie was created successfully!',
        open: true,
        icon: <i className='fas fa-plus-circle'></i>,
        closeIcon: <i className='fas fa-times'></i>
      })
      fetchMoviesData()
    } else {
      setToast({
        ...toast,
        open: true,
        type: 'error',
        title: 'Notification',
        content: 'Can not create the movie!',
        icon: <i className='fas fa-bug'></i>,
        closeIcon: <i className='fas fa-times'></i>
      })
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
    http
      .delete(`/films/${id}`)
      .then(res => {
        const [data, status] = res
        if (status / 100 !== 2) {
          setToast({
            ...toast,
            type: 'error',
            title: 'Error',
            content: 'An error occurred!',
            open: true,
            icon: <i className='fas fa-exclamation-circle'></i>,
            closeIcon: <i className='fas fa-times'></i>
          })
        } else if (data > 0) {
          setToast({
            ...toast,
            type: 'success',
            title: 'Notification',
            content: 'A movie was deleted successfully!',
            open: true,
            icon: <i className='fas fa-trash-alt'></i>,
            closeIcon: <i className='fas fa-times'></i>
          })
          fetchMoviesData()
        } else {
          setToast({
            ...toast,
            open: true,
            type: 'error',
            title: 'Notification',
            content: 'Can not delete the movie!',
            icon: <i className='fas fa-bug'></i>,
            closeIcon: <i className='fas fa-times'></i>
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleUpdateSubmit = async (e, id) => {
    const formData = new FormData(e.target)
    const [data, status] = await http.put(`/films/${id}`, formData)
    if (status / 100 != 2) {
      // status code ~=2xx
      setToast({
        ...toast,
        type: 'error',
        title: 'Error',
        content: 'Error occurred while updating movie!',
        open: true,
        icon: <i className='fas fa-exclamation-circle'></i>,
        closeIcon: <i className='fas fa-times'></i>
      })
    } else {
      if (data > 0) {
        setToast({
          ...toast,
          type: 'success',
          title: 'Notification',
          content: 'A movie was updated successfully!',
          open: true,
          icon: <i className='fas fa-edit'></i>,
          closeIcon: <i className='fas fa-times'></i>
        })
        fetchMoviesData()
        setMovieInfo(null)
      } else {
        setToast({
          ...toast,
          open: true,
          type: 'error',
          title: 'Notification',
          content: 'Can not update the movie!',
          icon: <i className='fas fa-bug'></i>,
          closeIcon: <i className='fas fa-times'></i>
        })
      }
    }
  }

  // hiển thị data
  useEffect(() => {
    const fetchMovies = () => {
      http.get('/films').then(response => {
        const [data, status] = response
        if (status / 100 !== 2) {
          setMovies([])
        } else setMovies(data)
      })
    }
    fetchMovies()
  }, [])

  return (
    <>
      <div className='movie-action'>
        <div className='movie-add-action'>
          <button className='btn btn-success' onClick={handleToggleCreateModal} type='button'>
            <i className='fas fa-plus'></i>&nbsp; Add new movie
          </button>
        </div>

        <FloatLabelInput label='Search movie' inputAttributes={{ id: 'movie-search-text', type: 'text' }} additionalClasses={'movie-search-action'}>
          <button type='button'>
            <i className='fas fa-search'></i>
          </button>
        </FloatLabelInput>
      </div>

      <div className='movie-list'>
        {movies.map(item => {
          return (
            <MovieCard
              key={item.id}
              imgAttributes={{
                src: `http://localhost:3001/images/${item.poster}`,
                alt: 'Movie card image'
              }}>
              <button className='btn btn-success' onClick={() => handleToggleAddShowtimeModal(item.id)}>
                <i className='far fa-calendar-plus'></i> &nbsp; Add new showtime ...
              </button>
              <button className='btn btn-info' onClick={() => handleToggleUpdateModal(item.id)}>
                <i className='fas fa-edit'></i> &nbsp; Update information
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

      <ToastContainer>
        {toast.open && (
          <Toast
            title={toast.title}
            icon={toast.icon}
            content={toast.content}
            closeIcon={toast.closeIcon}
            options={{ ...toast.options }}
            type={toast.type}
            onRemove={() =>
              setToast({
                ...toast,
                open: false
              })
            }
          />
        )}
      </ToastContainer>

      {createModal && (
        <Modal
          handleToggleModal={handleToggleCreateModal}
          header='Add new movie'
          closeIcon={<i className='fas fa-times'></i>}
          modalType='success'
          footerButtons={[
            {
              props: {
                className: 'btn-success',
                form: 'add-movie-form'
              },
              title: 'Add'
            },
            {
              props: {
                className: 'btn-danger',
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
                className: 'btn-warning',
                form: 'update-movie-form'
              },
              title: 'Update'
            },
            {
              props: {
                className: 'btn-danger',
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
                className: 'btn-danger'
              },
              title: 'Delete',
              onClick: () => {
                handleDeleteMovie(willDeletedItem.id)
              }
            },
            {
              props: {
                className: 'btn-info',
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
      {movieInfo && rooms.length > 0 && <AddShowTimeForm handleToggleModal={handleToggleAddShowtimeModal} info={{ movieInfo, rooms }} />}
    </>
  )
}

export default Home
