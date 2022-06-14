import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import Cookies from 'universal-cookie';
import AXIOS from '../../../services/http-axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AddUserActivityModal () {

  const userTypes = [
    <span className="stea-gc-profe">Propietario</span>,
    <span className="stea-gc-admin">Admin 1</span>,
    <span className="stea-gc-alumno">Admin 2</span>,
  ];

  const cookie = new Cookies();
  const params = useParams();
  
  const [email, setEmail] = useState('');
  const [permissionType, setPermissionType] = useState(2);
  const [userList, setUserList] = useState([]);
  const [updates, setUpdates] = useState(0);

  useEffect(()=> {
    const credentials = {
      userId: cookie.get('userId'),
      UUID: cookie.get('UUID'),
      activityId: params.activityId
    }
    AXIOS.get('activity/allpermissions', {params: credentials})
      .then((res)=>{
        console.log('ADDUSERACTIVITY>> message: ', res);
        if(res.status === 200) setUserList(res.data.userList);
        else setUserList([]);
      }).catch((err)=>{
        console.log(err.stack,'Err response: ', err.response);
      });
  }, [updates]);

  function onAddUser() {
    const credentials = {
      userId: cookie.get('userId'),
      UUID: cookie.get('UUID'),
      activityId: params.activityId,
      email: email,
      permissionType: permissionType
    }
    AXIOS.post('activity/permissionbyemail', credentials)
      .then(res=> {
        console.log('Aqui creando un permiso>> ', res);
        setUpdates(updates + 1);
      }).catch(err=> {
        console.log(err.response, err.stack);
      })
  }


  function onCloseModal(e){
    e.preventDefault();
    console.log('onCloseAddUserModal');
    setPermissionType(2);
    setEmail('');
  }

  function onDeletePermission(v) {
    console.log('delete user: ', v);
    const credentials = {
      userId: cookie.get('userId'),
      UUID: cookie.get('UUID'),
      activityId: params.activityId,
      targetUserId: v.idUsuario
    }
    AXIOS.delete('activity/deletepermission', {data: credentials})
      .then(res=> {
        console.log('ACTIVITY DELETE SUCCESFULLY>> ', res.data.message);
        setUpdates(updates + 1);
      }).catch(err=> {
        console.log('ACTIVITY DELETE NOT SUCCESS UNU', err.stack);
      });
  }

  function onUpdatePermission(v) {
    const credentials = {
      userId: cookie.get('userId'),
      UUID: cookie.get('UUID'),
      activityId: params.activityId,
      targetUserId: v.idUsuario,
      permissionType: (v.tipoPermiso == 2)? 3 : 2
    }

    AXIOS.put('activity/updatepermission', credentials)
      .then(res=> {
        console.log('ACTIVITY UPDATED SUCCESFULLY>> ', res.data.message);
        setUpdates(updates + 1);
      }).catch(err=> {
        console.log('ACTIVITY UPDATED NOT SUCCESS UNU', err.stack);
      });

  }

  return(
    <div className="modal fade" id="stea-add-user-activity-modal" tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Agregar miembro</h5>
            <button type="button" onClick={onCloseModal} className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <label htmlFor="email">Email: </label>
            <input className="form-control" type="text" id="email" value={email} onChange={({target:{value}})=> {setEmail(value)}} placeholder="Email del nuevo miembro"/>
            <select name="permissionType" id="" value={permissionType} onChange={(e)=>{setPermissionType(e.target.value)}} className="form-control">
              <option value={2}>Admin con permisos de compartir</option>
              <option value={3}>Admin sin permisos de compartir</option>
            </select>
            <button className="btn btn-primary" onClick={onAddUser}>Agregar</button>
            <ul id="stea-edit-activity-ul">
              {userList.map(function (value, index) {
                return(
                  <li key={value.idUsuario}>
                    <div className="stea-edit-activity-element">
                      <button className="btn btn-danger stea-btn-edit" onClick={(e)=> {onDeletePermission(value)}} data-toggle="modal" data-target="#stea-edit-user-modal">
                        <FontAwesomeIcon icon="fas fa-times" />
                      </button>
                      <p>{value.nombre+ ' ' + value.apellido}</p>
                      <p>{userTypes[value.tipoPermiso-1]}</p>
                      <button className="btn btn-warning stea-btn-swap" onClick={(e)=> {onUpdatePermission(value)}} data-toggle="modal" data-target="#stea-edit-user-modal">
                        <FontAwesomeIcon icon="fas fa-retweet" />
                      </button>
                    </div>
                  </li>);
              })}    
            </ul>
          </div>
          <div className="modal-footer">

            <button className="btn" data-dismiss="modal" aria-label="Close" onClick={onCloseModal}>Cancelar</button>
          </div>

        </div>
      </div>
    </div>
  );
}
