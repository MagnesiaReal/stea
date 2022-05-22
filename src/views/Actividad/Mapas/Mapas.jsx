import MapaDiv from "./Mapas/MapaDiv/Mapa";
import MapaReg from "./Mapas/MapaReg/Mapa";
import MapaCul from "./Mapas/MapaCul/Mapa";

const jsonMoc={ID:1,jsonActividad:[
{IDMapa:1,IDPregunta:1,Cuerpo:"Estado de la republica donde se tiene más turismo",Resp:"ROO",Tiempo:10},
{IDMapa:1,IDPregunta:2,Cuerpo:"Estado de la republica donde vivimos",Resp:"MEX",Tiempo:15},
{IDMapa:1,IDPregunta:3,Cuerpo:"Estado de la republica más grande",Resp:"CHH",Tiempo:20}]}

export default function Mapas(){
    const [actividad,setActividad]=useState (jsonMoc);
    const [mapa,setMapa]=useState ( );
    while (actividad.jsonActividad.length){
        if(actividad.jsonActividad.IDMapa===1){
            MapaDiv
        }else if (actividad.jsonActividad.IDMapa===2){
            MapaReg
        }else if (actividad.jsonActividad.IDMapa===3){
            MapaCul
        }
    }

    return <>
    jsonMoc.activities.Map
    </>
}