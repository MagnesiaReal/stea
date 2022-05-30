import MapaDiv from "./MapaDiv/Mapa";
import MapaReg from "./MapaReg/Mapa";
import MapaCul from "./MapaCul/Mapa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Mapas.css"; 
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";


var iteradorMapa=0;
let listaRespuestas=[];

export default function Mapas(props){
  const cookies=new Cookies();
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
      var calificacion=0
      // preparing results 
      if(props.modo===1){//examen
        var aciertos=0;
        listaRespuestas.forEach((respuesta)=>{
          if(respuesta.respuestaRes===respuesta.Respuesta)
            aciertos++
        }
        )
        calificacion=(aciertos*100)/listaRespuestas.length; 

      }else if(props.modo===2 || props.modo===3){// 2 libre 3 equipo
        //const idAvatar=cookies.get("avatarId");
        const idAvatar=1//id del avatar a seguir
        var correctas=0;//variable para poder contar las respuestas correctas
        var seguidas=0;//variable para contar las respuestas seguidas correctas de manera rapida
        var multiplicador=1;//multiplicador de puntaje
        var calificacion=0;//calificación final
        var califPregunta=0;//calificación de la pregunta actual
        var auxPregunta=0;//acumulador de la calificación final
        if(idAvatar===1){//corredor
          listaRespuestas.forEach((respuesta)=>{
            if(respuesta.respuestaRes===respuesta.Respuesta){
              correctas++
              califPregunta=10*respuesta.tiempo;
              auxPregunta=califPregunta+auxPregunta;
              if(respuesta.tiempoRes===4){
                seguidas++//se incrementa la variable de respuestas seguidas siendo primeros
              }else{
                seguidas=0;//se reestablece el contador
              }
              if(seguidas>=5){//si el corredor tiene más de 5 tiene multiplicador
                multiplicador=1.05;
              }
            }
          }
          )
          calificacion=auxPregunta*multiplicador;
        }else if(idAvatar===2){//profesora
          listaRespuestas.forEach((respuesta)=>{

          }
          )
        }else if(idAvatar===3){//cirujana
          listaRespuestas.forEach((respuesta)=>{

          }
          )
        }else if(idAvatar===4){//ingeniero
          listaRespuestas.forEach((respuesta)=>{

          }
          )
        }
      }
      const results = {
        id: props.activity.id,
        type: props.activity.type,
        answers: listaRespuestas,
        grade: calificacion
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

