import AXIOS from '../../../services/http-axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './RespCoinEditor.css'
import { useState } from 'react';

export default function RespCoinEditor(props) {

  const [wrongAnswers, setWrongAnswers] = useState([1,2,3]);

  return (
  <>
    <div className="container">
      <button  data-toggle="modal" data-target="#stea-resp-coin-help-modal" className="btn btn-dark stea-resp-coin-editor-help"><h4><FontAwesomeIcon icon="fas fa-info-circle" /></h4></button>
      <section>

      </section>
      <section>
        <h3>Respuestas Incorrectas</h3>
        
        {wrongAnswers.map((value, index, array)=> {
          console.log(array);
          return <h3 key={value}>o watu</h3>
        })}
        <input type="text" name="wrong-answers" id="" className="stea-resp-coin-editor-wrong-answers" />

      </section>
    </div>



    <div className="modal fade" id="stea-resp-coin-help-modal" tabindex="-1" role="dialog" aria-hidden="true">
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