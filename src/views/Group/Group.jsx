import {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import AXIOS from '../../services/http-axios'

//css
import './Group.css'
import ModalLink from './ModalLink/ModalLink';
import ModalConfigActivity from './ModalConfigActivity/ModalConfigActivity';
import ModalAddActivity from './ModalAddActivity/ModalAddActivity';
import { act } from '@testing-library/react';
import ModalCreateActivity from './ModalCreateActivity/ModalCreateActivity';
import dateFormat, { masks } from "dateformat";
import ModalRank from './ModalRank/ModalRank';

export default function Group(props) {
  
  const navigation = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [groupData, setGroupData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [token, setToken] = useState('');
  const [idConfig, setIdConfig] = useState();
  //Para modal para agregar actvidad al grupo
  const [activitiesList, setActivitiesList] = useState([]);

  const [modalData, setModalData] = useState(null);
  /*

  */

  useEffect(()=> {
    // Trae la informacion del grupo en general
    const groupCredentials = {
      userId: props.cookie.get('userId'),
      UUID: props.cookie.get('UUID'),
      groupId: params.groupId
    }
    
    AXIOS.get('group/group', {params: groupCredentials})
    .then((res)=> {
      setGroupData(res.data);
      setLoading(false)
      console.log('group/ group data ->', res.data.groupData);
      
    }).catch((err)=>{
      console.log('MODALACCESS>> Error status code: ', err.response.status, err.response.data.message);
      navigation('/');
    });

    AXIOS.get('activity/allforgroup', {params: groupCredentials})
    .then((res)=> {
      console.log('activity/ all activities from group -> ', res.data.activities);
      setActivities(res.data.activities)
      
    }).catch((err)=> {
      console.log('MODALACCESS>> Error status code: ', err.status, err.response.data.message);
    });
    
  }, []);

  const addActivity = (e) => {
    e.preventDefault();
    const userActivity = {
      userId: props.cookie.get('userId'), 
      UUID: props.cookie.get('UUID')
    }
    AXIOS.get('/activity/allforadmin', { params: userActivity} )
    .then((res)=>{
      console.log(res);
      setActivitiesList(res.data.allAdminActivities)
    }).catch((err)=>{
      console.log('MODALACCESS>> Error status code: ', err.response.status, err.response.data.messag);
    })
  }
  
  const configActivity = (e) => {
    e.preventDefault();
    const activityCredentials = {
      userId: props.cookie.get('userId'),
      UUID: props.cookie.get('UUID'),
      activityId : e.target.id
    }
    console.log(e.target.id);
    setIdConfig(e.target.id);
    
  }

  const deleteActivity = (e) => {
    const actividad = {
      userId: props.cookie.get('userId'),
      UUID: props.cookie.get('UUID'),
      groupActivityId: e.target.id,
      groupId: params.groupId
    }
    console.log(actividad)
    AXIOS.delete('activity/remove', {data: actividad})
    .then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log('MODALACCESS>> Error status code: ', err.response.status, err.response.data.messag);
    })
    const groupCredentials = {
      userId: props.cookie.get('userId'),
      UUID: props.cookie.get('UUID'),
      groupId: params.groupId
    }
    AXIOS.get('activity/allforgroup', {params: groupCredentials})
    .then((res)=> {
      console.log('activity/ all activities from group -> ', res.data.activities);
      setActivities(res.data.activities)
      
    }).catch((err)=> {
      console.log('MODALACCESS>> Error status code: ', err.response.status, err.response.data.message);
    });
  }

  const onAccessLink = (e) => {
    e.preventDefault();
    const credentials = {
      userId: props.cookie.get('userId'),
      UUID: props.cookie.get('UUID'),
      groupId: params.groupId
    };

    AXIOS.post('/group/createtoken', credentials)
      .then((res)=> {
        console.log(res.data.message);
        console.log("TOKEN: ", res.data.code);
        setToken(res.data.code);
      }).catch(err => {
        console.log(err.response.data.message);
      });
  }

  const onConfig = (e) => {
    e.preventDefault();
    console.log('onConfigGroup');
    navigation(`/groupconf/${params.groupId}`);
  }

  function setModalRank(actividad) {
    console.log('setModalRank');
    const credentials = {
      userId: props.cookie.get('userId'),
      UUID: props.cookie.get('UUID'),
      groupId: actividad.idGrupo,
      activityId: actividad.idActividad,
      groupActivityId: actividad.idGrupoActividad
    };
  
    setModalData(credentials);  

  }


  // Esto tiene que abrir un modal de acuerdo a lo que habiamos hablado
  // el modal debe mostrr la lista de actividaddes que solamete el owner puede agregar
  // admin no debe agregar actividades, solo se le puedan dar permisos de editar actividades

  if (loading) return (
    <div>
      <h1>LOADING . . .</h1>
    </div>
  );
  return(
    <>
      <div className='stea-group'>
        <div className='stea-group-container'>
          <h2>{groupData.groupData.nombre}</h2><br/>
          <div dangerouslySetInnerHTML={{ __html: groupData.groupData.info}}></div>
          <p>Genera tu liga de acceso {">>>>"} </p>

          <div className='stea-grupoDetalles-container'>
          <button className="btn btn-dark" onClick={onAccessLink} data-toggle="modal" data-target="#stea-token-modal">Liga de Acceso</button>
          <button className="btn btn-dark" data-target="#stea-create-modal" data-toggle="modal">Crear actividad</button>
          {groupData.userType !== 3 ? <button className="btn btn-dark" onClick={addActivity} data-toggle="modal" data-target="#stea-add-modal">Añadir actividad</button> : <div></div>}
          {activities !== undefined && activities.map( (actividad, index) => {return(
              <div key={index} className='stea-grupoActividades-container'>
                <div className='stea-grupoActividades-info'>
                  <p className='stea-grupoActividades-nombre'>
                    {actividad.titulo}
                  </p>
                  <p className='stea-grupoActividades-profesor'>
                    {actividad.descripcion} | {actividad.modo===1?<b>Examen</b> :  <b>Actividad</b>}
                  </p>
                  
                </div>
                <div className='stea-grupoActividades-modo'>
                  <p className='stea-grupoActividades-fechaLimite'>
                    Creada el {new Date(actividad.fechaInicio).getDate()}/
                    {new Date(actividad.fechaInicio).getMonth()}/
                    {new Date(actividad.fechaInicio).getFullYear()}
                  </p>
                  <p className='stea-grupoActividades-fechaLimite'>
                    Disponible hasta el {new Date(actividad.fechaFin).getDate()}/
                    {new Date(actividad.fechaFin).getMonth()}/
                    {new Date(actividad.fechaFin).getFullYear()}
                  </p>
                  <p className='stea-grupoActividades-modoActividad'>
                    {actividad.modoActividad}
                  </p>
                </div>
                <div className='stea-grupoActividades-botones'>
                  {actividad.calificacion==null?<button className="btn btn-primary" onClick={() => {navigation(`/activitygroup/${actividad.idGrupoActividad}`)}} data-toggle="modal">Jugar</button>:null}
                  {groupData.userType === 3 ? <div></div> : <button className="btn btn-dark" id={actividad.idGrupoActividad} onClick={configActivity} data-target="#stea-config-modal" data-toggle="modal">Configurar</button>}
                  {actividad.tipoPermiso === null ? <div></div> : <button className="btn btn-danger" id={actividad.idGrupoActividad} onClick={deleteActivity}  >Borrar</button>}
                  {actividad.tipoPermiso === null ? <div></div> : <button className="btn btn-info" id={actividad.idGrupoActividad} onClick={() => navigation(`/editor/${actividad.idActividad}`)}  >Editar</button>}
                  {actividad.modo==2?<button 
                    className="btn btn-warning"
                    data-toggle="modal"
                    data-target="#stea-rank-modal"
                    onClick={(e)=>{
                      e.preventDefault();
                      setModalRank(actividad);
                    }}
                    >Ver Puntuacines</button>: null
                  }
                  {actividad.calificacion == null ? <b> No Resuelta</b> : <b> Calificacion: {actividad.calificacion}</b>}
                  
                </div>
              </div>
            );})}
          </div>
          {console.log("Las propiedades son:",activitiesList)}
          <p>Configuracion grupo <button className="btn btn-dark" onClick={onConfig}>Go Config</button></p>
        </div>

      </div>
      <ModalRank modalData={modalData}/>
      <ModalLink token={token}/>
      <ModalConfigActivity groupId={params.groupId} idConfig={idConfig} />
      <ModalAddActivity groupId={params.groupId} activities={activitiesList} />
      <ModalCreateActivity/> {/*Pasamos el groupId para ponerlo en los datos de envio */}
    </>
  );
}
