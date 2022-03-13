import React from 'react';
import './Entrega.css'

const Entrega = () => {
  return (
    <div className='contenedor'>
        <h1>Entrega 14 de Marzo</h1>
        <a href='/Mapa'>
            <div className='botonActividad' onClick="location.href=''">
                Actividad 1
            </div>
        </a>
        <a href='/MapaCulturas'>
            <div className='botonActividad'>
                Actividad 2
            </div>
        </a>
        <a href='/MapaRegiones'>
            <div className='botonActividad'>
                Actividad 3
            </div>
        </a>
        <a href='/Order'>
            <div className='botonActividad'>
                Actividad 4
            </div>
        </a>
    </div>
  )
}

export default Entrega