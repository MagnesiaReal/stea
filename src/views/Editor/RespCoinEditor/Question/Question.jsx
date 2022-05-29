import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { Component, useState } from 'react';

import InputTime from './InputTime/InputTime';
import "./Question.css"

export default function Question (props) {
  const [time,setTime]=useState (0);
  const [question,setQuestion]=useState ('');
  const [answer,setAnswer]=useState ('');
  
  useEffect(function (){
    console.log('question mounted', props['data-key']);
    props.questAns.push({
      questionId: props['data-key'],
      question: '',
      answer: '',
      time: 0,
    })
  },[]);

  const onDeleteQuestion=(e)=>{
    e.preventDefault();
    console.log(props.questAns)
    props.onDeleteMe(props['data-key']);
  }
  const onQuestion=(e)=>{
    e.preventDefault();
    setQuestion(e.target.value);
    props.questAns[props["data-key"]].question=e.target.value;
  }
  const onAnswer=(e)=>{
    e.preventDefault();
    setAnswer(e.target.value);
    props.questAns[props["data-key"]].answer=e.target.value;
  }
  const onTime=(time)=>{
    setTime(time);
    props.questAns[props["data-key"]].time=time;
  }

  return (
    <article className="stea-rc-question">
      <div id="number">
        <h1>{props['data-key']}</h1>
        <div className='col-lg-1 stea-rc-question-delete'>
        </div>
      </div>
      <button type="submit" className="btn btn-danger stea-rc-question-delete" onClick={onDeleteQuestion}>
        <FontAwesomeIcon icon="fa-solid fa-trash" /> Borrar
      </button>
      <section className="row">
        <section className="col-lg-6">
          <label htmlFor="question" className=''>Pregunta:</label>
          <input id="question" className="form-control" type="text" placeholder="Pregunta" value={question} onChange={onQuestion}/>
        </section>
        <section className="col-lg-4">
          <label htmlFor="answer" className="">Respuesta:</label>
          <input type="text" name="anwer" id="" className="form-control" value={answer} onChange={onAnswer} placeholder="Respuesta"/>
        </section>
        {(!props.showTime)?null:
        <section style={{paddingLeft: "1em"}} className="col-lg-2">
          <label htmlFor="time">Tiempo:</label>
          <InputTime onChange={onTime} value={time} step={5}></InputTime>
        </section>
        }
      </section>

    </article>
  );


}
