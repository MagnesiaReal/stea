import AXIOS from '../../../services/http-axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './RespCoinEditor.css'
import { useState } from 'react';

let wrongAnsersKey = 0;
export default function RespCoinEditor(props) {
  
  const [questAns, setQuestAns] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [wrongAnswer, setWrongAnswer] = useState('');
  

  function onAddWrongAnswer(e) {
    e.preventDefault();
    if(wrongAnswer === '' || wrongAnswers.find(wa=> wa === wrongAnswer)) return;
    if(questAns.length && questAns.find(qa => qa.answer === wrongAnswer)) return;
    setWrongAnswers([...wrongAnswers, wrongAnswer]);
    setWrongAnswer('');
  }
  
  function onEnter(e) {
    if(e.key === 'Enter') onAddWrongAnswer(e);
  }

  function onWrongAnswer(e){
    setWrongAnswer(e.target.value);
  }

  return (
  <>
    <div className="container">
      <button  data-toggle="modal" data-target="#stea-resp-coin-help-modal" className="btn btn-dark stea-resp-coin-editor-help"><h4><FontAwesomeIcon icon="fas fa-info-circle" /></h4></button>
      <section>

      </section>
      <article>
        <label htmlFor="wrongAnswer">Ingresa una respuesta incorrecta: </label>
        <section className="stea-rce-set-wa">
          <input type="text" id="wrongAnswer" className="form-control" placeholder="Solo respuestas incorrectas" value={wrongAnswer} onChange={onWrongAnswer} onKeyDown={onEnter}/>
          <button className="btn btn-primary" onClick={onAddWrongAnswer}><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
        </section>
        <h3>Banco de respuestas incorrectas</h3>
        
        <section className="stea-rce-wrong-answers">
          {wrongAnswers.map((value, index)=> 
            <div key={value}>
              <button className="btn" onClick={()=>{setWrongAnswers(wrongAnswers.filter((v) => v !== value))}}>
                <FontAwesomeIcon icon="fas fa-times"/>
              </button> 
              <span>{value}</span>
            </div>)}
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
