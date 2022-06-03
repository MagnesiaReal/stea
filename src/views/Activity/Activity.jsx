import Mapas from "./Mapas/Mapas"
import OrdenamientoAct from "./Ordenamiento/container/OrdenamientoAct"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AXIOS from '../../services/http-axios'
import {useParams} from "react-router-dom"
import Cookies from "universal-cookie"
import RespCoinEditor from "../Editor/RespCoinEditor/RespCoinEditor"

let activityData = {};

var actItr=0;
export default function Activity(){
  
  const cookie = new Cookies();
  const params = useParams();

  const [nextActivity,setNextActivity]=useState (false);
  const [currentActivity, setCurrentActivity]=useState(<h2>LODAGING... OR MAYBE AN ERROR</h2>);
  const [answersList, setAnswersList] = useState([]);

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
        console.log('Actividad from ACTIVIDAD GLOBAL: ', activityData);
        onNextActivity();
      }).catch(err => {
        console.log(err.stack, err.response);
      });
    

    
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


  function saveResults() {
    const credentials = {
      userId: cookie.get('userId'),
      UUID: cookie.get('UUID'),
      activityGroupId: params.activityGroupId
    };

    AXIOS.post('/activity/results', )
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
          setCurrentActivity(<RespCoinEditor modo={activityData.modo} activity={activity} setResults={setResults}/>);
          break;
        default:
          setCurrentActivity(<h1>Somethings wrong</h1>);
          console.log('default');
          break;
      }
    }else{
      setCurrentActivity(<h1>TERMINADO</h1>);//Finalizar Actividad
      console.log(answersList);
    }

  }
  

  if(nextActivity) return <>{carga}</>;
  else return(<>
    {currentActivity}
    </>);
}

