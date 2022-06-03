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
    <div className="stea-rotar">asdfasdfasdf
      <FontAwesomeIcon icon="fas fa-spinner" />
    </div>    
    </>;

  useEffect(()=>{
    console.log('Primer useeffect', nextPregunta);
    listaRespuestas=[];
    iteradorMapa=0;
    onNextPregunta();
  },[]);

  useEffect(function(){
    console.log('YAAAAAAAAAAAA!!!!!!!!!111');
    if(nextPregunta){
      onNextPregunta();
      setNextPregunta(false);

    }
  },[nextPregunta]);

  const onNextPregunta=(e)=>{

    if(preguntas.length>iteradorMapa){
      const pregunta=preguntas[iteradorMapa++]
      switch (pregunta.IDMapa){
        case 1: case '1':
          setMapa(<MapaDiv nextPregunta={setNextPregunta} pregunta={pregunta} lista={listaRespuestas}/>);

          break;
        case 2: case '2':
          setMapa(<MapaReg nextPregunta={setNextPregunta} pregunta={pregunta} lista={listaRespuestas}/>);

          break;
        case 3: case '3':
          setMapa(<MapaCul nextPregunta={setNextPregunta} pregunta={pregunta} lista={listaRespuestas}/>);
          break;
        default:
        setMapa(carga);
        break;
      }
    }else{
      
      setMapa(<h2>Simulacro Terminado</h2>)
      console.log('Calificando en Mapas',props);
      var posicion = 1;
      var calificacion=0
      // preparing results 
      if(props.modo==1){//examen
        console.log("Examen")
        var aciertos=0;
        listaRespuestas.forEach((respuesta)=>{
          if(respuesta.respuestaRes===respuesta.Respuesta)
            aciertos++
        }
        )
        calificacion=(aciertos*100)/listaRespuestas.length; 
        console.log(calificacion,aciertos,listaRespuestas.length);
      }else if(props.modo==2 || props.modo==3){// 2 libre 3 equipo
        console.log("Normal")
        //const idAvatar=cookies.get("avatarId");
        const idAvatar=1;//id del avatar a seguir
        var correctas=0;//variable para poder contar las respuestas correctas
        var seguidas=0;//variable para contar las respuestas seguidas correctas de manera rapida
        var multiplicador=1;//multiplicador de puntaje
        var calificacion=0;//calificación final
        var califPregunta=0;//calificación de la pregunta actual
        var auxPregunta=0;//acumulador de la calificación final
        var experienciaMul=1;//Multiplicador de experiencia
        var experiencia=120;//Experiencia que gana el usuario
        var seguidasAux=1;//Auxiliar para contar seguidas
        var puntosIng=1;//Auxiliar para conocer la cantidad de veces que junto 3 preguntas
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if(idAvatar===1){//corredor
          console.log("Corredor en normal")
          listaRespuestas.forEach((respuesta)=>{
            califPregunta=0;//Limpiamos el valor de cada pregunta para evitar errores
            if(respuesta.Tiempo===0){//Si no tenemos tiempo para resolver
              if(respuesta.respuestaRes==respuesta.Respuesta){
                correctas++
                console.log(correctas,"+")
                califPregunta=10*(1+(1/parseFloat(respuesta.TiempoAsc)));//calificación de la pregunta por el tiempo
                auxPregunta=califPregunta+auxPregunta;//sumatoria de la calificación
                console.log(califPregunta,respuesta.TiempoAsc,auxPregunta)
                if(respuesta.tiempoAsc<=(4)){
                  seguidas++//se incrementa la variable de respuestas seguidas siendo primeros
                }else{
                  seguidas=0;//se reestablece el contador
                }
                if(seguidas>=5){//si el corredor tiene más de 5 tiene multiplicador
                  multiplicador=1.05;
                }
              }else{
                //No hace nada si no responde bien¿?
              }
            
            }else{//Si tenemos tiempo para resolver

            if(respuesta.respuestaRes==respuesta.Respuesta){
              correctas++
              
              califPregunta=10*respuesta.tiempoRes;//calificación de la pregunta por el tiempo
              

              auxPregunta=califPregunta+auxPregunta;//sumatoria de la calificación
              if(respuesta.tiempoRes>=(respuesta.Tiempo*0.7)){
                seguidas++//se incrementa la variable de respuestas seguidas siendo primeros
              }else{
                seguidas=0;//se reestablece el contador
              }
              if(seguidas>=5){//si el corredor tiene más de 5 tiene multiplicador
                multiplicador=1.05;
              }
            }else{
              //No hace nada si no responde bien¿?
            }
          }
        }
          )
          calificacion=auxPregunta*multiplicador;
          console.log(calificacion,auxPregunta,multiplicador)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////          
        }else if(idAvatar===2){//profesora
          listaRespuestas.forEach((respuesta)=>{
            califPregunta=0;//Limpiamos el valor de cada pregunta para evitar errores
            if(respuesta.Tiempo===0){//Si no tenemos tiempo para resolver
              if(respuesta.respuestaRes==respuesta.Respuesta){
                correctas++
                califPregunta=10*(1+(1/respuesta.TiempoAsc));//calificación de la pregunta por el tiempo
                auxPregunta=califPregunta+auxPregunta;//sumatoria de la calificación
                console.log(califPregunta,auxPregunta)
                if(posicion===1||posicion===2||posicion===3){//uso posición porque no se como se puede obtener 
                  experienciaMul=1.1;//Modifica el multiplicador de experiencia
                }
              }
            }else{//si tenemos tiempo para resolver
            if(respuesta.respuestaRes==respuesta.Respuesta){
              correctas++
              califPregunta=10*respuesta.tiempoRes;//calificación de la pregunta por el tiempo
              auxPregunta=califPregunta+auxPregunta;//sumatoria de la calificación
              if(posicion===1||posicion===2||posicion===3){//uso posición porque no se como se puede obtener 
                experienciaMul=1.1;//Modifica el multiplicador de experiencia
              }
            }
          }
        }
          )
          calificacion=auxPregunta;
          experiencia=experiencia*experienciaMul;
          console.log(calificacion,auxPregunta,multiplicador)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////          
        }else if(idAvatar===3){//cirujana
          listaRespuestas.forEach((respuesta)=>{
            califPregunta=0;//Limpiamos el valor de cada pregunta para evitar errores
            if(respuesta.Tiempo===0){//Si no tenemos tiempo para resolver
              if(respuesta.respuestaRes==respuesta.Respuesta){
                correctas++
                califPregunta=10*(1+(1/respuesta.TiempoAsc));//calificación de la pregunta por el tiempo
                auxPregunta=califPregunta+auxPregunta;//sumatoria de la calificación
                seguidas++//Cuenta la cantidad de preguntas seguidas que ha contestado
                console.log(califPregunta,auxPregunta,seguidas)
              }else{
                seguidasAux=seguidas;//Se guarda el valor de las rachas en caso de que no tengamos respuesta correcta
                seguidas=1;//Se reestablece el contador de seguidas
              }
            }else{//Si tenemos tiempo para resolver
            if(respuesta.respuestaRes==respuesta.Respuesta){
              correctas++
              califPregunta=10*respuesta.tiempoRes;//calificación de la pregunta por el tiempo
              auxPregunta=califPregunta+auxPregunta;//sumatoria de la calificación
              seguidas++//Cuenta la cantidad de preguntas seguidas que ha contestado
              
            }else{
              seguidasAux=seguidas;//Se guarda el valor de las rachas en caso de que no tengamos respuesta correcta
              seguidas=1;//Se reestablece el contador de seguidas
            }
          }
        }
          )
          if(seguidasAux>=seguidas){//Compara que valor es el mayor entre las rachas obtenidas
            multiplicador=1.05*seguidasAux//Si tenemos que la racha historia es mayor a la racha que tenemos se multiplica por el historico
          }else{
            multiplicador=1.05*seguidas//Si tenemos que la racha actual es mayor a la historica se multiplica por ese factor
          }
          calificacion=auxPregunta*multiplicador;//puntuación con el multiplicador
          console.log(calificacion,auxPregunta,multiplicador)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        }else if(idAvatar===4){//ingeniero
          listaRespuestas.forEach((respuesta)=>{
          califPregunta=0;//Limpiamos el valor de cada pregunta para evitar errores
          if(respuesta.Tiempo===0){//Si no tenemos tiempo para responder
            if(respuesta.respuestaRes==respuesta.Respuesta){
              correctas++
              califPregunta=10*(1+(1/respuesta.TiempoAsc));//calificación de la pregunta por el tiempo
              auxPregunta=califPregunta+auxPregunta;//sumatoria de la calificación
              seguidas++//Cuenta la cantidad de preguntas seguidas que ha contestado
            }else{
              califPregunta=0;
              auxPregunta=califPregunta+auxPregunta;
              seguidasAux=seguidas;//Se guarda el valor de las rachas en caso de que no tengamos respuesta correcta
              seguidas=0;//Se reestablece el contador de seguidas
            }
            if(seguidasAux>=seguidas){//Compara que valor es el mayor entre las rachas obtenidas
              puntosIng=seguidasAux%3//contamos la cantidad de veces que acumulo 3 respuestas correctas
              if(puntosIng===0)//si no obtuvo ninguno se pondra como valor 1 para multiplicar
              puntosIng=1;
            }else{
              puntosIng=seguidas%3//contamos la cantidad de veces que acumulo 3 respuestas correctas
              if(puntosIng===0)//si no obtuvo ninguno se pondra como valor 1 para multiplicar
              puntosIng=1;
            }
            multiplicador=multiplicador+(puntosIng/10);
            calificacion=(auxPregunta*multiplicador);//puntuación con el multiplicador
            console.log(calificacion,auxPregunta,multiplicador)
            
          }else{//Si tenemos tiempo para responder
          if(respuesta.respuestaRes==respuesta.Respuesta){
            correctas++
            califPregunta=10*respuesta.tiempoRes;//calificación de la pregunta por el tiempo
            auxPregunta=califPregunta+auxPregunta;//sumatoria de la calificación
            seguidas++//Cuenta la cantidad de preguntas seguidas que ha contestado
          }else{
              califPregunta=0;
              auxPregunta=califPregunta+auxPregunta;
              seguidasAux=seguidas;//Se guarda el valor de las rachas en caso de que no tengamos respuesta correcta
              seguidas=0;//Se reestablece el contador de seguidas
          }
          if(seguidasAux>=seguidas){//Compara que valor es el mayor entre las rachas obtenidas
            puntosIng=seguidasAux%3//contamos la cantidad de veces que acumulo 3 respuestas correctas
            if(puntosIng===0)//si no obtuvo ninguno se pondra como valor 1 para multiplicar
            puntosIng=1;
          }else{
            puntosIng=seguidas%3//contamos la cantidad de veces que acumulo 3 respuestas correctas
            if(puntosIng===0)//si no obtuvo ninguno se pondra como valor 1 para multiplicar
            puntosIng=1;
          }
          multiplicador=multiplicador+(puntosIng/10);
          calificacion=(auxPregunta*multiplicador);//puntuación con el multiplicador
          console.log(calificacion,auxPregunta,multiplicador)          
          
          }
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
      console.log('lanzando resultados');
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

