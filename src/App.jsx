import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DefaultLayout from '@comps/Layouts'
import Home from '@pages/Home'
import Room from '@pages/Room'
import Error from '@pages/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <DefaultLayout>
        <Home />
      </DefaultLayout>
    ),
    errorElement: (
      <DefaultLayout>
        <Error />
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
