import {useEffect, useState} from 'react';
import ModalCreateActivity from '../../Group/ModalCreateActivity/ModalCreateActivity';
//Importando el mock
import { profile } from '../Mock/ProfileMock'
//CSS
import './ProfileDashboard.css'


const ProfileDashboard = (props) => {


  return (
    <div className='stea-perfilLateral-contenedor'>
      <img alt={profile.nombre} src={props.avatar.avatarUrl} className='stea-perfilLateral-img'></img>
      <div className='stea-perfilLateral-informacion'>
        <div className='stea-perfilLateral-name'>{props.userName}</div>
        <div className='stea-perfilLateral-semestre'>{props.avatar.nombre}</div>
      </div>
      <button className="btn btn-dark" data-target="#stea-create-modal" data-toggle="modal">Crear actividad</button>
      <ModalCreateActivity/>
    </div>

    
  )
}

export default ProfileDashboard
