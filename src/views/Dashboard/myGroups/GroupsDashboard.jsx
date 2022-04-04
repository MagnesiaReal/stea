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
  )
}

export default GroupsDashboard