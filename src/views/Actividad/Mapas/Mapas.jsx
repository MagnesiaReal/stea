import MapaDiv from "./MapaDiv/Mapa";
import MapaReg from "./MapaReg/Mapa";
import MapaCul from "./MapaCul/Mapa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Mapas.css"; 
import { useEffect, useState } from "react";


const jsonMoc={ID:1,jsonActividad:[
{IDMapa:1,IDPregunta:1,Cuerpo:"Estado de la republica donde se tiene más turismo",Resp:"ROO",Tiempo:5},
{IDMapa:1,IDPregunta:2,Cuerpo:"Estado de la republica donde vivimos",Resp:"MEX",Tiempo:5},
{IDMapa:1,IDPregunta:3,Cuerpo:"Estado de la republica más grande",Resp:"CHH",Tiempo:5}]}
var iteradorMapa=0;

export default function Mapas(props){
    const actividad=props.activity;
    const [mapa,setMapa]=useState ();
    const [nextPregunta,setNextPregunta]=useState (false);
    const [preguntaActual,setPreguntaActual]=useState(0);
    const carga=<>
    <div className="stea-rotar">
        <FontAwesomeIcon icon="fas fa-spinner" />
    </div>    
    </>;

    useEffect(()=>{
        iteradorMapa=0;
        onNextPregunta();
    },[])
    useEffect(function(){
        if(nextPregunta){
            onNextPregunta();
            setNextPregunta(false);
        }
    },[nextPregunta])

    const onNextPregunta=(e)=>{
        
        if(actividad.length>iteradorMapa){
            const pregunta=actividad[iteradorMapa++]
            switch (pregunta.IDMapa){
                case 1:
                    setMapa(<MapaDiv nextPregunta={setNextPregunta} pregunta={pregunta} lista={props.listaRespuestas}/>)
                    
                break;
                case 2:
                    setMapa(<MapaReg nextPregunta={setNextPregunta} pregunta={pregunta} lista={props.listaRespuestas}  />)

                break;
                case 3:
                    setMapa(<MapaCul nextPregunta={setNextPregunta} pregunta={pregunta} lista={props.listaRespuestas}  />)
                break;
                default:
                    setMapa(carga)
                break;
            }
        }else{
            props.nextActividad(true)
        }
               
    }
    if(nextPregunta){
        return <>
        {carga}
        </>
    }else{
        return <>
        {mapa}
        </>
    }
}