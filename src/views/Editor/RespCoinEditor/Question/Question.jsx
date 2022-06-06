import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { Component, useState } from 'react';

import InputTime from './InputTime/InputTime';
import "./Question.css"

export default function Question (props) {
  const [time,setTime]=useState (props.questions[props.idx].time);
  const [question,setQuestion]=useState (props.questions[props.idx].question);
  const [answer,setAnswer]=useState (props.questions[props.idx].answer);
  const [answerErr, setAnswerErr] = useState(null);
  
  useEffect(function (){
    props.questions[props.idx].questionId = props.idx;
  },[]);

  const onDeleteQuestion=(e)=>{
    e.preventDefault();
    console.log(props.questions)
    props.onDeleteMe(props.idx);
  }
  const onQuestion=(e)=>{
    setQuestion(e.target.value);
    props.questions[props.idx].question=e.target.value;
  }
  const onAnswer=(e)=>{
    setAnswer(e.target.value);
    props.questions[props.idx].answer=e.target.value;
  }
  const onTime=(time)=>{
    setTime(time);
    props.questions[props.idx].time=time;
  }

  async function onRepeatWrongAnswer(e) {
    if(await props.onBlur(e)) {
      setAnswerErr(<small style={{color: "red"}}>*Ya existe esta respuesta en el Banco de respuestas incorrectas</small>);
      onAnswer({target: {value: ""}});
    } else {
      setAnswerErr(null);
    }
  }

  return (
    <article className="stea-rc-question">
      <div id="number">
        <h1>{props.idx+1}</h1>
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
          <input type="text" name="anwer" id="" className="form-control" value={answer} onChange={onAnswer} placeholder="Respuesta" onBlur={onRepeatWrongAnswer}/>
          {answerErr}
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
