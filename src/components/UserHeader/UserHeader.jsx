import AXIOS from '../../services/http-axios';
import Cookies from 'universal-cookie'
import {useNavigate} from 'react-router-dom';

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


  return (
    <>
      <h2>Basic Header</h2> <button className="btn btn-dark">Configuracion</button>
      <button className="btn btn-primary" onClick={onSignOut}>Cerrar Sesion</button>
    </>
  );
}
