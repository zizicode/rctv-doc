import React from 'react';
import Nofound from '../../../public/404.svg'
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import './nofound.scss';
import { Link } from 'react-router-dom';
import { useSmartNavigate } from '../../hooks/useSmartNavigate';

const NotFound:React.FC = () => {
  const useLink = useSmartNavigate()
  return (
    <div className='no-found'>
      <Link to={'/'} onClick={() => useLink('/')}><MdOutlineKeyboardDoubleArrowLeft/> <span>ir a Home</span></Link>
      <h1>Pagina <span>no encontrada</span></h1>
      <p>El espacio a donde desear ir no existe o ya no esta disponible</p>
      <img src={Nofound} alt="404" />
    </div>
  )
}

export default NotFound