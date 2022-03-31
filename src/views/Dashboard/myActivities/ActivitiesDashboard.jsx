import React from 'react';
import { actividadesMock } from '../Mock/ActivitiesMock'
import './ActivitiesDashboard.css'
const ActivitiesDashboard = () => {
  return (
    <div className='stea-actividadesPendientes-contenedor'>
      { actividadesMock.map( (actividad,index) => {
        return(
          <div id={index} className='stea-actividadPendiente-container'>
            <div className='stea-actividadPendiente-info'>
              <h1>
                {actividad.nombreActividad}
              </h1>
              <h3>
                {actividad.nombreProfesor}
              </h3>
              <h3>
                {actividad.fechaLimite}
              </h3>
            </div>
            <div className='stea-actividadPendiente-modo'>
              <h3>
                {actividad.modoActividad}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default ActivitiesDashboard