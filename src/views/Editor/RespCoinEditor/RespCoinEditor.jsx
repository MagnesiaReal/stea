import AXIOS from '../../../services/http-axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './RespCoinEditor.css'
import { useState, useEffect } from 'react';
import Question from './Question/Question';
import InputTime from './Question/InputTime/InputTime';

export default function RespCoinEditor(props) {
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [wrongAnswer, setWrongAnswer] = useState('');
  const [time, setTime] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questKey, setQuestKey] = useState(0);
  
  useEffect(()=>{
    console.log('RespCoinEditor recive this activity activity: ', props.activity);
    let key = 0;
    const questionIdArray = [];
    props.activity.questions.forEach(()=> {
      questionIdArray.push(key++);
    });
    setQuestions(questionIdArray);
    setQuestKey(key);

    setWrongAnswers(props.activity.wrongAnswers);

    setTime(props.activity.time);
  }, []);

  function onAddQuesiton(e){
    e.preventDefault();

    const newQuestion = {
      // questionId is set in Question mount
      question: '',
      answer: '',
      time: 0
    };
    
    props.activity.questions.push(newQuestion);
    setQuestions([...questions, questKey]);
    setQuestKey(questKey+1);
  }

  function onDeleteQuesiton(idx){
    setQuestions(questions.filter((value,index)=>index!==idx));
    props.activity.questions.splice(idx,1);
    var id=0;
    props.activity.questions.forEach(element => {
      element.questionId=id++;
    });
  }

  function onAddWrongAnswer(e) {
    e.preventDefault();
    if(wrongAnswer === '' || wrongAnswers.find(wa=> wa === wrongAnswer)) return;
    if(props.activity.questions.length && props.activity.questions.find(qa => qa.answer === wrongAnswer)) return;

    setWrongAnswers([...wrongAnswers, wrongAnswer]);
    props.activity.wrongAnswers.push(wrongAnswer);

    setWrongAnswer('');
    console.log(props.activity.wrongAnswers);
  }

  function onDeleteWrongAnswer(e, index) {
    setWrongAnswers(wrongAnswers.filter((v, idx) => idx !== index));
    props.activity.wrongAnswers.splice(index, 1);
    console.log(props.activity.wrongAnswers);
  }
  
  function onEnter(e) {
    if(e.key === 'Enter') onAddWrongAnswer(e);
  }

  function onWrongAnswer(e){
    setWrongAnswer(e.target.value);
  }

  function onCheckRepeat(e){
    console.log('On blur ', e);
    if(wrongAnswers.find(wa=> wa === e.target.value)) return true;
    else return false;
  }

  return (
    <>
      <div className="container">
        <button  data-toggle="modal" data-target="#stea-resp-coin-help-modal" className="btn btn-dark stea-resp-coin-editor-help"><h4><FontAwesomeIcon icon="fas fa-info-circle" /></h4></button>
        <article>
          <section className="stea-rc-header">
            <h3>Preguntas</h3>
          </section>
          <section className="stea-rc-header d-none">
            <section className="stea-rc-total-time">Tiempo total actividad:
              <InputTime value={time} onChange={(time)=> {setTime(time); props.activity.time = time}} step={15}/>
            </section>
          </section>

          {questions.map(function(v, idx){
            return <Question key={v} questions={props.activity.questions} idx={idx} showTime={(time===0)} onDeleteMe={onDeleteQuesiton} onBlur={onCheckRepeat}/>
          }        
          )}
          <button className="btn btn-success" onClick={onAddQuesiton}>
            <FontAwesomeIcon icon="fa-solid fa-plus"/> Agregar pregunta
          </button>
        </article>
        <article className="stea-rc-question">
          <h3>Banco de respuestas incorrectas</h3>
          <label htmlFor="wrongAnswer">Ingresa una respuesta incorrecta: </label>
          <section className="stea-rce-set-wa">
            <input type="text" id="wrongAnswer" className="form-control" placeholder="Solo respuestas incorrectas" value={wrongAnswer} onChange={onWrongAnswer} onKeyDown={onEnter}/>
            <button className="btn btn-primary" onClick={onAddWrongAnswer}><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
          </section>
          <section className="stea-rce-wrong-answers">
            {wrongAnswers.map((value, index)=> {
              const wans = (value.startsWith("http://") || value.startsWith("https://")) ? <img src={value} alt={value} style={{maxWidth: "30em", maxHeight: "120px"}}/> : value;

              return <div key={value}>
                <button className="btn" onClick={(e)=>{onDeleteWrongAnswer(e, index)}}>
                  <FontAwesomeIcon icon="fas fa-times"/>
                </button> 
                <span>{wans}</span>
              </div>
            }
            )}
          </section>

        </article>
      </div>



      <div className="modal fade" id="stea-resp-coin-help-modal" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Respuestas Coincidentes</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            Respuestas coincidentes cosiste en un juego en el que tienes que atrapar o seleccionar la respuesta correcta a una pregunta con la
            dificultad de que entre mas tiempo pase mas respuestas se van a mostrar en pantalla, estas mismas pueden ser respuestas incorrectas
            que existen para confundir al participante o tambien respuestas correctas pero a otras preguntas que serán respondidas.

              <dl>
                <dt>Pregunta</dt>
                <dd>Pregunta que se desea responder en la actividad</dd>
                <dt>Respuesta</dt>
                <dd>Respuesta unica que tendra cada pregunta</dd>
                <dt>Respuestas incorrectas</dt>
                <dd>Banco de respuestas incorrectas que se mostrara de forma aleatoria al participante <br />
                NOTA: No pueden existir respuestas incorrectas iguales a las respuestas correctas</dd>
              </dl>
            </div>
            <div className="modal-footer">
              <button className="btn" data-dismiss="modal" aria-label="Close">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
      </>
  );
}
