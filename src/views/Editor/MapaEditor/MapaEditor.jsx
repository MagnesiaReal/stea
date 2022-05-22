import { Component, createRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pregunta from './Pregunta/Pregunta';

import AXIOS from '../../../services/http-axios';
import { useRef } from 'react';


var i=0;
var listaPreguntasMapa=[];
export default function MapaEditor (props) {
  const estaditos=<>
  <option value="---">Selecciona tu respuesta</option>
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
  const [tipoMapa,setTipoMapa]=useState ("1");
  const [opciones,setOpciones]=useState (estaditos);
  const [preguntas, setPreguntas]=useState([]);
  
  const onGuardarHijo = (data) =>{
    data.IDMapa=refPregunta.current.value
    listaPreguntasMapa.push(data);
  }

  const onBorrarHijo = (idx) =>{
    console.log(preguntas)
    setPreguntas(preguntas.filter((value,index)=>index!==idx))
    listaPreguntasMapa.splice(idx,1);
    var id=0
    listaPreguntasMapa.forEach(element => {
      element.IDPregunta=id++
    });
    console.log(preguntas)
  }

  const onNuevaPregunta = (e) =>{
    e.preventDefault();
    setPreguntas([...preguntas,i++]);
    console.log(listaPreguntasMapa)
  }

  const onTipoMapa=function (e){
    e.preventDefault();
    setTipoMapa(e.target.value);
    if(e.target.value==="1"){
      setOpciones(estaditos)
    }else if (e.target.value==="2"){
      setOpciones(<>
      <option value="---">Selecciona tu respuesta</option>
        <option value="MES">Mesoamérica</option>
        <option value="ARI">Aridoamérica</option>
        <option value="OAS">Oasisamérica</option>
      </>)
    }else if (e.target.value==="3"){
      setOpciones(<>
      <option value="---">Selecciona tu respuesta</option>
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
              <option id="0" defaultValue={"1"} value="1">Mapa de la republica mexicana con división sin nombres</option>
              <option id="1" value="2">Mapa de las regiones del México prehispanico</option>
              <option id="2" value="3">Mapa de las culturas del México prehispanico</option>
            </select>
          </div>
          
        </section>
      </form>

        {preguntas.map((value, index) =>{
          return <Pregunta IDMapa={tipoMapa} opciones={opciones} key={value} data-key={index} onBorrarme={onBorrarHijo} onGuardarme={onGuardarHijo} lista={listaPreguntasMapa} />
        }
        )
        }
       
      
      <div className='col-sm-4 col-lg-2'>
        <button type="submit" className="btn btn-primary stea-mapaEditor-add my-1" onClick={onNuevaPregunta}><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
      </div>
    </div>
  );
}

