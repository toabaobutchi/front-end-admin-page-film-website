import { createBrowserRouter } from "react-router-dom"
import DefaultLayout from "@comps/Layouts"
import Home from "@pages/Home"
import Room from "@pages/Room"

const publishRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/movies',
    component: Home,
  }
  ,{
    path: '/rooms',
    component: Room,
  }
]



const privateRoutes = [

]


export { publishRoutes, privateRoutes }