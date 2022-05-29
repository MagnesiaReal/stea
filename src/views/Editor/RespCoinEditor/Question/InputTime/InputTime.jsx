import { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./InputTime.css"


export default function InputTime (props) {
  const [inputTiempo,setInputTiempo]=useState (0);

  const onMasTiempo=(e)=>{
    e.preventDefault()
    props.onChange(inputTiempo+props.step);
    setInputTiempo(inputTiempo+props.step);

  }

  const onMenosTiempo=(e)=>{
    e.preventDefault()
    if (inputTiempo<=0){
      props.onChange(0)
      setInputTiempo(0);
    }else{
      props.onChange(inputTiempo-props.step);
      setInputTiempo(inputTiempo-props.step);
    }
  }

  return <article className='stea-input-time'>
      <button className='btn btn-dark' onClick={onMenosTiempo}><FontAwesomeIcon icon="fa-solid fa-minus" /></button>
      {inputTiempo===0?<h3>∞</h3> : inputTiempo+"s"} 
      <button className="btn btn-primary" onClick={onMasTiempo}><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
  </article>
}
