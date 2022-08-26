import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Nav from './Nav';

const SharedLayout = () => {
  return (
    <>
        <Nav/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default SharedLayout