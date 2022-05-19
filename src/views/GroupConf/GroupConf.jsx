import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import AXIOS from '../../services/http-axios';
import DeleteModal from "./DeleteModal/DeleteModal";
import { DefaultEditor } from 'react-simple-wysiwyg';


//css
import './GroupConf.css'

export default function GroupConf(props) {
  const params = useParams(); 
  const navigation = useNavigate();

  const [updateTimes, setUpdateTimes] = useState(0);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupData, setGroupData] = useState(true);
  const [groupName, setGroupName] = useState('');
  const [group, setGroup] = useState('');
  const [info, setInfo] = useState('');
  

  useEffect(()=> {
    
    AXIOS.get('/group/group', {params: {userId: props.cookie.get('userId'), groupId: params.groupId, UUID: props.cookie.get('UUID')}})
      .then((res)=> {
        console.log('GROUPCONF>> GroupData: ', res.data.groupData);
        console.log('GROUPCONF>> message:' , res.data.message);
        console.log(res.data.groupData);
        setGroupName(res.data.groupData.nombre);
        setGroup(res.data.groupData.grupo);
        //setInfo(res.data.groupData.info);

      }).catch((err)=> {
        navigation('/');
        if(err) throw err;
      })

  }, []);
  
  useEffect(()=> {
    // bad practice this could be GET insted of POST
    AXIOS.get('/groupconf/allusers', { params: {userId: props.cookie.get('userId'), groupId: params.groupId, UUID: props.cookie.get('UUID')}})
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
      console.log('GROUPCONF>> Error getting userList: ', err.response);
      
    });

  }, [updateTimes]);


  function onUpdateContent(e) {
    e.preventDefault();
    console.log(info);
    const credentials = {
      userId: props.cookie.get('userId'),
      UUID: props.cookie.get('UUID'),
      groupId: params.groupId,
      groupName: groupName,
      group: group,
      info: info
    }

    AXIOS.put('/groupconf/update', credentials)
    .then((res)=> {
      console.log(res.data.message);
    }).catch((err)=>{
      console.log(err.response.data.message);
      console.log(err.status);
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
        <div className="stea-groupConfig-container">
          <article className="stea-groupConfig-information">
            <h2>Configuracion de Grupo</h2>
            <section>
              <label htmlFor="groupName">Nombre de Grupo:</label>
              <input type="text" id="groupName" value={groupName} onChange={({target:{value}})=> {setGroupName(value)}} className="form-control"/>
              <label htmlFor="group">Grupo</label>
              <input type="text" id="group" value={group} onChange={({target:{value}})=>{setGroup(value)}} className="form-control"/>
              <label htmlFor="info">Información</label>
              <DefaultEditor value={info} onChange={({target:{value}})=>{setInfo(value)}}/>

              <button className="btn btn-dark" onClick={onUpdateContent}>Actualizar</button>                          
            </section>

          </article>
        </div>
      </div>
      <DeleteModal groupName={groupData.nombre}/>
    </>
    
  );
}
