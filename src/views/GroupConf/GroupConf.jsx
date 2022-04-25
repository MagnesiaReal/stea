import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import AXIOS from '../../services/http-axios';

export default function GroupConf(props) {
  const params = useParams(); 
  const navigation = useNavigate();

  const [updateTimes, setUpdateTimes] = useState(0);
  const [userList, setUserList] = useState([]);
 
  
  useEffect(()=> {
    console.log('get all user of this group useEffect');
    // bad practice this could be GET insted of POST
    AXIOS.post('/allusersofgroup', {userId: props.cookie.get('userId'), groupId: params.groupId, UUID: props.cookie.get('UUID')})
    .then((res)=> {
      console.log(res);
      if(res.status === 200) {
        console.log(res.data.message);
        setUserList(res.data.userList);
      } else {
        console.log('GROUPCONF>> No content userList');
      }
      
    }).catch(err => {
      console.log('GROUPCONF>> Error getting userList: ', err.response.data.message);
      
      if(err.response.status === 404) {
        navigation('/');
      } else {
        throw err;
      }
    });

  }, [updateTimes]);

  const onDeleteGroup = (e) => {
    e.preventDefault();
    const credentials = {
      userId: props.cookie.get('userId'),
      UUID: props.cookie.get('UUID'),
      groupId: params.groupId,

    }
  }


  return(
    <>
      <hr/>
      <h2>GroupConf Component</h2>
      <article>
        Aqui estaran las configuraciones de grupo
        por ahora solo cuenta con 3 operaciones
        <ol>
          <li>ADD USER</li>
          <li>DELETE USER</li>
          <li>GRANT OR REVOQUE PRIVILEGES TO USER</li>
        </ol>
        y otra para borrar el grupo xd
      </article>
      <button className="btn btn-danger">Borrar Grupo</button>
      
      <ul>
        <li>Aqui deberia ir un lista de usuarios con su respectivo rol (participante, administrador o propietario)</li>
      </ul>




    </>
  );
}
