import AXIOS from '../../services/http-axios';
import Cookies from 'universal-cookie'
import {useNavigate} from 'react-router-dom';

import './UserHeader.css'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function UserHeader(porps) {
    
  const cookie = new Cookies();
  const navigation = useNavigate();
  
  function onSignOut(e) {
    e.preventDefault();
    cookie.remove('userId', {path: '/'});
    cookie.remove('UUID', {path: '/'});
    cookie.remove('name', {path: '/'});
    cookie.remove('lastName', {path: '/'});
    cookie.remove('email', {path: '/'});
    cookie.remove('born', {path: '/'});
    cookie.remove('admin', {path: '/'});
    cookie.remove('photo', {path: '/'});
    cookie.remove('configuration', {path: '/'});
    cookie.remove('avatarId', {path: '/'});

    navigation('/home');    
  }

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div className='stea-userHeader-header'>
      <h2 onClick={() => navigation(`/user/${cookie.get('userId')}`)}>STEA</h2> 
      <div className='stea-userHeader-buttonsContainer'>
        
        <button className="stea-user-sessionButton" onClick={onSignOut}>
          Cerrar Sesion &nbsp;
          <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={onSignOut}/>
        </button>
      </div>
      <div className='stea-userHeader-iconContainer'>
        <button className="stea-user-sessionButton" onClick={onSignOut}>
        &nbsp; <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={onSignOut}/> &nbsp;
        </button>
      </div>
    </div>
  );
}
