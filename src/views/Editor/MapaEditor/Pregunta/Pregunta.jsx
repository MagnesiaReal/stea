import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { Component, useState } from 'react';

import InputTiempo from './InputTiempo/InputTiempo';
import "./Pregunta.css"

export default function Pregunta (props) {
  
  const [tiempo,setTiempo]=useState ((props.lista[props["data-key"]]) ? props.lista[props["data-key"]].Tiempo : 0  );
  const [pregunta,setPregunta]=useState ('');
  const [respuesta,setRespuesta]=useState ('');
  
  useEffect(function (){
    
    if(props.lista[props['data-key']]) {
    
      setPregunta(props.lista[props['data-key']].Cuerpo);
      setRespuesta(props.lista[props['data-key']].Resp);
      props.lista[props['data-key']].IDPregunta = props['data-key'];
    } 
    else props.lista.push({IDMapa:props.IDMapa,IDPregunta:props['data-key'],Tiempo:0,Cuerpo:'',Resp:''});
  },[]);
  
  const onBorrarPregunta=(e)=>{
    e.preventDefault();
    props.onBorrarme(props['data-key'])
    console.log(props.lista)
  }
  const onPregunta=(e)=>{
    e.preventDefault();
    setPregunta(e.target.value);
    props.lista[props["data-key"]].Cuerpo=e.target.value
  }
  const onRespuesta=(e)=>{
    e.preventDefault();
    setRespuesta(e.target.value);
    props.lista[props["data-key"]].Resp=e.target.value
  }
  const onTiempo=(time)=>{
    setTiempo(time);
    props.lista[props["data-key"]].Tiempo=time
  }
  return (
  <section className="stea-pregunta-row row">
    <h1>{props['data-key']}</h1>
    <label htmlFor="pregunta" className='col-sm-12 col-lg-2 col-form-label col-form-label-sm'>Ingresa la pregunta:</label>
    <input value={pregunta} id="pregunta" className="col-sm-12 col-lg-4 col-form-label col-form-label-sm" type="text" placeholder="Pregunta" onChange={onPregunta}/>
    <select onChange={onRespuesta} value={respuesta} name='respuesta' id='respuesta' className="col-sm-12 col-lg-2 col-form-label col-form-label-sm">
      {props.opciones}
    </select>
    <InputTiempo onChange={onTiempo} value={tiempo}></InputTiempo>
    <div className='col-sm-4 col-lg-2'>
      <button type="submit" className="btn btn-danger" onClick={onBorrarPregunta}><FontAwesomeIcon icon="fa-solid fa-trash" /></button>
    </div>
  </section>)
  
  
}
