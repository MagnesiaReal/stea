import {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import AXIOS from '../../../services/http-axios'


export default function EditUserModal(props) {
  const cookie = new Cookies();
  const typeDesc = [
    <>
      <li>Un Profesor puede editar y eliminar el grupo.</li>
      <li>Un Profesor puede agregar, editar y eliminar personas del grupo</li>
      <li>Un Profesor puede agregar, editar(si tiene permisos) y eliminar actividades de un grupo</li>
      <li>Un Profesor puede resolver actividades</li>
    </>,
    <>
      <li>Un Moderador puede agregar, eliminar alumnos de un grupo</li>
      <li>Un Moderador puede agregar, editar(si tiene permisos) y eliminar actividades de un grupo</li>
      <li>Un Moderador puede resolver actividades</li>
    </>,
    <>
      <li>Un Alumno puede resolver sus actividades</li>
    </>
  ];

  const userTypeHtml = <>
      <hr/>
      <label htmlFor="userType">Tipo de Usuario: </label>
      <select id="userType" value={props.userType === null ? 1 : props.userType} onChange={props.onUserType} className="form-control">
        <option value="1">Profesor</option>
        <option value="2">Moderador</option>
        <option value="3">Alumno</option>
      </select>
      <section style={{margin: "0.25em"}}>
        <ul className="stea-edit-user-modal-desc">
          {typeDesc[props.userType-1]}
        </ul>
      </section>
    </>
  
  const [confirm, setConfirm] = useState(null);

  const userTypes = [
    <span className="stea-gc-profe">Profe 👑</span>,
    <span className="stea-gc-admin">Mod ⭐</span>,
    <span className="stea-gc-alumno">Alumno</span>,
  ];
  
  function onCloseModal(e){
    e.preventDefault();
    console.log('onCloseEditUserModal');
    setConfirm(null);
  }
  
  function onUpdate(e) {
    e.preventDefault();
    const credentials = {
      userId: cookie.get('userId'),
      UUID: cookie.get('UUID'),
      targetUserId: props.idUsuario,
      groupId: props.groupId,
      userType: props.userType
    }; 
    console.log(credentials);

    AXIOS.put('/groupconf/privileges', credentials)
    .then((res)=> {
      console.log('EDITUSER>> ',res.data.message);
      props.onUpdateComponent();
    }).catch((err)=> {
      console.log('EDITUSER>> Error: ', err.response.status, err.response.data.message);
    });
  }
  
  function onNo(e){
    e.preventDefault();
    setConfirm(null);
    props.setError(null);
  }

  function onRemoveUser(e){
    e.preventDefault();
    const credentials = {
      userId: cookie.get('userId'),
      UUID: cookie.get('UUID'),
      targetUserId: props.idUsuario,
      groupId: props.groupId
    };

    AXIOS.delete('/groupconf/removeuser', {data: credentials})
    .then(res => {
      console.log('EDITUSER>> ', res.data.message);
      props.onUpdateComponent();
    }).catch((err)=> {
      console.log('EDITUSER>> Error: ', err.response.status, err.response.data.message);
      props.setError(<b style={{color: "red"}}>No puedes eliminar a otro Profesor, solo Moderadores y Alumnos</b>);
      setTimeout(()=> {
        props.setError(null);
      }, 10000);
    })
  }

  function onRemove(e){
    setConfirm(
      <div className="modal-footer">
        <span><b>Estas seguro?</b></span>
        <button className="btn btn-danger" onClick={onRemoveUser} data-dismiss="modal">YES</button>
        <button className="btn btn-success" onClick={onNo}>NO</button>
      </div>
    );
    
  }


  return (
    <div className="modal fade" id="stea-edit-user-modal" tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Editar Usuario</h5>
            <button type="button" onClick={onCloseModal} className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div className="modal-body">
            <section className="stea-gc-modal-body">
              <img src={props.avatarUrl} alt="avatar" className="stea-gc-image"/>
              <h2>{props.nombre+ ' ' + props.apellido}</h2>
              {userTypes[props.userType-1]}
            </section>
            {(props.ownUserType === 1) ? userTypeHtml : null}
            
          </div>
          <div className="modal-footer">
            {(props.ownUserType === 1) ? <button className="btn btn-primary" onClick={onUpdate} data-dismiss="modal" aria-label="Close">Actualizar</button> : null}
            <button className="btn btn-danger" onClick={onRemove}>Borrar Usuario !!!</button>
            <button className="btn btn-secondary" data-dismiss="modal" aria-label="Close" onClick={onCloseModal}>Cancelar</button>
          </div>
          {confirm}
          
        </div>
      </div>
    </div>
  );
}
