import Mapas from "./Mapas/Mapas"
import { useEffect, useState } from "react"

const jsonMoc={type:1,jsonActividad:[
  {IDMapa:1,IDPregunta:1,Cuerpo:"Estado de la republica donde se tiene más turismo",Resp:"ROO",Tiempo:5},
  {IDMapa:2,IDPregunta:2,Cuerpo:"Estado de la republica donde vivimos",Resp:"MEX",Tiempo:5},
  {IDMapa:3,IDPregunta:3,Cuerpo:"Estado de la republica más grande",Resp:"CHH",Tiempo:5}]}


const ActividadCompleta={actividades:[jsonMoc]}

var actItr=0;
const answersList=[];
var activityAnswers=null;

export default function Activity(){
  const [nextActivity,setNextActivity]=useState (false);
  const [currentActivity, setCurrentActivity]=useState(null)

  useEffect(()=>{
    actItr=0;
    onNextActivity();

  },[]);

  useEffect(function(){
    if(nextActivity){
      onNextActivity();
      setNextActivity(false);
    }
  },[nextActivity]);

  const onNextActivity=(e)=>{
    if(activityAnswers!==null){
      answersList.push(activityAnswers);
    }
    if(ActividadCompleta.actividades.length>actItr){
      const activity=ActividadCompleta.actividades[actItr++]
      switch (activity.type){
        case 1:
          activityAnswers={id:actItr,type:activity.type,grade:0,answers:[]}
          setCurrentActivity(<Mapas activity={activity.jsonActividad} nextActividad={setNextActivity} listaRespuestas={activityAnswers.answers}/>)
          break;
        case 2:


          break;
        case 3:

          break;
        default:
          console.log('default');
          break;
      }
    }else{
      setCurrentActivity(<h1>TERMINADO</h1>)//Finalizar Actividad
      console.log(answersList)
    }

  }
  return<>
    {currentActivity}
    </>
}

