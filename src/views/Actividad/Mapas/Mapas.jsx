import MapaDiv from "./MapaDiv/Mapa";
import MapaReg from "./MapaReg/Mapa";
import MapaCul from "./MapaCul/Mapa";
import { useEffect, useState } from "react";


const jsonMoc={ID:1,jsonActividad:[
{IDMapa:1,IDPregunta:1,Cuerpo:"Estado de la republica donde se tiene más turismo",Resp:"ROO",Tiempo:10},
{IDMapa:2,IDPregunta:2,Cuerpo:"Estado de la republica donde vivimos",Resp:"MEX",Tiempo:15},
{IDMapa:3,IDPregunta:3,Cuerpo:"Estado de la republica más grande",Resp:"CHH",Tiempo:20}]}
var iteradorMapa=0;
export default function Mapas(){
    const [actividad,setActividad]=useState (jsonMoc);
    const [mapa,setMapa]=useState ();
    const [nextPregunta,setNextPregunta]=useState (false);
    
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
        if(jsonMoc.jsonActividad.length>iteradorMapa){
            const pregunta=jsonMoc.jsonActividad[iteradorMapa++]
            switch (pregunta.IDMapa){
                case 1:
                    setMapa(<MapaDiv nextPregunta={setNextPregunta}/>)
                break;
                case 2:
                    setMapa(<MapaReg nextPregunta={setNextPregunta}/>)
                break;
                case 3:
                    setMapa(<MapaCul nextPregunta={setNextPregunta}/>)
                break;
                default:
                    setMapa(<h2>ERROR</h2>)
                break;
            }
        }else{
            //Finalizar Mapas
        }
               
    }

    return <>
    {mapa}
    </>
}