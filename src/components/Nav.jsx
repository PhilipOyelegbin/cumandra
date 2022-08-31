import {NavLink} from 'react-router-dom';
import {FaBars, FaTimes} from 'react-icons/fa'
import { useState } from 'react';

const Nav = () => {
  const [show, setShow] = useState(false);

  const handleMenuContent = () => {
    setShow(!show)
  };

  const menuContent = [
    {id: 1, label: 'Home', link: '/'},
    {id: 2, label: 'Create Blog', link: '/create'},
  ];

  return (
    <nav className="flex justify-between items-center text-slate-200 p-5 md:px-20 md:py-5 z-30">
      <h1 className="text-3xl font-mono font-black">Cumandra</h1>
      <button className="text-4xl cursor-pointer md:hidden block z-20" onClick={handleMenuContent}>
        {/* Icon when menu is closed. Heroicon name: outline/menu Menu open: "hidden", Menu closed: "block" */}
        <FaBars className={`md:hidden h-6 w-6 ${show ? 'hidden' : 'block'}`} />

        {/* Icon when menu is open. Heroicon name: outline/x Menu open: "block", Menu closed: "hidden" */}
        <FaTimes className={`h-6 w-6 ${show ? 'block' : 'hidden'}`} />
      </button>
      <ul className={`fixed bg-[#240556] gap-5 w-full pl-5 py-4 top-12 transition-all ease-in-out duration-300 md:flex md:items-center md:static md:w-auto md-pl-0 md:py-0 z-20 ${show ? 'right-0' : '-right-full'}`}>
        {menuContent && menuContent?.map((contents) => (
          <li className='text-xl mb-3 md:mb-0' key={contents.id}><NavLink className={({isActive})=> isActive ? 'text-[#C31192]' : undefined} to={contents.link} onClick={handleMenuContent}>{contents.label}</NavLink></li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav