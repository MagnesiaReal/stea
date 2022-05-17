import { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./InputTiempo.css"


export default function InputTiempo (props) {
  const [inputTiempo,setInputTiempo]=useState (0);
  

  const onMasTiempo=(e)=>{
    e.preventDefault()
    props.onChange(inputTiempo+5)
    setInputTiempo(inputTiempo+5)

  }

  const onMenosTiempo=(e)=>{
    e.preventDefault()
    if (inputTiempo<=0){
      props.onChange(0)
      setInputTiempo(0);
    }else{
      props.onChange(inputTiempo-5)
      setInputTiempo(inputTiempo-5)
    }
  }

  return<div className='stea-input-tiempo'>

    <div id="stea-input-tiempo-tiempo">
      {inputTiempo===0?"∞":inputTiempo}
    </div>
    <div id="botones">
      <ul>
        <li ><button id='stea-input-tiempo-btn-mas' onClick={onMasTiempo}><FontAwesomeIcon icon="fa-solid fa-plus" /></button></li>
        <li ><button id='stea-input-tiempo-btn-menos' onClick={onMenosTiempo}><FontAwesomeIcon icon="fa-solid fa-minus" /></button></li>
      </ul>           
    </div>

  </div>
}