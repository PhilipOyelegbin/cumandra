import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';
import SharedLayout from './components/SharedLayout';
import Error from './pages/Error';
import Login from './pages/Login';
import Home from './pages/Home';
import Create from './pages/Create';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SharedLayout/>}>
          <Route index element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path='create' element={<Create/>}/>
          </Route>
          <Route path='*' element={<Error/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
