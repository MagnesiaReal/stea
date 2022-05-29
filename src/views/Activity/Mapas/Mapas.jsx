import MapaDiv from "./MapaDiv/Mapa";
import MapaReg from "./MapaReg/Mapa";
import MapaCul from "./MapaCul/Mapa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Mapas.css"; 
import { useEffect, useState } from "react";

var iteradorMapa=0;
let listaRespuestas=[];
export default function Mapas(props){

  const preguntas=props.activity.preguntas;
  const [mapa,setMapa]=useState ();
  const [nextPregunta,setNextPregunta]=useState (false);

  const carga=<>
    <div className="stea-rotar">
      <FontAwesomeIcon icon="fas fa-spinner" />
    </div>    
    </>;

  useEffect(()=>{
    listaRespuestas=[];
    iteradorMapa=0;
    onNextPregunta();
  },[]);
  useEffect(function(){
    if(nextPregunta){
      onNextPregunta();
      setNextPregunta(false);

    }
  },[nextPregunta]);

  const onNextPregunta=(e)=>{

    if(preguntas.length>iteradorMapa){
      const pregunta=preguntas[iteradorMapa++]
      switch (pregunta.IDMapa){
        case 1:
          setMapa(<MapaDiv nextPregunta={setNextPregunta} pregunta={pregunta} lista={listaRespuestas}/>);

          break;
        case 2:
          setMapa(<MapaReg nextPregunta={setNextPregunta} pregunta={pregunta} lista={listaRespuestas}/>);

          break;
        case 3:
          setMapa(<MapaCul nextPregunta={setNextPregunta} pregunta={pregunta} lista={listaRespuestas}/>);
          break;
        default:
        setMapa(carga);
        break;
      }
    }else{ 
      // preparing resutls
      const results = {
        id: props.activity.id,
        type: props.activity.type,
        answers: listaRespuestas,
        grade: 666
      };
      props.setResults(results);
    }

  }
  if(nextPregunta){
    return <>
      {carga}
      </>
  }else{
    return <>
      {mapa}
      </>
  }
}

