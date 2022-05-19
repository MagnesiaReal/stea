import React from 'react';
import { actividadesMock } from '../Mock/ActivitiesMock'
import './ActivitiesDashboard.css'
const ActivitiesDashboard = (props) => {
  return (
    <div className='stea-actividadesPendientes-contenedor'>
      <p className='stea-actividadesPendientes-title'>Actividades pendientes</p>
      { props.allActivitiesUser.map( (actividad,index) => {
        return(
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
        );
      })}
    </div>
  )
}

export default ActivitiesDashboard