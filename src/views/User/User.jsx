import {useEffect, useState} from 'react';

import ProfileDashboard from '../Dashboard/myProfile/ProfileDashboard';
import ActivitiesDashboard from '../Dashboard/myActivities/ActivitiesDashboard';
import ModalGroup from './ModalGroup/ModalGroup'
import ModalAccess from './ModalAccess/ModalAccess'

import AXIOS from '../../services/http-axios'
//Mock temporal import
import { gruposMock } from '../Dashboard/Mock/GroupsMock'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom';

export default function User (props) {

  const navigation = useNavigate();
  
  // loading status
  const [loading, setLoading] = useState(true);
  // Listas
  const [allGroups, setAllGroups] = useState([]);
  const [allActivitiesUser, setAllActivitiesUser] = useState([]);
  const [allActivitiesAdmin, setAllactivitiesAdmin] = useState([]);
  // Dashboard Profile
  const [userName, setUserName] = useState("");
  const [avatars, setAvatars] = useState("");

  useEffect(()=>{ // componentDidMount
    // all for user retrive all groups that user can access and returns userType
    // 1 -- owner
    // 2 -- admin
    // 3 -- just a simple participant
    AXIOS.get('/group/allforuser', {params: {userId: props.cookie.get('userId'), UUID: props.cookie.get('UUID')}})
    .then((res) => {
      if(res.status === 204) {
        console.log('No Groups content');
      } else {
        console.log("USER>> AllGroups: ", res.data);
        setAllGroups(res.data.userGroups);
      }
      setUserName(props.cookie.get('name')+' '+props.cookie.get('lastName'));
      

      AXIOS.get('/user/avatars',{})
      .then((res)=> {

        console.log("USER>> avatars: ", res.data);
        setAvatars(res.data.avatars);
        setLoading(false);

      }).catch((err)=>{
        console.log("Aqui estoy :D",err.response.status,err.response.data.message)
      })


    }).catch((err)=> {
      console.log(`Error code (${err.response.status}) message: ${err.response.data.message}`);
    });

    // Esta llamada trae todas las actividades que el usuario debe resolver correspondientes a cada grupo
    // NOTA: Trae fecha inicio y fecha final para saber cuando el usuario se atrasa o esta en timpo de entregarla
    // Tambien viene con la id de grupo para saber que grupo la esta solicitando resolver.
    AXIOS.get('/activity/allforuser', {params: {userId: props.cookie.get('userId'), UUID: props.cookie.get('UUID')}})
    .then((res) => {
      if(res.status === 204) {
        console.log('User have no activities at the moment');
      } else {
        console.log('ACTIVITIES>>', res.data.message);
        setAllActivitiesUser(res.data.activitiesData);
      }
    }).catch(err => {
      console.log('ACTIVITIES>> Error: ', err.response.status, err.response.data.message);
    });

    // Esta llamada tra todas las actividad que un owner o un admin pueden editar
    // NOTA: Estas actividades pueden o no estar asociadas a un grupo por lo tanto solo pueden ser borradas o editadas.
    AXIOS.get('/activity/allforadmin')
    .then((res) => {
      if(res.status === 204) {
        console.log('ACTIVITIES ADMINOWNER>> No content');
      } else {
        console.log('ACTIVITIES ADMINOWNER>> ', res.data.message);
        setAllactivitiesAdmin(res.data.activitiesData);
      }
    }).catch((err)=> {
      console.log('ACTIVITIES>> Error: ', err.response.status, err.response.data.message);
    })
    

  },[]);

  const onAccessGroup = (e) => {
    e.preventDefault();
    console.log('onAccessGroup');
  }

  const onCreateGroup = (e) => {
    e.preventDefault();
    console.log('onCreateGroup');
  }
  

  if (loading) return (
    <div>
      <h1>LOADING . . .</h1>
    </div>
  );
  else return(
    <div>
      <div className='stea-dashboard-contenedor'>
        <ProfileDashboard userName={userName} avatar={avatars[props.cookie.get('avatarId')-1]}/>
        <div className='stea-inicio-contenedor'>
          <div className='stea-barraBusquedaDashboard-contenedor'>
            <form className='stea-barraBusquedaDashboard-form' action="#">
              <button className="stea-barrraBusquedaDashboard-boton" onClick={onCreateGroup} data-toggle="modal" data-target="#stea-group-modal" >
              Crear Grupo &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCirclePlus}  />
              </button>
              <button className="stea-barrraBusquedaDashboard-boton" onClick={onAccessGroup} data-toggle="modal" data-target="#stea-access-modal" >
              Acceder a Grupo  &nbsp;&nbsp;
                <FontAwesomeIcon icon={faArrowRightToBracket} />
              </button>
            </form>
          </div>
          <div className='stea-grupos-contenedor'>
            {allGroups.map((g, index) => {
              return(
                <div key={index} className='stea-grupo-contenedor'>
                  <div className='stea-grupo-imagenContenedor'>
                    <img src={gruposMock[0].imagen} alt={g.nombre} className='stea-grupo-imagen'></img>
                  </div>
                  <div className='stea-grupo-infoContenedor'>
                    <p className='stea-grupo-nomMateria'>{g.nombreGrupo}</p>  
                    <div className='stea-grupo-nomMateriaProfe'>
                      <p className='stea-grupo-numGrupo'>{g.grupo}</p>
                      <p className='stea-grupo-nomProfesor'>{g.nombreUsuario}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ActivitiesDashboard />

      </div>
      {/*Modal*/}
      <ModalGroup/>

      {/*Modal Access*/}
      <ModalAccess/>
    </div>
  );

}
