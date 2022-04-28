import { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pregunta from './Pregunta/Pregunta';

import AXIOS from '../../../services/http-axios';

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
  <option value="TAB">TabascO</option>
  <option value="TAM">Tamaulipas</option>
  <option value="TLA">Tlaxcala</option>
  <option value="VER">Veracruz</option>
  <option value="YUC">Yucatán</option>
  <option value="ZAC">Zacatecas</option>
</>;
  
  const [tipoMapa,setTipoMapa]=useState ("estados");
  const [pregunta,setPregunta]=useState ();
  const [respuesta,setRespuesta]=useState ();
  const [opciones,setOpciones]=useState (estaditos);
  const [preguntas, setPreguntas]=useState([]);
  

  const onGuardarPreguntas = (e) => {
    e.preventDefault();
    const preg={
      ID:i,
      Cuerpo:"nothing",
      Resp: "algo",
      Tiempo: "00:00"
    }
  }

  const onNuevaPregunta = (e) =>{
    e.preventDefault();
    setPreguntas([...preguntas,i++]);
    console.log(preguntas);
  }

  const onTipoMapa=function (e){
    e.preventDefault();
    setTipoMapa(e.target.value);
    if(e.target.value==="estados"){
      setOpciones(estaditos)
    }else if (e.target.value==="regiones"){
      setOpciones(<>
        <option value="MES">Mesoamérica</option>
        <option value="ARI">Aridoamérica</option>
        <option value="OAS">Oasisamérica</option>
      </>)
    }else if (e.target.value==="culturas"){
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
      <form className=''>
        <section className="form-group row">
          <label htmlFor="tipoMapa" className='col-sm-12 col-lg-4 col-form-label col-form-label-sm'>Selecciona el tipo de mapa a elegir:</label>
          <div className='col-sm-12 col-lg-8'>
            <select name="tipoMapa" id="tipoMapa" className="form-control form-control-sm" onChange={onTipoMapa} value={tipoMapa}>
              <option selected value="estados">Mapa de la republica mexicana con división sin nombres</option>
              <option value="regiones">Mapa de las regiones del México prehispanico</option>
              <option value="culturas">Mapa de las culturas del México prehispanico</option>
            </select>
          </div>
          
        </section>

        {preguntas.map((value, index) =>
          <Pregunta opciones={opciones} />
         )
        }
       
      </form>
      <div className='col-sm-4 col-lg-2'>
        <button type="submit" class="btn btn-primary stea-mapaEditor-add my-1" onClick={onNuevaPregunta}><FontAwesomeIcon icon="fa-solid fa-plus" /></button>
      </div>
    </div>
  );
}

