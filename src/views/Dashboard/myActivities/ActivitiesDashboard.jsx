import React from 'react';
import { actividadesMock } from '../Mock/ActivitiesMock'
import './ActivitiesDashboard.css'
const ActivitiesDashboard = () => {
  return (
    <div className='stea-actividadesPendientes-contenedor'>
      <p className='stea-actividadesPendientes-title'>Actividades pendientes</p>
      { actividadesMock.map( (actividad,index) => {
        return(
          <div id={index} className='stea-actividadPendiente-container'>
            <div className='stea-actividadPendiente-info'>
              <p className='stea-actividadPendiente-nombre'>
                {actividad.nombreActividad}
              </p>
              <p className='stea-actividadPendiente-profesor'>
                {actividad.nombreProfesor}
              </p>
              
            </div>
            <div className='stea-actividadPendiente-modo'>
              <p className='stea-actividadPendiente-fechaLimite'>
                {actividad.fechaLimite}
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