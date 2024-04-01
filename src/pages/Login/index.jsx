import FormInfo from '@comps/FormInfo'
import './Login.scss'
import { FloatLabelInput } from '@comps/Input'

function Login() {
  const handleLogin = (e) => {
    const formData = new FormData(e.target)
    
  }
  return (
    <div>
      <div className='content mt-2 login-container'>
        <h1 className='welcome-text'>Welcome to Admin page!</h1>
        <p className='login-sub-text line content-center' content='At first, please log in to do more!'></p>
        <FormInfo onSubmit={handleLogin} id='login-form'>
          <h3 className='login-heading'> Login </h3>
          <FloatLabelInput label='Email' inputAttributes={{ id: 'email', type: 'email', name: 'email' }} />
          <FloatLabelInput label='Password' inputAttributes={{ id: 'password', type: 'password', name: 'password' }} />
          <button type='submit' className='login-btn btn btn-success mt-2'>
            <i className='fas fa-sign-in-alt'></i> Login
          </button>
        </FormInfo>
      </div>
    </div>
  )
}

export default Login
