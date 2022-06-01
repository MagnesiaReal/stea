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
        if(activityData.actividad !== null) {
          activityData.actividad = JSON.parse(activityData.actividad);
          setEditor(activityData.actividad[0]);
          setGeneralData(activityData.actividad[0]);
          setActivities(activityData.actividad);
        } else {
          setEditor(0);
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
      id: activities.length,
      type: values.type,
      name: values.title
    }

    if(values.type == 3) build.questions = [];
    else build.preguntas = [];
    
    activities.push(build);
    console.log(activities);
    setEditor(activities[build.id]);
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
        console.log('');
      })
  }

  return (<>
    <div id="stea-editor-container">
      <section id="stea-editor-sidebar" className={(show)?"show":""}>
        <button className="btn btn-success" data-toggle="modal" data-target="#stea-add-editor-modal">Agregar actividad</button>
        <ul>
          <li>
            <FontAwesomeIcon icon="fa-solid fa-plus"/>
            Mapas Interactivos
          </li>
          <li>
            <FontAwesomeIcon icon="fa-solid fa-plus"/>
            Ordenamiento Gerarquico
          </li>
          <li>
            <FontAwesomeIcon icon="fa-solid fa-plus"/>
            Respuestas Coincidentes
          </li>
        </ul>
        <ul>
          {activities.map((v, idx)=> <li key={v} idx={idx}>
            <div onClick={()=>selectEditor(idx)}>
              <h3>{v.name}</h3>
              {activityType[v.type-1]}
            </div>
          </li>)}
        </ul>
        <button onClick={saveActivity} className="btn btn-light">SAVE DATAAAA</button>
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
