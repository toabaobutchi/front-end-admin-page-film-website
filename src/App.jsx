import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DefaultLayout from '@comps/Layouts'
import Home from '@pages/Home'
import Room from '@pages/Room'

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
