import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component, useState } from 'react';


export default function Pregunta (props) {
  const [tiempo,setTiempo]=useState ();

  const onCambiarTiempo=(e)=>{
    e.preventDefault();
    console.log(e);

  }
  return <>
    <section className="row">
      <label htmlFor="pregunta" className='col-sm-12 col-lg-2 col-form-label col-form-label-sm'>Ingresa la pregunta:</label>
      <input id="pregunta" class="col-sm-12 col-lg-4 col-form-label col-form-label-sm" type="text" placeholder="Pregunta"></input>
      <select name='respuesta' id='respuesta' className="col-sm-12 col-lg-2 col-form-label col-form-label-sm">
        {props.opciones}
      </select>
      <input id="tiempo" class="col-sm-12 col-lg-1 col-form-label col-form-label-sm" type="number" step="5" min="0" max="60" value="0" placeholder="Tiempo (Segundos)"></input>
      <div className='col-sm-4 col-lg-2'>
        <button type="submit" class="btn btn-danger"><FontAwesomeIcon icon="fa-solid fa-trash" /></button>
      </div>

    </section>
  </>
}
