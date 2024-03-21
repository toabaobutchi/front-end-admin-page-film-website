import { useEffect, useState } from 'react';
import './Home.scss'
import MovieCard from '../../components/MovieCard'
import Modal from '../../components/Modal';
import FormInfo from '../../components/FormInfo';
import {
  FloatLabelInput,
  InputRow,
  FloatLabelTextArea,
  FileDialog,
  DateTimePicker,
  Select
} from '../../components/Input'
import axios from 'axios';
import CreateMovieForm from './components/CreateMovieForm';
import ToastContainer from './../../components/Toast/ToastContainer';
import Toast from './../../components/Toast';

function Home() {
  // mở modal
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [movies, setMovies] = useState([]);
  const [createToast, setCreateToast] = useState({
    open: false,
    icon: '',
    closeIcon: '',
    title: '',
    content: '',
    type:'success',
    options: {},
    onRemove: () => { }
  });

  const getMoviesData = () => {
    axios.get('http://localhost:3001/api/v1/admin/films')
      .then(res => {
        setMovies(res.data)
      })
  }

  const handleToggleModal = () => {
    setOpen(prev => !prev)
    // mở modal thì gọi API
    if (!open) {
      axios.get('http://localhost:3001/api/v1/admin/categories')
        .then(res => {
          setCategories(res.data)
        })
    }
  }

  const handleSubmit = (e) => {
    const formData = new FormData(e.target)

    // do something with form data
    axios.post('http://localhost:3001/api/v1/admin/films', formData)
      .then(res => {
        if (res.data > 0) {
          alert('Successfully created!')
          getMoviesData()
        }
        else {
          alert('Failed to create!')
        }
      })
      .catch(err => { console.log(err) })

    handleToggleModal() // đóng modal chứa form
  }

  // hiển thị data
  useEffect(() => {
    getMoviesData()
  }, [])

  const handleDeleteMovie = (id) => {
    axios.delete(`http://localhost:3001/api/v1/admin/films/${id}`)
      .then(res => {
        if (res.data > 0) {
          alert('Successfully deleted!')
          getMoviesData()
        }
        else {
          alert('Failed to delete!' + + res.data)
        }
      })
      .catch(err => { console.log(err) })
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

  const handleToast = () => {
    setCreateToast(prev =>!prev)
  }

  console.log('re-rendering', createToast)

  return (<>
    {/* Movie action */}
    <div className="movie-action">
      <div className="movie-add-action">
        <button onClick={handleToggleModal} type="button"><i className="fas fa-plus"></i>&nbsp; Add new movie</button>

        {/* Modal */}
        {
          open && <Modal
            handleToggleModal={handleToggleModal}
            header='Add new movie'
            closeIcon={<i className="fas fa-times"></i>}
            open={open} modalType='success'
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
                  onClick() { }
                },
                title: 'Cancel'
              }
            ]}
          >
            <CreateMovieForm handleSubmit={handleSubmit} categories={categories}/>
          </Modal>
        }
      </div>

      <FloatLabelInput label='Search movie'
        inputAttributes={{ id: 'movie-search-text', type: 'text' }}
        additionalClasses={'movie-search-action'}>
        <button type="button"><i className="fas fa-search"></i></button>
      </FloatLabelInput>
    </div>

    {/* Movie cards */}
    <div className='movie-list'>
      {
        movies.map(item => {
          return <MovieCard key={item.id} imgAttributes={{ src: `http://localhost:3001/images/${item.poster}`, alt: 'Movie card image' }}>
            <button className='btn-success'><i className="far fa-calendar-plus"></i> &nbsp; Add new showtime ...</button>
            <button className='btn-info'><i className="fas fa-edit"></i> &nbsp; Update information</button>
            <button className='btn-danger' onClick={() => { handleDeleteMovie(item.id) }}><i className="far fa-trash-alt"></i> &nbsp; Delete film</button>
          </MovieCard>
        })
      }
    </div>

    <ToastContainer>
      {createToast.open && <Toast title={createToast.title} icon={<i className="fas fa-check-circle"></i>} content='Thông tin' closeIcon={<i className="fas fa-times"></i>} onRemove={handleToast} options = {{delay: 3000}} />}
    </ToastContainer>
  </>);
}

export default Home;