import {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import RespCoinEditor from './RespCoinEditor/RespCoinEditor'
import MapaEditor from "./MapaEditor/MapaEditor";
import OrdEditor from "./OrdenEditor/OrdEditor";
import AXIOS from "../../services/http-axios"

import './Editor.css'

export default function Editor(props) {
  const cookies = new Cookies();
  const [allActivity, setAllActivity] = useState([]);
  const [currentEditor, setCurrentEditor] = useState([]);


  useEffect(()=> {    
    //AXIOS.get('/activity/activityresolve')
    //.then((res)=> {
      
    //}).catch((err)=> {

    //});
    setCurrentEditor(<MapaEditor setData={setActivityData} id={1} type={1}/>);
  }, []);


  function setActivityData(data) {
    setAllActivity([...allActivity, data]);
    console.log(data)
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
