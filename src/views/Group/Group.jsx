import {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import AXIOS from '../../services/http-axios'

//css
import './Group.css'
import ModalLink from './ModalLink/ModalLink';

export default function Group(props) {
  
  const navigation = useNavigate();
  const params = useParams();
  
  const [token, setToken] = useState('');

  const onAccessLink = (e) => {
    e.preventDefault();
    const credentials = {
      userId: props.cookie.get('userId'),
      UUID: props.cookie.get('UUID'),
      groupId: params.groupId
    };

    AXIOS.post('/createtokengroup', credentials)
      .then((res)=> {
        console.log(res.data.message);
        console.log("TOKEN: ", res.data.code);
        setToken(res.data.code);
      }).catch(err => {
        throw err;
      });
  }

  const onConfig = (e) => {
    e.preventDefault();
    console.log('onConfigGroup');
    navigation(`/groupconf/${params.groupId}`);
  }


  return(
    <>
      <div className='stea-group'>
        <div className='stea-group-container'>
          <h2>Group Component</h2><br/>

          <p>Genera tu liga de acceso {">>>>"} </p>
          <button className="btn btn-dark" onClick={onAccessLink} data-toggle="modal" data-target="#stea-token-modal">Liga de Acceso</button>

          <p>Configuracion grupo <button className="btn btn-dark" onClick={onConfig}>Go Config</button></p>
        </div>

      </div>
      <ModalLink token={token}/>
    </>
  );
}
