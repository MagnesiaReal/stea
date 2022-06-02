import {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import RespCoinEditor from './RespCoinEditor/RespCoinEditor'
import MapaEditor from "./MapaEditor/MapaEditor";
import OrdEditor from "./OrdenEditor/OrdEditor";
import AXIOS from "../../services/http-axios"

import './Editor.css'
import {useParams} from "react-router-dom";
import EditorModal from './EditorModal/EditorModal'

let activityIncrement = 0;
let activityData = null;
export default function Editor(props) {

  const cookie = new Cookies();
  const params = useParams();

  const [show, setShow] = useState(false);

  const [generalData, setGeneralData] = useState(null);
  const [currentEditor, setCurrentEditor] = useState(null);
  const [activities, setActivities] = useState([]);
  
  const [name, setName] = useState('');

  const activityType = [
    <small>Mapas Interactivos</small>,
    <small>Ordenamiento Gerarquico</small>,
    <small>Respuestas Coincidentes</small>
  ];


  useEffect(()=> { 
    activityData = null;
    const credentials = {
      userId: cookie.get('userId'),
      UUID: cookie.get('UUID'),
      activityId: params.activityId,
    };


    AXIOS.get('/activity/activityedit', {params: credentials})
      .then((res)=> {
        console.log("EDITOR>> ", res.data.message, res.data);
        activityData = res.data.activityData;

       

        activityData.actividad = JSON.parse(activityData.actividad);

        if(activityData.actividad === null || activityData.actividad.length === 0) {
          activityData.actividad = [];
          setEditor(0);
          setGeneralData(activityData);
          setActivities(activityData.actividad);
        } else {
          activityData.actividad.forEach((a)=>{
            a.map = activityIncrement++;
          });
          setEditor(activityData.actividad[0]);
          setGeneralData(activityData.actividad[0]);
          setActivities(activityData.actividad);
        }
        
      }).catch((err)=> {
        if(err) throw err;

      });

  }, []);

  
  function setEditor(activity) {
    const editorType = activity.type;
    console.log('Activity from editor: ', activity);
    switch (editorType) {
      case 1: case '1':
        setCurrentEditor(<MapaEditor actividad={activity}/>);
        break;
      case 2: case '2':
        setCurrentEditor(<OrdEditor activity={activity}/>);
        break;
      case 3: case '3':
        setCurrentEditor(<RespCoinEditor activity={activity}/>);
        break;
      default:
        setCurrentEditor(<h1>CREA UNA ACTIVIDAD NUEVA PARA EDITAR</h1>);
        break;  
    }
  }

  function addEditor(values) {
    // build an editor
    const build = {
      map: activityIncrement++,
      id: activities.length,
      type: values.type,
      name: values.title
    }

    if(values.type == 3){
      build.questions = [];
      build.wrongAnswers = [];
    } 
    else build.preguntas = [];
    
    activityData.actividad.push(build);
    setActivities(activityData.actividad);
    setEditor(activities[build.id]);
    generalData(activities[build.id]);
  }

  function selectEditor(idx) {
    setEditor(activities[idx]);
  }

  function onDeleteActivity(idx) {
    // activityData.actividad = activityData.actividad.filter((value, index)=> index !== idx);
    activityData.actividad.splice(idx, 1);
    const ids = 0;
    activityData.actividad.forEach((a)=>{
      a.id = ids;
    });
    setActivities(activityData.actividad);
  
  }
  
  function saveActivity(e) {
    const credentials = {
      userId: cookie.get('userId'),
      UUID: cookie.get('UUID'),
      title: 'XD',
      description: "XD jajaj lol",
      activityId: params.activityId,
      activity: JSON.stringify(activityData.actividad)
    }; 

    AXIOS.put('/activity/update', credentials)
      .then(res=>{
        console.log('ACTIVITY SAVED >> ', res.data.message);
      }).catch(err=> {
        if(err.response.status===409) {
          console.log(err.response.data.message, err.stack);    
        } else {
          console.log(err.stack);
        }
      })
  }

  return (<>
    <div id="stea-editor-container">
      
      <section id="stea-editor-sidebar" className={(show)?"show":""}>
        
       <div>
         <h1 className="stea-editor-nombre">STEA</h1>
         <img src="/static/media/logo.e7781063c36a1c7b3f30.png" className="stea-editor-logo" alt=""/>
         
        </div>
       
       <hr className="stea-editor-hrPrimero"></hr>
        
        
        <ul className="stea-editor-lista">
          
          {activities.map((v, idx)=> <li key={v.map} idx={idx}>
            <div className="stea-editor-actividad" onClick={()=>selectEditor(idx)}>
              <h3>{v.name}</h3>
              <h6>{activityType[v.type-1]}</h6> 
            </div>
          </li>)}
          <li>
            <div className="stea-editor-actividad" id="stea-editor-add" data-toggle="modal" data-target="#stea-add-editor-modal">
            <FontAwesomeIcon icon="fas fa-plus-circle" />
            </div>
          </li>
        </ul>

        <hr className="stea-editor-hrSegundo"></hr>

        <button onClick={saveActivity} className="btn btn-success stea-editor-boton" >Guardar Actividades</button>
      </section>
      <section id="stea-editor-called">
        <header id="stea-editor-header">
          <button 
            className="btn btn-light stea-editor-sidebar-button"
            onClick={()=>{setShow((show)?false:true)}}>
            <FontAwesomeIcon icon="fas fa-bars"/>
          </button>
          <h2>{(generalData)?generalData.name: "Actividad no seleccionada"}</h2>
          <button className="btn btn-light"><FontAwesomeIcon icon="fas fa-cog" /> Modificar</button>
        </header>
        {currentEditor}
      </section>
      <div className={(show)?"stea-black-window":""} onClick={()=>{setShow(false)}}></div>
    </div>
    <EditorModal addEditor={addEditor}/>
    </>
  );
}
