import { Link, useRouteError } from 'react-router-dom'
import Modal from '@comps/Modal'
import './Error.scss'

function Error() {
  const error = useRouteError()
  let subHeader = '',
    message = ''
  switch (error.status) {
    case 404:
      subHeader = 'Page not found'
      message = 'The page you requested is not existing!'
      break
    default:
      subHeader = error.status + ' - ' + error.statusText
      message = 'Something went wrong'
  }
  return (
    <Modal>
      <div className='error-content'>
        <h1 className='error-header'>
          <span className='not-found-icon'>
            <i className='fas fa-exclamation-triangle'></i>
          </span>
          &nbsp;Oops!
        </h1>
        <h2 className='error-sub-header'>{subHeader}</h2>
        <h3 className='error-message'>{message}</h3>
        <Link to='/movies' className='go-home-btn' text='Go to Home'>
          Go to Home
        </Link>
      </div>
    </Modal>
  )
}

export default Error
