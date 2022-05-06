import {useEffect, useState} from 'react';

import ProfileDashboard from '../Dashboard/myProfile/ProfileDashboard';
import GroupsDashboard from '../Dashboard/myGroups/GroupsDashboard';
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
  // Variables para Crear grupo
  const [groupName, setGroupName] = useState("");
  const [group, setGroup] = useState("");
  // Lista de Grupos
  const [allGroups, setAllGroups] = useState([]);
  // Dashboard Profile
  const [userName, setUserName] = useState("");
  const [avatars, setAvatars] = useState("");
  // Update count
  const [update, setUpdate] = useState(0);

  useEffect(()=>{ // componentDidMount

    AXIOS.get('/usergroups', {params: {userId: props.cookie.get('userId'), UUID: props.cookie.get('UUID')}})
    .then((res) => {
      if(res.status === 204) {
        console.log('No Groups content');
      } else {
        console.log("USER>> AllGroups: ", res.data);
        setAllGroups(res.data.userGroups);
      }
      setUserName(props.cookie.get('name')+' '+props.cookie.get('lastName'));
      

      AXIOS.get('/avatars',{})
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

    

  },[]);

  const onAccessGroup = (e) => {
    e.preventDefault();
    console.log('onAccessGroup');
  }

  const onCreateGroup = (e) => {
    e.preventDefault();
    console.log('onCreateGroup');
  }

  const onSubmitGroup = function(e) {
    e.preventDefault();
    console.log('onSubmitGroup');
    AXIOS.post()
  }

  const onCloseModal = (e)=> {
    e.preventDefault();
    console.log('onCloseModal');
    setGroupName('');
    setGroup('');
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
            {gruposMock.map( (grupo,index) => {
              return(
                <div key={index} className='stea-grupo-contenedor'>
                  <div className='stea-grupo-imagenContenedor'>
                    <img src={grupo.imagen} alt={grupo.grupo} className='stea-grupo-imagen'></img>
                  </div>
                  <div className='stea-grupo-infoContenedor'>
                    <p className='stea-grupo-nomMateria'>{grupo.nombreMateria}</p>  
                    <div className='stea-grupo-nomMateriaProfe'>
                      <p className='stea-grupo-numGrupo'>{grupo.grupo}</p>
                      <p className='stea-grupo-nomProfesor'>{grupo.nombreProfesor}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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
