import {FaFacebook, FaTwitter,FaInstagram, FaTiktok} from 'react-icons/fa';

const Footer = () => {
  let year = new Date().getFullYear();

  return (
    <footer className='flex flex-col-reverse justify-between items-center text-center p-5 gap-5 md:p-10 border-t-2 md:flex-row'>
      <p className='mt-2 md:mt-0'>&copy; {year} <a href="https://philipoyelegbin.github.io" className='text-[#C31192]' target="_blank" rel="noopener noreferrer">MoonShot</a> :: All right reserved</p>
      <div className='flex items-center gap-5'>
        <a href='https://mobile.facebook.com/philip.oyelegbin' target='_blank'><FaFacebook className='w-8 h-8'/></a>
        <a href='https://' target='_blank'><FaInstagram className='w-8 h-8'/></a>
        <a href='https://mobile.twitter.com/OyelegbinPhilip' target='_blank'><FaTwitter className='w-8 h-8'/></a>
        <a href='https://' target='_blank'><FaTiktok className='w-8 h-8'/></a>
      </div>
    </footer>
  )
}

export default Footer