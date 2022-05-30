import {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import RespCoinEditor from './RespCoinEditor/RespCoinEditor'
import MapaEditor from "./MapaEditor/MapaEditor";
import OrdEditor from "./OrdenEditor/OrdEditor";
import AXIOS from "../../services/http-axios"

import './Editor.css'
import {useParams} from "react-router-dom";
import Mapas from "../Activity/Mapas/Mapas";

let activitiesData = []
export default function Editor(props) {

  const cookie = new Cookies();
  const params = useParams();
  const [activityData, setActivityData] = useState([]);
  const [generalData, setGeneralData] = useState(null);
  const [currentEditor, setCurrentEditor] = useState(null);

  const activityType = [
    <small>Mapas Interactivos</small>,
    <small>Ordenamiento Gerarquico</small>,
    <small>Respuestas Coincidentes</small>
  ];


  useEffect(()=> { 
    activitiesData = [];
    const credentials = {
      userId: cookie.get('userId'),
      UUID: cookie.get('UUID'),
      activityId: params.activityId,
    };


    AXIOS.get('/activity/activityedit', {params: credentials})
      .then((res)=> {
        console.log("EDITOR>> ", res.data.message, res.data);
        const activityp = res.data.activityData;
        if(activityp !== null) {
          activityp.actividad = JSON.parse(activityp.actividad);
          setEditor(activityp.actividad[0]);
        }
        activitiesData = activityp.actividad;
        setGeneralData(activityp);
        setActivityData(activityp.actividad);
      }).catch((err)=> {
        if(err) throw err;

      });

  }, []);

  
  function setEditor(activity) {
    const editorType = activity.type;
    switch (editorType) {
      case 1:
        setCurrentEditor(<MapaEditor activitiesData={activitiesData} actividad={activity}/>);
        break;
      case 2:
        setCurrentEditor(<OrdEditor activitiesData={activitiesData} actividad={activity}/>);
        break;
      case 3:
        setCurrentEditor(<RespCoinEditor activitiesData={activitiesData} actividad={activity}/>);
        break;
      default:
      setCurrentEditor(<h1>NO HAY NINGUN EDITOR SELECCIONADO</h1>);
      break;  
    }
  }

  function addActivityData(data) {
    setActivityData([...activityData, data]);
  };


  return (
    <article id="stea-editor-container">
      <section id="stea-editor-sidebar">
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
          {activityData.map((v, idx)=> <li key={v} idx={idx}>
            <div>
              <h3>{v.name}</h3>
              {activityType[v.type-1]}
            </div>
          </li>)}
        </ul>
        <button onClick={()=>{setCurrentEditor(null); console.log(activitiesData);}}>nullo</button>
      </section>
      <section id="stea-editor-called">
        {currentEditor}
      </section>
    </article>
  );
}
