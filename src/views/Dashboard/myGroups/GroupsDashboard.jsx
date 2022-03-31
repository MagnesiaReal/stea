import React from 'react'
//Mock
import { gruposMock } from '../Mock/GroupsMock'
//CSS
import './GroupsDashboard.css'

const GroupsDashboard = () => {
  return (
    <div className='stea-inicio-contenedor'>
      <div className='stea-barraBusquedaDashboard-contenedor'>
        <form className='stea-barraBusquedaDashboard-form' action="#">
          <input className='stea-barraBusquedaDashboard-barra' type="text" placeholder="  Grupo a buscar" name="search"/>
          <button className='stea-barraBusquedaDashboard-boton'>
              Buscar
          </button>
        </form>
      </div>
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
    </div>
  )
}

export default GroupsDashboard