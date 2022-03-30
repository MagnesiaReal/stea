import React from 'react'
import { gruposMock } from '../Mock/GroupsMock'

const GroupsDashboard = () => {
  return (
    <div className='stea-grupos-contenedor'>
      {gruposMock.map( (grupo,index) => {
        return(
          <div id={index} className='stea-grupo-contenedor'>
            <div className='stea-grupo-imagenContenedor'>
              <img src={grupo.imagen} alt={grupo.grupo} className='stea-grupo-imagen'></img>
            </div>
            <div className='stea-grupo-info'>
              <h1>{grupo.grupo}</h1>
              <h2>{grupo.nombreMateria}</h2>
              <h2>{grupo.nombreProfesor}</h2>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default GroupsDashboard