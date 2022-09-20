import { Navigate, useRoutes } from 'react-router-dom'

import Home from './pages/Home'
import NoMatch404Page from './pages/NoMatch404Page'

const AllRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Navigate to="/home" replace /> },
    { path: '/home', element: <Home /> },

    { path: '/404', element: <NoMatch404Page /> },
    { path: '*', element:<Navigate to="/404" replace />  }
  ])

  return routes

}
export default AllRoutes
