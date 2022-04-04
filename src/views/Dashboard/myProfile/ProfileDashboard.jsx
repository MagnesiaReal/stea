import React from 'react'
//Importando el mock
import { profile } from '../Mock/ProfileMock'
//CSS
import './ProfileDashboard.css'

const ProfileDashboard = () => {
  return (
    <div className='stea-perfilLateral-contenedor'>
      <img alt={profile.nombre} src={profile.imagen} className='stea-perfilLateral-img'></img>
      <div className='stea-perfilLateral-informacion'>
        <div className='stea-perfilLateral-name'>{profile.nombre}</div>
        <div className='stea-perfilLateral-semestre'>{profile.semestre}</div>
      </div>
    </div>
  )
}

export default ProfileDashboard