import { BrowserRouter, Routes, Route, Navigate, useRoutes } from 'react-router-dom'

import AllRoutes from './routes'
import Cookies from 'js-cookie'


console.log('aaa')
console.log(Cookies.get('token'))

function App() {
  return (
    <BrowserRouter >
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
