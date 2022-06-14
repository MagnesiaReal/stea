import Mapas from "./Mapas/Mapas"
import OrdenamientoAct from "./Ordenamiento/container/OrdenamientoAct"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AXIOS from '../../services/http-axios'
import {useNavigate, useParams} from "react-router-dom"
import Cookies from "universal-cookie"
import ProgresoActivity from "./ProgresoActivity/ProgresoActivity"
import CountUp from "react-countup"

import medal1 from '../../images/1.png'
import medal2 from '../../images/2.png'
import medal3 from '../../images/3.png'

import RespCoin from "./RespCoin/RespCoin"
import './Activity.css'

let activityData = {};
const medals = [medal1, medal2, medal3];

var actItr=0;
export default function Activity(){
  const cookie = new Cookies();
  const params = useParams();
  const navigation = useNavigate();
  
  const [grade, setGrade] = useState(0);
  const [preGrade, setPreGrade] = useState(0);
  const [name, setName] = useState('');
  const [avatars, setAvatars] = useState([]);
  const [finish, setFinish] = useState(false);
  const [extra, setExtra] = useState(null);
  const [nextActivity,setNextActivity]=useState (false);
  const [currentActivity, setCurrentActivity]=useState(<h2>LODAGING... OR MAYBE AN ERROR</h2>);
  const [answersList, setAnswersList] = useState([]);
  const [numAct, setNumAct] = useState(0);
  const [showDesc, setShowDesc] = useState(true);

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
        //onNextActivity();
      }).catch(err => {
        console.log(err.stack, err.response);
      });

    AXIOS.get('/user/avatars',{})
    .then((res)=> {

      console.log("USER>> avatars: ", res.data);
      setAvatars(res.data.avatars);

    }).catch((err)=>{
      console.log("Aqui estoy :D",err.response.status,err.response.data.message)
    });
    
    //document.body.requestFullscreen();
  
    return () => {
      //window.document.exitFullscreen(document.body);
    }
  },[]);

  useEffect(function(){
    if(!showDesc) {
      onNextActivity();
    }
  }, [showDesc]);

  useEffect(function(){
    console.log("aqui estyoy");
    const timerId = setTimeout(()=>{
      if(nextActivity){
        onNextActivity();
        setNextActivity(false);
      }
      clearTimeout(timerId);
    }, 7500);
  },[nextActivity]);


  function setResults(results) {
    console.log('Finishing activity, saving results...');
    setGrade(grade + results.grade);
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
        const extraJson = res.data.extra;
        setExtra(JSON.parse(extraJson));
        setFinish(true);
      }).catch(err => {
        console.log(err.response, err.stack);
      });
  }

  const onNextActivity = () => {
    setPreGrade(grade);
    if(actItr < activityData.actividad.length){
      const activity=activityData.actividad[actItr++];
      setName(activity.name);
      console.log('Esta es la constante activdiad', activity, nextActivity);
      switch (activity.type){
        case 1: case '1':
          setCurrentActivity(<Mapas modo={activityData.modo} activity={activity} setResults={setResults}/>);
          break;
        case 2: case '2':
          setCurrentActivity(<OrdenamientoAct modo={activityData.modo} activity={activity} setResults={setResults}/>);
          break;
        case 3: case '3':
          setCurrentActivity(<RespCoin mode={activityData.modo} activity={activity} setResults={setResults}/>);
          break;
        default:
        setCurrentActivity(<h1>Somethings wrong</h1>);

        console.log('default');
        break;
      }
    }else{
      //let grade = 0;
      //answersList.forEach(a=> {
        //grade+=a.grade;
      //});

      if(activityData.modo == 1) { 
        console.log('Calificaion Total if Examen: ', grade);
      } else console.log('Calificacion total if Actividad: ', grade);
      console.log(answersList);
      saveResults(grade, answersList);
      setCurrentActivity(<h1>TERMINADO <button className="btn btn-dark" onClick={()=>{navigation(-1)}}>Regresar a Inicio</button></h1>);//Finalizar Actividad
    }

  }

  if(finish) return <div className="stea-activity-back">
    <section className="stea-activity-subact-title">
      <h1>{activityData.titulo}</h1>
    </section>
    <section className="stea-activity-points">
      <img 
        src={avatars[cookie.get('avatarId')-1].avatarUrl} alt="avatar.jotapege"
        id="stea-activity-avatar"/>
      <div className="stea-activity-grade">
        <h1>{extra.grade.toFixed(0)} pts</h1>
      </div>
      <div className="stea-activity-grade">
        Fuiste la persona numero {extra.rank} en resolver la actividad
      </div>
      
    </section>
    {(extra.rank <=3)?<section className="stea-activity-points">
      <div className="stea-activity-grade">
        <h2><b>Felicidades !!!</b><br/>
        Ganaste una medalla de {extra.rank}° lugar.</h2>
      </div>
      <img src={medals[extra.rank-1]} alt="medal"/>
    </section>:null}
    
    <button className="btn btn-dark stea-exit-button" onClick={()=>{navigation(-1)}}>Regresar a Inicio</button>
    
    <ProgresoActivity longitud={numAct} actItr={actItr}/>
  </div>

  if(showDesc) return <>
    <article className="stea-activity-start-description">
      <section className="stea-activity-title">
        <h1>{activityData.titulo}</h1>
      </section>

      <section className="stea-activity-desc">
        <h2>{activityData.descripcion}</h2>
        <div id ="stea-forbutton">
          <button className="btn btn-primary" onClick={()=>{setShowDesc(false)}}><i class="fas fa-play"></i> Comenzar </button>
        </div>
      </section>

    </article>
    </>
  if(nextActivity) return <div className="stea-activity-back">
    <section className="stea-activity-subact-title">
      <h1>{name}</h1>
    </section>
    <section className="stea-activity-points">
      <img 
        src={avatars[cookie.get('avatarId')-1].avatarUrl} alt="avatar.jotapege"
        id="stea-activity-avatar"/>
      <div className="stea-activity-grade">
        <h1><CountUp start={preGrade} end={grade} duration={5} useEasing={true}/> pts</h1>
      </div>
    </section>
    <ProgresoActivity longitud={numAct} actItr={actItr}/>
  </div>;
  else return(<>
    {currentActivity}
    </>);
}

