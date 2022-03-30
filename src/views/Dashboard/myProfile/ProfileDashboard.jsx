import React from 'react'
import { profile } from '../Mock/ProfileMock'

const ProfileDashboard = () => {
  return (
    <div className='stea-perfilLateral-contenedor'>
      <img alt={profile.nombre} src={profile.imagen} className='stea-perfilLateral-img'></img>
      <div className='stea-perfilLateral-informacion'>
        <h1>{profile.nombre}</h1>
        <h3>{profile.semestre}</h3>
      </div>
    </div>
  )
}

export default ProfileDashboard