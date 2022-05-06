import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import AXIOS from '../../services/http-axios';
import DeleteModal from "./DeleteModal/DeleteModal";

//css
import './GroupConf.css'

export default function GroupConf(props) {
  const params = useParams(); 
  const navigation = useNavigate();

  const [updateTimes, setUpdateTimes] = useState(0);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
 
  
  useEffect(()=> {
    // bad practice this could be GET insted of POST
    AXIOS.get('/allusersofgroup', { params: {userId: props.cookie.get('userId'), groupId: params.groupId, UUID: props.cookie.get('UUID')}})
    .then((res)=> {
      console.log(res);
      if(res.status === 200) {
        console.log(res.data.message);
        setUserList(res.data.userList);
        
      } else {
        console.log('GROUPCONF>> No content userList');
      }
      setLoading(false);
      
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
    
    AXIOS.delete('/deletegroup', credentials)
      .then(res => {
        console.log('GROUPCONF>> res.data= ',res.data);
      }).catch(err=> {
        
        if(err) throw err;
      })

  }

  if (loading) return (<div>LOADING. . .</div>);

  return(
    <>
      <div className="stea-groupConfig">
        <div className="stea-groupConfig-container">
          <div className="stea-groupConfig-information">
            <h2>GroupConf Component</h2>
            <div>
              Aqui estaran las configuraciones de grupo
              por ahora solo cuenta con 3 operaciones
              <ol>
                <li>ADD USER</li>
                <li>DELETE USER</li>
                <li>GRANT OR REVOQUE PRIVILEGES TO USER</li>
                <button className="btn btn-danger" data-toggle="modal" data-target="#stea-delete-modal">Borrar Grupo</button>
              </ol>
              y otra para borrar el grupo xd
            </div>
          </div>
          <ul className="stea-groupConfig-userList">
            <li className="stea-groupConfig-userElement">
              <img src="https://miro.medium.com/max/336/1*N7hOZYrSOKRha4WXnzwRqw.png" className="stea-groupConfig-image"/>
              <p>Angel Francisco Merlin Solis</p>
              <p>Administrador</p> 
              {/* participante, administrador o propiertario */}
            </li>
            {userList.map((value, index)=> {
              return(<li className="stea-groupConfig-userElement" key={index}>
                <img src="https://miro.medium.com/max/336/1*N7hOZYrSOKRha4WXnzwRqw.png" className="stea-groupConfig-image"/>
                <p>{value.nombre+ ' ' + value.apellido}</p>
                <p>{(value.tipoUsuario===3 ? 'Participante' : (value.tipoUsuario===2) ? 'Administrador' : (value.tipoUsuario===1) ? 'Propietario' : 'Desconocido')}</p> 
              </li>);
            })}
            
          </ul>
        </div>
      </div>
      <DeleteModal/>
    </>
    
  );
}
