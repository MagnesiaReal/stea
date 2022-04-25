import {useEffect, useState} from 'react';

import ProfileDashboard from '../Dashboard/myProfile/ProfileDashboard';
import GroupsDashboard from '../Dashboard/myGroups/GroupsDashboard';
import ActivitiesDashboard from '../Dashboard/myActivities/ActivitiesDashboard';
import ModalGroup from './ModalGroup/ModalGroup'
import ModalAccess from './ModalAccess/ModalAccess'

import AXIOS from '../../services/http-axios'

//Mock temporal import
import { gruposMock } from '../Dashboard/Mock/GroupsMock'

export default function User (props) {

  // Variables para Crear grupo
  const [groupName, setGroupName] = useState("");
  const [group, setGroup] = useState("");
  const [allGroups, setAllGroups] = useState([]);
  
  const [update, setUpdate] = useState();

  useEffect(()=>{ // componentDidMount

    AXIOS.post('/usergroups', {userId: props.cookie.get('userId'), UUID: props.cookie.get('UUID')})
    .then((res) => {
    if(res.status === 204) {
      console.log('No Groups content');
    } else {
      console.log(res.data);
      setAllGroups(res.data.userGroups);
    }

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
  
  return(
    <div className='stea-dashboard-contenedor'>
      <ProfileDashboard/>
      <div className='stea-inicio-contenedor'>
        <h2>AQUI VAN LOS GRUPOS EN QUE EL USUARIO PARTICIPA</h2>
        <div className='stea-barraBusquedaDashboard-contenedor'>
          <form className='stea-barraBusquedaDashboard-form' action="#">
            <input className='stea-barraBusquedaDashboard-barra' type="text" placeholder="  Grupo a buscar" name="search"/>
            <button className='stea-barraBusquedaDashboard-boton'>
                Buscar
            </button>
            <button className="stea-barrraBusquedaDashboard-boton" onClick={onAccessGroup} data-toggle="modal" data-target="#stea-access-modal" >Acceder a Grupo (+)</button>
          </form>
        </div>
        <div className='stea-grupos-contenedor'>
          {gruposMock.map( (grupo,index) => {
            return(
              <div id={index} className='stea-grupo-contenedor'>
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
            )
          })}
        </div>
      </div>
      <div className="stea-inicio-contenedor">
        <h2>AQUI VAN LOS GRUPOS QUE EL USUARIO HA CREADO</h2>
        <button className="stea-barrraBusquedaDashboard-boton" onClick={onCreateGroup} data-toggle="modal" data-target="#stea-group-modal" >Crear Grupo (+)</button>
      </div>
      <ActivitiesDashboard />

      {/*Modal*/}
      <ModalGroup/>

      {/*Modal Access*/}
      <ModalAccess/>
       
    </div>
  );
  
}
