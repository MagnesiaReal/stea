import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component, useState } from 'react';
import InputTiempo from './InputTiempo/InputTiempo';
import "./Pregunta.css"

export default function Pregunta (props) {
  const [tiempo,setTiempo]=useState ();

  const onBorrarPregunta=(e)=>{
    e.preventDefault();
    props.onBorrarme(props['data-key'])
    
  }
  return (
  <section className="stea-pregunta-row row">
    <label htmlFor="pregunta" className='col-sm-12 col-lg-2 col-form-label col-form-label-sm'>Ingresa la pregunta:</label>
    <input id="pregunta" class="col-sm-12 col-lg-4 col-form-label col-form-label-sm" type="text" placeholder="Pregunta"></input>
    <select name='respuesta' id='respuesta' className="col-sm-12 col-lg-2 col-form-label col-form-label-sm">
      {props.opciones}
    </select>
    <InputTiempo></InputTiempo>
    {/*<input id="tiempo" class="col-sm-12 col-lg-1 col-form-label col-form-label-sm" type="number" step="5" min="0" max="60" value="a" placeholder="Tiempo (Segundos)"></input>*/}
    <div className='col-sm-4 col-lg-2'>
      <button type="submit" class="btn btn-danger" onClick={onBorrarPregunta}><FontAwesomeIcon icon="fa-solid fa-trash" /></button>
    </div>
  </section>)
  
  
}
