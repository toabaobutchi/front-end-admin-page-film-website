import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DefaultLayout from '@comps/Layouts'
import Home from '@pages/Home'
import Room from '@pages/Room'
import Error from '@pages/Error'
import Category from '@pages/Category'
import Login from '@pages/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <DefaultLayout>
        <Home />
      </DefaultLayout>
    )
  },
  {
    path: '/movies',
    element: (
      <DefaultLayout>
        <Home />
      </DefaultLayout>
    )
  },
  {
    path: '/rooms',
    element: (
      <DefaultLayout>
        <Room />
      </DefaultLayout>
    )
  },
  {
    path: '/categories',
    element: (
      <DefaultLayout>
        <Category />
      </DefaultLayout>
    )
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: (
      <DefaultLayout>
        <Error />
      </DefaultLayout>
    )
  }
])

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
