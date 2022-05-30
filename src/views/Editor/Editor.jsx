import {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import RespCoinEditor from './RespCoinEditor/RespCoinEditor'
import MapaEditor from "./MapaEditor/MapaEditor";
import OrdEditor from "./OrdenEditor/OrdEditor";
import AXIOS from "../../services/http-axios"

import './Editor.css'
import {useParams} from "react-router-dom";

export default function Editor(props) {

  const cookie = new Cookies();
  const params = useParams();
  const [activityData, setActivityData] = useState(null);
  const [currentEditor, setCurrentEditor] = useState([]);


  useEffect(()=> { 
    
    const credentials = {
      userId: cookie.get('userId'),
      UUID: cookie.get('UUID'),
      activityId: params.activityId,
    };


    AXIOS.get('/activity/activityedit', {params: credentials})
    .then((res)=> {
      console.log("EDITOR>> ", res.data.message, res.data);
      const activityp = res.data.activityData;
      activityp.actividad = JSON.parse(activityp.actividad);
      setActivityData(activityp);
    }).catch((err)=> {
      if(err) throw err;

    });
    
  }, []);


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
      <button onClick={()=>setCurrentEditor(null)}>nullo</button>
      </section>
      <section id="stea-editor-called">
      {currentEditor}
      </section>
    </article>
  );
}
