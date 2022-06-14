import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import AXIOS from '../../services/http-axios';
import DeleteModal from "./DeleteModal/DeleteModal";
import { DefaultEditor } from 'react-simple-wysiwyg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//css
import './GroupConf.css'
import EditUserModal from "./EditUserModal/EditUserModal";
import AddUserModal from "./AddUserModal/AddUserModal";

export default function GroupConf(props) {
  const userTypes = [
    <span className="stea-gc-profe">Profe 👑</span>,
    <span className="stea-gc-admin">Mod ⭐</span>,
    <span className="stea-gc-alumno">Alumno</span>,
  ];
  
  const erase = <section className="stea-gc-erase">
    <div className="stea-gc-btn-erase"><button className="btn btn-danger" data-toggle="modal" data-target="#stea-delete-modal">Borrar Grupo</button></div>
    <div style={{padding:"1em", color: "red"}}><h2>Cuidado !!!</h2> Esta opción borrara el grupo permanentemente, todos los usuarios, administradores y actividades serán borrados sin poder recuperarse.</div>
  </section>

  const params = useParams(); 
  const navigation = useNavigate();

  const [updateTimes, setUpdateTimes] = useState(0);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [groupName, setGroupName] = useState('');
  const [group, setGroup] = useState('');
  const [info, setInfo] = useState('');
  const [ownUserType, setOwnUserType] = useState(null);

  const [userType, setUserType] = useState(null);
  const [editUserModal, setEditUserModal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(()=> {
    
    AXIOS.get('/group/group', {params: {userId: props.cookie.get('userId'), groupId: params.groupId, UUID: props.cookie.get('UUID')}})
      .then((res)=> {
        console.log('GROUPCONF>> GroupData: ', res.data.groupData);
        console.log('GROUPCONF>> message:' , res.data.message);
        console.log(res.data.groupData);
        setGroupName(res.data.groupData.nombre);
        setGroup(res.data.groupData.grupo);
        setInfo(res.data.groupData.info);
        setOwnUserType(res.data.userType);

      }).catch((err)=> {
        navigation('/');
        if(err) throw err;
      });
 
  }, []);
  
  useEffect(()=> {
    console.log("call all users");
    // bad practice this could be GET insted of POST
    AXIOS.get('/groupconf/allusers', { params: {userId: props.cookie.get('userId'), groupId: params.groupId, UUID: props.cookie.get('UUID')}})
    .then((res)=> {
      console.log(res);
      if(res.status === 200) {
        console.log(res.data.message);
        console.log(res.data.userList);
        res.data.userList.sort((a, b)=> a.tipoUsuario - b.tipoUsuario);
        console.log(res.data.userList);
        setUserList(res.data.userList);
        
      } else {
        console.log('GROUPCONF>> No content userList');
      }
      setLoading(false);
      
    }).catch(err => {
      console.log('GROUPCONF>> Error getting userList: ', err.response.data.message);
      navigation(`/group/${params.groupId}`)
    });

  }, [updateTimes]);

  function onUpdateComponent() {
    console.log('update times ', updateTimes);
    setUpdateTimes(updateTimes+1);
  }


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
  
  function onEditUser(value){
    setEditUserModal(value);
    setUserType(value.tipoUsuario);
  }
  
  function onUserType(e) {
    e.preventDefault();
    setUserType(e.target.value);
    //setUserTypeDesc(typeDesc[userType-1]);
  }

  if (loading) return (<div>LOADING. . .</div>);

  return(
    <>
      <div className="stea-groupConfig">
        <div className="stea-groupConfig-container">
          <section className="stea-gc-info">
            <h2>Configuracion de Grupo</h2>
            {(ownUserType !== 1) ? <div style={{color: "#6c1d45"}}>Necesitas ser Profesor para editar estos campos !!!</div> : null}
            <label htmlFor="groupName">Nombre de Grupo:</label>
            <input type="text" id="groupName" value={groupName} onChange={({target:{value}})=> {setGroupName(value)}} className="form-control"  disabled={(ownUserType !== 1)}/>
            <label htmlFor="group">Grupo</label>
            <input type="text" id="group" value={group} onChange={({target:{value}})=>{setGroup(value)}} className="form-control"  disabled={(ownUserType !== 1)}/>
            <label htmlFor="info">Información</label>
            <DefaultEditor value={info} onChange={({target:{value}})=>{setInfo(value)}}  disabled={(ownUserType !== 1)}/>
            <br/>
            <button className="btn btn-dark" onClick={onUpdateContent}  disabled={(ownUserType !== 1)}>Actualizar</button>                          
          </section>
          <section className="stea-gc-list">
            <h2>Miembros del grupo</h2>
            Total: {userList.length} miembros.
            {error}
            <button type="submit" className="btn btn-primary stea-mapaEditor-add my-1" onClick={null} data-toggle="modal" data-target="#stea-add-user-modal"><FontAwesomeIcon icon="fa-solid fa-plus" /> Agregar miembros</button>
          <ul>
            {userList.map(function (value, index) {
              return(
              <li key={value.idUsuario}>
                <div className="stea-gc-element">
                  {(ownUserType === 2 && value.tipoUsuario < 3) ? null :<button className="btn btn-primary stea-btn-edit" onClick={(e)=> {onEditUser(value)}} data-toggle="modal" data-target="#stea-edit-user-modal">
                    <FontAwesomeIcon icon="fas fa-user-edit" />
                  </button>}
                  <img src={value.avatarUrl} alt="avatar" className="stea-gc-image"/>
                  <p>{value.nombre+ ' ' + value.apellido}</p>
                  <p>{userTypes[value.tipoUsuario-1]}</p>
                </div>
              </li>);
            })}    
          </ul>
          </section>
        </div>
        <div className="stea-groupConfig-container">
          {(ownUserType === 1) ? erase : null}
        </div>

      </div>
      <EditUserModal {...editUserModal} onUserType={onUserType} userType={userType} groupId={params.groupId} onUpdateComponent={onUpdateComponent} ownUserType={ownUserType} setError={setError}/>
      <DeleteModal groupName={groupName} onUpdateComponent={onUpdateComponent}/>
      <AddUserModal groupId={params.groupId} onUpdateComponent={onUpdateComponent} onError={setError}/>
    </>
    
  );
}
