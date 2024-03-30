import { Link } from 'react-router-dom'
import './Error.scss'
import Modal from '@comps/Modal'

function Error() {
  return (
    <Modal>
      <div className='error-content'>
        <h1 className='error-header'>
          <span className='not-found-icon'>
            <i className='fas fa-exclamation-triangle'></i>
          </span>
          &nbsp;Oops!
        </h1>
        <h2 className='error-sub-header'>404 - Not found</h2>
        <h3 className='error-message'>The page you requested is not existing!</h3>
        <Link to='/movies' className='go-home-btn' text='Go to Home'>
          Go to Home
        </Link>
      </div>
    </Modal>
  )
}

export default Error
