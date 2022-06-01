import React, { useEffect, useState } from 'react';
import Placeholder from '../components/Placeholder/Placeholder';
import './OrdenamientoAct.css'

const OrdenamientoAct = (props) => {

  const question = {
    id : 1,
    time: 10,
    pregunta : "Ordena los momentos historicos importantes de México a lo largo de la historia",
    pista_inferior: "fadva",
    pista_superior: "fda",
    options : [
        {answer: 'Primero', pista: 's'},
        {answer: 'Asesinato de agustin de iturbide', pista: 'fag'},
        {answer: 'Tercero', pista: 'hfs'},
        {answer: 'Cuarto', pista: 'e'},
        {answer: 'Primero', pista: 's'},
        {answer: 'Segundo', pista: 'fag'},
        {answer: 'Tercero', pista: 'hfs'},
        {answer: 'Cuarto', pista: 'e'},
        {answer: 'Tercero', pista: 'hfs'},
        {answer: 'Cuarto', pista: 'e'},
    ]
  }

  const [calificacion, setCalificacion] = useState(question);
  const [ready, setReady] = useState(false);
  const [opciones, setOpciones] = useState([]);
  const [respuesta, setRespuesta] = useState([]);


  useEffect(() => {
    question.options.map( (item, index) => {
      question.options[index] = {
        ...item, "id" : index
      }
    })
    setOpciones(question.options);

    
    
    setReady(true)
  },[]);

  const resultado = () => {
    setRespuesta(opciones)
    let cont = 0;
    console.log(respuesta);
    respuesta.map((opcion,index) => {
      if(opciones[index]===opcion) cont++;
    })
    console.log(cont)
    setCalificacion({
      ...question,
      calificacion : cont
    })
    console.log(calificacion)
  }

  if(!ready) return( <div>Loading</div>) 
  else{

    return (
      <div className='stea-ordenamientoContenedor-Padding'>
        <p>Pregunta {question.id}-. {question.pregunta}</p>
        
        <h3>{question.pista_superior}</h3>

        <div className='stea-ordenamientoContenedor-contenedorDragNDrop'>
          <Placeholder options={opciones} respuesta={respuesta} setRespuesta={setRespuesta}/>
        </div>
        <h3>{question.pista_inferior}</h3>

        <button className='stea-ordenamientoAct-botonEstilo' onClick={resultado}> Enviar </button>
      </div>
    )}
};

export default OrdenamientoAct;

