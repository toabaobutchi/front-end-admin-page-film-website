import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publishRoutes } from './routes'
import DefaultLayout from './components/Layouts';
import { Fragment } from 'react';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          {
            publishRoutes.map((route, index) => {
              let Layout = route.layout || DefaultLayout
              if (route.layout === null || route.layout === '') {
                Layout = Fragment
              }
              const Page = route.component
              return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
            }
            )
          }
        </Routes>
      </div>
    </Router>
  )
}

export default App
