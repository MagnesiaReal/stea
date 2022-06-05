import React from 'react'
import './ProgresoActivity.css'

const ProgresoActivity = (props) => {
    
    
    const progreso = (props.actItr*80/(props.longitud))+"%";
    console.log("Iterador: ",props.actItr);
    console.log("Longitud: ", props.longitud);
    console.log("prgreso: ",progreso);
  return (
    <div className='stea-progresoActivity-container'>
        <p className='stea-progresoActivity-textoProgreso'>Progreso</p>
        <div className='stea-progresoActivity-barraSinProgreso'>
        </div>
        
        <div className='stea-progresoActivity-barraConProgreso' style={{width: progreso}}>
            <div className='stea-progresoActivity-circulo'></div>
        </div>
    </div>
  )
}

export default ProgresoActivity