import { Component, createRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pregunta from './Pregunta/Pregunta';

import AXIOS from '../../../services/http-axios';
import { useRef } from 'react';


var i=0;
export default function MapaEditor (props) {
  const estaditos=<>
  <option value="AGU">Aguascalientes</option>
  <option value="BCN">Baja California</option>
  <option value="BCS">Baja California Sur</option>
  <option value="CAM">Campeche</option>
  <option value="CHP">Chiapas</option>
  <option value="CHH">Chihuahua</option>
  <option value="CMX">Ciudad de México</option>
  <option value="COA">Coahuila</option>
  <option value="COL">Colima</option>
  <option value="DUR">Durango</option>
  <option value="GUA">Guanajuato</option>
  <option value="GRO">Guerrero</option>
  <option value="HID">Hidalgo</option>
  <option value="JAL">Jalisco</option>
  <option value="MEX">México</option>
  <option value="MIC">Michoacán</option>
  <option value="MOR">Morelos</option>
  <option value="NAY">Nayarit</option>
  <option value="NLE">Nuevo León</option>
  <option value="OAX">Oaxaca</option>
  <option value="PUE">Puebla</option>
  <option value="QUE">Querétaro</option>
  <option value="ROO">Quintana Roo</option>
  <option value="SLP">San Luis Potosí</option>
  <option value="SIN">Sinaloa</option>
  <option value="SON">Sonora</option>
  <option value="TAB">Tabasco</option>
  <option value="TAM">Tamaulipas</option>
  <option value="TLA">Tlaxcala</option>
  <option value="VER">Veracruz</option>
  <option value="YUC">Yucatán</option>
  <option value="ZAC">Zacatecas</option>
</>;
  
  const refPregunta=createRef();
  const [tipoMapa,setTipoMapa]=useState ("estados");
  const [pregunta,setPregunta]=useState ();
  const [respuesta,setRespuesta]=useState ();
  const [opciones,setOpciones]=useState (estaditos);
  const [preguntas, setPreguntas]=useState([]);
  const jsonPreguntas={}
  var listaPreguntas=[]

  const onGuardarPreguntas = (e) => {
    e.preventDefault();
    const preg={
      IDMapa:e.target.value,
      IDPregunta:i,
      Cuerpo:"nothing",
      Resp: "algo",
      Tiempo: "00:00"
    }
  }
  const onGuardarHijo = (data) =>{
    data.IDMapa=refPregunta.current.value
    listaPreguntas.push(data);
  }
  const onBorrarHijo = (idx) =>{
    setPreguntas(preguntas.filter((value,index)=>index!==idx))
  }
  const onNuevaPregunta = (e) =>{
    e.preventDefault();
    setPreguntas([...preguntas,i++]);
    
  }

  const onTipoMapa=function (e){
    e.preventDefault();
    setTipoMapa(e.target.value);
    if(e.target.value==="1"){
      setOpciones(estaditos)
    }else if (e.target.value==="2"){
      setOpciones(<>
        <option value="MES">Mesoamérica</option>
        <option value="ARI">Aridoamérica</option>
        <option value="OAS">Oasisamérica</option>
      </>)
    }else if (e.target.value==="3"){
      setOpciones(<>
        <option value="MAY">Mayas</option>
        <option value="OLM">Olmecas</option>
        <option value="TOT">Totonacas</option>
        <option value="HUA">Huastecos</option>
        <option value="ZAP">Zapotecos</option>
        <option value="MIX">Mixtecos</option>
        <option value="TAR">Tarascos</option>
        <option value="TOL">Toltecas</option>
        <option value="MEX">Mexicas</option>
        <option value="TEO">Teotihuacanos</option>
      </>)
    }
  }

  


  return(
    <div className='container'>
      <form className='formulario'>
        <section className="form-group row">
          <label htmlFor="tipoMapa" className='col-sm-12 col-lg-4 col-form-label col-form-label-sm'>Selecciona el tipo de mapa a elegir:</label>
          <div className='col-sm-12 col-lg-8'>
            <select ref={refPregunta} name="tipoMapa" id="tipoMapa" className="form-control form-control-sm" onChange={onTipoMapa} value={tipoMapa}>
              <option id="0" selected value="1">Mapa de la republica mexicana con división sin nombres</option>
              <option id="1" value="2">Mapa de las regiones del México prehispanico</option>
              <option id="2" value="3">Mapa de las culturas del México prehispanico</option>
            </select>
          </div>
          
        </section>
      </form>

        {preguntas.map((value, index) =>{
          return <Pregunta opciones={opciones} key={index} data-key={index} onBorrarme={onBorrarHijo} onGuardarme={onGuardarHijo}/>
        }
        )
        }
       
      
      <div className='col-sm-4 col-lg-2'>
        <button type="submit" class="btn btn-primary stea-mapaEditor-add my-1" onClick={onNuevaPregunta}><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
      </div>
    </div>
  );
}

