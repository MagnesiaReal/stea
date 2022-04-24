import { useNavigate, useParams } from 'react-router-dom'
import AXIOS from '../../services/http-axios'

export default function Group(props) {
  
  const navigation = useNavigate();
  const params = useParams();


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
      }).catch(err => {
      throw err;
      });
  }

  const onConfig = (e) => {
    e.preventDefault();
    console.log('onConfigGroup');
    navigation(`/groupconf/${props.cookie.get('userId')}`);
  }


  return(
    <div>
      <h2>Group Component</h2><br/>

      <p>Genera tu liga de acceso {">>>>"} </p>
      <button className="btn btn-dark" onClick={onAccessLink}>Liga de Acceso</button>

      <p>Configuracion grupo <button className="btn btn-dark">Go Config</button></p>

    </div>

  );
}
