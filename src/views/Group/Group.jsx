import {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import AXIOS from '../../services/http-axios'

//css
import './Group.css'
import ModalLink from './ModalLink/ModalLink';
import ModalAddActivity from './ModalAddActivity/ModalAddActivity';
import { act } from '@testing-library/react';

export default function Group(props) {
  
  const navigation = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [groupData, setGroupData] = useState();
  const [activities, setActivities] = useState();
  const [token, setToken] = useState('');

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
      setGroupData(res.data.groupData);
      console.log('group/ group data ->', res.data.groupData);
    }).catch((err)=>{
      console.log('MODALACCESS>> Error status code: ', err.response.status, err.response.data.message);
    });

    AXIOS.get('activity/allforgroup', {params: groupCredentials})
    .then((res)=> {
      // console.log('activity/ all activities from group -> ', res.data.activities);
      setActivities(res.data.activities)
      setLoading(false)
    }).catch((err)=> {
      console.log('MODALACCESS>> Error status code: ', err.response.status, err.response.data.message);
    });

    // const fetchData = async () =>{
    //   setLoading(true);
    //   try {
    //     const {data: response} = await AXIOS.get('activity/allforgroup', {params: groupCredentials})
    //     const actividades = response.activities
    //     console.log(actividades);
    //     setActivities(actividades)
    //     console.log(activities);
    //   } catch (err) {
    //     console.log('MODALACCESS>> Error status code: ', err.response.status, err.response.data.message);
    //   }
    //   setLoading(false);
    // }

    // fetchData();
    
  }, []);

  const addActivity = (e) => {
    e.preventDefault();
    const actividad = {
      userId: props.cookie.get('userId'),
      UUID: props.cookie.get('UUID'),
      groupId: params.groupId,
    }
    AXIOS.post('/activity/add', actividad)
    .then((res)=>{
      console.log(res.data.message);
    }).catch((err)=>{
      console.log('MODALACCESS>> Error status code: ', err.response.status, err.response.data.messag);
    })
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
          <h2>Group Component</h2><br/>
          <p>Genera tu liga de acceso {">>>>"} </p>
          <div>
          {
            activities.map( (actividad, index) => {return(
              <div key={index} className='stea-actividadPendiente-container'>
                <div className='stea-actividadPendiente-info'>
                  <p className='stea-actividadPendiente-nombre'>
                    {actividad.titulo}
                  </p>
                  <p className='stea-actividadPendiente-profesor'>
                    {actividad.descripcion}
                  </p>
                  
                </div>
                <div className='stea-actividadPendiente-modo'>
                  <p className='stea-actividadPendiente-fechaLimite'>
                    {actividad.fechaFin}
                  </p>
                  <p className='stea-actividadPendiente-modoActividad'>
                    {actividad.modoActividad}
                  </p>
                </div>
              </div>
            );})
          }
          </div>
          <button className="btn btn-dark" onClick={onAccessLink} data-toggle="modal" data-target="#stea-token-modal">Liga de Acceso</button>
          
          <p>Configuracion grupo <button className="btn btn-dark" onClick={onConfig}>Go Config</button></p>
        </div>

      </div>
      <ModalLink token={token}/>
      <ModalAddActivity groupId={params.userId}/> {/*Pasamos el groupId para ponerlo en los datos de envio */}
    </>
  );
}
