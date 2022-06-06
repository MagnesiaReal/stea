import Mapas from "./Mapas/Mapas"
import OrdenamientoAct from "./Ordenamiento/container/OrdenamientoAct"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AXIOS from '../../services/http-axios'
import {useNavigate, useParams} from "react-router-dom"
import Cookies from "universal-cookie"


import ProgresoActivity from "./ProgresoActivity/ProgresoActivity"

import RespCoin from "./RespCoin/RespCoin"


let activityData = {};

var actItr=0;
export default function Activity(){
  
  const cookie = new Cookies();
  const params = useParams();
  const navigation = useNavigate();

  const [nextActivity,setNextActivity]=useState (false);
  const [currentActivity, setCurrentActivity]=useState(<h2>LODAGING... OR MAYBE AN ERROR</h2>);
  const [answersList, setAnswersList] = useState([]);
  const [numAct, setNumAct] = useState(0)
   const carga=<>
    <div className="stea-rotar">
      <FontAwesomeIcon icon="fas fa-spinner" />
    </div>    
    </>;

  useEffect(()=>{
    const credetials = {
      userId: cookie.get('userId'),
      UUID: cookie.get('UUID'),
      activityGroupId: params.activityGroupId
    };

    AXIOS.get('/activity/activityresolve', {params: credetials})
      .then(res => {
        console.log('CREDENCIALES >> Success: ', res.data.activityData);
        activityData = res.data.activityData;
        activityData.actividad = JSON.parse(activityData.actividad);
        actItr=0;
        setNumAct(activityData.actividad.length)
        console.log('Actividad from ACTIVIDAD GLOBAL: ', activityData);
        onNextActivity();
      }).catch(err => {
        console.log(err.stack, err.response);
      });
    
    document.body.requestFullscreen();
  
    return () => {
      window.document.exitFullscreen(document.body);
    }
  },[]);

  useEffect(function(){
    console.log("aqui estyoy");
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


  function saveResults(grade, results) {
    const credentials = {
      userId: cookie.get('userId'),
      UUID: cookie.get('UUID'),
      groupActivityId: params.activityGroupId,
      qualification: grade,
      results: JSON.stringify(results)
    };

    AXIOS.post('/activity/results', credentials)
      .then(res=> {
        console.log('Success Saved message>> ', res.data.message);
        navigation(-1);
      }).catch(err => {
        console.log(err.response, err.stack);
      });
  }

  const onNextActivity = () => {
    if(actItr < activityData.actividad.length){
      const activity=activityData.actividad[actItr++];
      console.log('Esta es la constante activdiad', activity, nextActivity);
      switch (activity.type){
        case 1: case '1':
          setCurrentActivity(<Mapas modo={activityData.modo} activity={activity} setResults={setResults}/>);
          break;
        case 2: case '2':
          setCurrentActivity(<OrdenamientoAct modo={activityData.modo} activity={activity} setResults={setResults}/>);
          break;
        case 3: case '3':
          setCurrentActivity(<RespCoin modo={activityData.modo} activity={activity} setResults={setResults}/>);
          break;
        default:
        setCurrentActivity(<h1>Somethings wrong</h1>);
        console.log('default');
        break;
      }
    }else{
      let grade = 0;
      answersList.forEach(a=> {
        grade+=a.grade;
      });

      if(activityData.modo == 1) { 
        grade = grade/answersList.length;
        console.log('Calificaion Total if Examen: ', grade);
      } else console.log('Calificacion total if aCtividad: ', grade);
      
      console.log(answersList);

      saveResults(grade, answersList);

      setCurrentActivity(<h1>TERMINADO</h1>);//Finalizar Actividad
      
    }

  }


  if(nextActivity) return <>{carga} {setTimeout(()=>console.log("esperando"),5000)} </>;
  else return(<>
    {currentActivity}
    {console.log("Son: ",numAct)}
    <ProgresoActivity longitud={numAct} actItr={actItr}/>
    </>);
}

