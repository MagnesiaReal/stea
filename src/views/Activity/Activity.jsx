import Mapas from "./Mapas/Mapas"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AXIOS from '../../services/http-axios'

const jsonMoc={id:0, type:1,preguntas:[
  {IDMapa:1,IDPregunta:1,Cuerpo:"Estado de la republica donde se tiene más turismo",Resp:"ROO",Tiempo:5},
  {IDMapa:2,IDPregunta:2,Cuerpo:"Estado de la republica donde vivimos",Resp:"MEX",Tiempo:5},
  {IDMapa:3,IDPregunta:3,Cuerpo:"Estado de la republica más grande",Resp:"CHH",Tiempo:5}]}

const RespCoin={

}

const ActividadCompleta={actividades:[jsonMoc]}

var actItr=0;
export default function Activity(){
  const [nextActivity,setNextActivity]=useState (false);
  const [currentActivity, setCurrentActivity]=useState(null);
  const [answersList, setAnswersList] = useState([]);

   const carga=<>
    <div className="stea-rotar">
      <FontAwesomeIcon icon="fas fa-spinner" />
    </div>    
    </>;

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

  

  function setResults(results) {
    console.log('Finishing activity, saving results...');
    setAnswersList([...answersList, results]);
    setNextActivity(true);
  }

  const onNextActivity = () => {
    if(actItr < ActividadCompleta.actividades.length){
      const activity=ActividadCompleta.actividades[actItr++];
      switch (activity.type){
        case 1:
          setCurrentActivity(<Mapas activity={activity} setResults={setResults}/>);
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
      console.log(answersList);
    }

  }
  

  if(nextActivity) <>{carga}</>
  else return<>
    {currentActivity}
    </>
}

