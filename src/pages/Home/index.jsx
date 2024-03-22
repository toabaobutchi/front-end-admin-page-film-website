import { useEffect, useState } from 'react'
import './Home.scss'
import MovieCard from '@comps/MovieCard'
import Modal from '@comps/Modal'
import { FloatLabelInput } from '@comps/Input'
import axios from 'axios'
import CreateMovieForm from './components/CreateMovieForm'
import ToastContainer from '@comps/Toast/ToastContainer'
import Toast from '@comps/Toast'
import HttpClient from '@utils/HttpClient'
import UpdateMovieForm from './components//UpdateMovieForm'

function Home() {
  // mở modal
  const http = new HttpClient() // axios utility
  const [createModal, setCreateModal] = useState(false)
  const [categories, setCategories] = useState([])
  const [movies, setMovies] = useState([])
  const [createToast, setCreateToast] = useState({
    open: false,
    icon: '',
    closeIcon: '',
    title: '',
    content: '',
    type: 'success'
  })
  const [movieInfo, setMovieInfo] = useState({})
  const [updateModal, setUpdateModal] = useState(false)

  const getMoviesData = () => {
    axios.get('http://localhost:3001/api/v1/admin/films').then(res => {
      setMovies(res.data)
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
    setUpdateModal(prev => !prev)
    if (!updateModal) {
      const categories = await http.get('/categories')
      setCategories(categories)

      const movie = await http.get('/films/' + id)
      setMovieInfo(movie)
    }
  }

  const handleCreateSubmit = async e => {
    const formData = new FormData(e.target)
    const respone = await http.post('/films', formData)

    if (respone > 0) {
      setCreateToast({
        ...createToast,
        type: 'success',
        title: 'Notification',
        content: 'A movie was created successfully!',
        open: true,
        icon: <i className='fas fa-plus-circle'></i>,
        closeIcon: <i className='fas fa-times'></i>
      })
      getMoviesData()
    } else {
      setCreateToast({
        ...createToast,
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

  // hiển thị data
  useEffect(() => {
    getMoviesData()
  }, [])

  const handleDeleteMovie = id => {
    axios
      .delete(`http://localhost:3001/api/v1/admin/films/${id}`)
      .then(res => {
        if (res.data > 0) {
          setCreateToast({
            ...createToast,
            type: 'success',
            title: 'Notification',
            content: 'A movie was deleted successfully!',
            open: true,
            icon: <i className='fas fa-trash-alt'></i>,
            closeIcon: <i className='fas fa-times'></i>
          })
          getMoviesData()
        } else {
          setCreateToast({
            ...createToast,
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

  // const handleUpdate = (id) => {
  //   axios.put(`http://localhost:3001/api/v1/admin/films/${id}`, data)
  //     .then(res => {
  //       if (res.data > 0) {
  //         alert('Successfully updated!')
  //         getMoviesData()
  //       }
  //       else {
  //         alert('Failed to update!' + + res.data)
  //       }
  //     })
  // }

  // const handleUpdateMovie = async (id) => {
  // }

  return (
    <>
      <div className='movie-action'>
        <div className='movie-add-action'>
          <button onClick={handleToggleCreateModal} type='button'>
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
              <button className='btn-success'>
                <i className='far fa-calendar-plus'></i> &nbsp; Add new showtime ...
              </button>
              <button className='btn-info' onClick={() => handleToggleUpdateModal(item.id)}>
                <i className='fas fa-edit'></i> &nbsp; Update information
              </button>
              <button
                className='btn-danger'
                onClick={() => {
                  handleDeleteMovie(item.id)
                }}>
                <i className='far fa-trash-alt'></i> &nbsp; Delete film
              </button>
            </MovieCard>
          )
        })}
      </div>

      <ToastContainer>
        {createToast.open && (
          <Toast
            title={createToast.title}
            icon={createToast.icon}
            content={createToast.content}
            closeIcon={createToast.closeIcon}
            onRemove={() =>
              setCreateToast({
                ...createToast,
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
          open={createModal}
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

      {updateModal && (
        <Modal
          handleToggleModal={handleToggleUpdateModal}
          header='Update movie'
          closeIcon={<i className='fas fa-times'></i>}
          open={updateModal}
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
                closeButton: true,
                onClick() {}
              },
              title: 'Cancel'
            }
          ]}>
          <UpdateMovieForm categories={categories} data={movieInfo} />
        </Modal>
      )}
    </>
  )
}

export default Home
