import React, { useEffect, useState } from 'react';
import Placeholder from '../components/Placeholder/Placeholder';
import './OrdenamientoAct.css'
const OrdenamientoAct = (props) => {

  const question = props.activity
  // {
  //   id : 1,
  //   time: 12,
  //   pregunta : "Ordena los momentos historicos importantes de México a lo largo de la historia",
  //   pista_inferior: "fadva",
  //   pista_superior: "fda",
  //   options : [
  //       {answer: '11', pista: 's'},
  //       {answer: '22 de agustin de iturbide', pista: 'fag'},
  //       {answer: '33', pista: 'hfs'},
  //       {answer: '44', pista: 'e'},
  //       {answer: '55', pista: 's'},
  //       {answer: '66', pista: 'fag'},
  //       {answer: '77', pista: 'hfs'},
  //       {answer: '88', pista: 'e'},
  //       {answer: '99', pista: 'hfs'},
  //       {answer: '00', pista: 'e'},
  //   ]
  // }

  const [calificacion, setCalificacion] = useState(question);
  const [ready, setReady] = useState(false);
  const [opciones, setOpciones] = useState([]);
  const [correctas, setCorrectas] = useState([]);
  const [respuesta, setRespuesta] = useState([]);

  /*Funcionamiento del juego*/
  const [time, setTime] = useState(question.time)
  const [timeAlong, setTimeAlong] = useState(0)
  const [mode, setMode] = useState(2);
  /*Ordenando el arreglo*/
  useEffect(() => { 
    question.options.map( (item, index) => {
      question.options[index] = {
        ...item, "id" : index
      }
    })
    setCorrectas(question.options)

    const myJson = JSON.parse(JSON.stringify(question.options));

    console.log("Las correctas son:",question.options);

    const jotason = JSON.parse(JSON.stringify(question))
    console.log("Las correctas son:",question.options);
    console.log(jotason);
    setOpciones(jotason.options.sort(()=>{return Math.random() -0.5}));
    
    
    console.log("Las que no son:",opciones);
    setReady(true)
  },[]);

  /*Tiempo*/
  useEffect(()=>{
    if(time===0 && question.time!==0) {
        resultado();
    }
  },[time]);

  useEffect(()=>{
    if(question.time>0){ //Si tiene tiempo la actividad
      const idProceso=setInterval(()=>{
          if(time<=0) {
              clearInterval(idProceso);   
          }
          else{
          setTime((tiempo)=>tiempo-1)}
      },1000);
      return ()=>clearInterval(idProceso);           
    }else{ //Si la activdad no tiene tiempo
      console.log("iempo infinito");
      const idProceso=setInterval(()=>{
        setTimeAlong((tiempo)=>tiempo+1)
      },1000);
    return ()=>clearInterval(idProceso);  
    }
  },[]);

  const resultadoRespuestas = (puntos) => {
    console.log("los puntos son ->",puntos);
    setCalificacion({
      ...question,
      puntos: puntos
    })
    const results = {
      id: props.activity.id,
      type: props.activity.type,
      answers: respuesta,
      grade: puntos
    };
    props.setResults(results);
    console.log("Lo que se manda es: ",results);
  }

  const corredor = (puntos) => {
    if(question.time>0){
      if(puntos>=80) puntos = (puntos*(time*1.5))
      if(puntos>=50 && puntos<80) puntos = (puntos*(time*1.2))
    }else{
      if(puntos>=80) puntos = ((puntos*50)-(timeAlong*1.5))
      if(puntos>=50 && puntos<80) puntos = ((puntos*35)-(timeAlong*1.2))
    }
    return puntos
  }

  const profesora = (puntos) => {
    let posicion = 1;
    let experienciaMul = 1;
    if(question.time>0){
      if(posicion===1||posicion===2||posicion===3){//uso posición porque no se como se puede obtener 
        experienciaMul=1.1;//Modifica el multiplicador de experiencia
      }
      puntos = (puntos*time)
    }else{
      if(posicion===1||posicion===2||posicion===3){//uso posición porque no se como se puede obtener 
        experienciaMul=1.1;//Modifica el multiplicador de experiencia
      }
      puntos = ((puntos*10)-(timeAlong*1.2))
    }
    return puntos
  }

  const cirujana = (puntos) => {
    if(question.time>0){
      if(puntos===100) puntos = ((puntos+35)*time)
      if(puntos<100) puntos = ((puntos+15)*time)
    }else{
      if(puntos===100) puntos = ((puntos*30)-(timeAlong*1.2))
      if(puntos<100) puntos = ((puntos*1.5)-(timeAlong*1.2))
    }
    return puntos
  }

  const ingeniero = (puntos) => {
    if(question.time>0){
      if(puntos>70) puntos = ((puntos*2)*time)
      if(puntos>50 && puntos<70) puntos = ((puntos*1.1)*time)
      if(puntos<40) puntos = ((puntos*.9)*time)
    }else{
      if(puntos>70) puntos = ((puntos*20)-timeAlong)
      if(puntos>50 && puntos<70) puntos = ((puntos*11)-(timeAlong*1.2))
      if(puntos<40) puntos = ((puntos*9)-(timeAlong*1.2))
    }
    return puntos
  }

  const resultado = () => {
    let aciertos=0;
    let puntos = 0;
    respuesta.map((opcion,index) => {
      if(correctas[index].id==opcion.id) aciertos++;
    })
    puntos = aciertos*100 / correctas.length
    console.log("los puntos son: ", puntos);
    if(mode===1){//examen
      resultadoRespuestas(puntos)
    }else if(mode===2 || mode===3){
      const idAvatar=4
      if(idAvatar===1) puntos = corredor(puntos);
      if(idAvatar===2) puntos = profesora(puntos);
      if(idAvatar===3) puntos = cirujana(puntos);
      if(idAvatar===4) puntos = ingeniero(puntos);
      resultadoRespuestas(puntos)
    }
  }
  

  if(!ready) return( <div>Loading</div>) 
  else{

    return (
      <div className='stea-ordenamientoContenedor-Padding'>
        <p>Pregunta {question.id}-. {question.pregunta}</p>
        {question.time!==0 ? <h1>{time}</h1> : <h1>{timeAlong}</h1>}
        <h3>{question.pista_superior}</h3>

        <div className='stea-ordenamientoContenedor-contenedorDragNDrop'>
          <Placeholder options={opciones} respuesta={respuesta} setRespuesta={setRespuesta}/>
        </div>
        <h3>{question.pista_inferior}</h3>

        <button className='stea-ordenamientoAct-botonEstilo' onClick={resultado}> Enviar </button>
        {calificacion.puntos}
      </div>
    )}
};

export default OrdenamientoAct;

