import { Component, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./InputTime.css"


export default function InputTime (props) {

  const onMasTiempo=(e)=>{
    e.preventDefault()
    props.onChange(props.value+props.step);
  }

  const onMenosTiempo=(e)=>{
    e.preventDefault()
    if (props.value<=0){
      props.onChange(0);
    }else{
      props.onChange(props.value-props.step);
    }
  }

  return <article className='stea-input-time'>
      <button className='btn btn-dark' onClick={onMenosTiempo}><FontAwesomeIcon icon="fa-solid fa-minus" /></button>
      {props.value===0?<h3>∞</h3> : props.value+"s"} 
      <button className="btn btn-primary" onClick={onMasTiempo}><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
  </article>
}
