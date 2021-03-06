import React, { useState,useEffect } from 'react';
import './MapaReg.css';
import  './components/MapaObjeto'
import MapaObjeto from "./components/MapaObjeto";



function MapaReg(props){
    const [ClassName,setClassName]= useState(); 
    const [tiempo,setTiempo]=useState(props.pregunta.Tiempo)
    const [idProcess,setIdProcess]=useState(0)
    const [desmontar, setDesmontar]=useState(0)
    const [tiempoAsc,setTiempoAsc]=useState(0)
    

    useEffect(()=>{
    
        if(desmontar===1){
        //    console.log("Se respondio")
            clearInterval(idProcess);
            props.nextPregunta(true)
            
        }else if(desmontar===2) {
        //  console.log("No se respondio")    
            clearInterval(idProcess);
            props.nextPregunta(true)
            
        }
    },[desmontar]);

    useEffect(()=>{
        if(tiempo<=0 && props.pregunta.Tiempo!==0) {
            props.lista.push({IDPreg:props.pregunta.IDPregunta,Respuesta:props.pregunta.Resp,Tiempo:props.pregunta.Tiempo,respuestaRes:"N/A",tiempoRes:0, Cuerpo:props.pregunta.Cuerpo, TiempoAsc:tiempoAsc})
            console.log(props.lista)
            setDesmontar(2)
            
        }
    },[tiempo]);

    useEffect(()=>{
        const idProceso=setInterval(function(){
            if(tiempo<=0) {
                clearInterval(idProceso);   
            }
            else
            setTiempo((tiempo)=>{const current = (tiempo-0.1).toFixed(2); return current; })
            
        },100);
        setIdProcess(idProceso)
        return ()=>clearInterval(idProceso);     
    },[]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTiempoAsc((tiempoAsc)=>{const current = tiempoAsc+0.1; return current; })
        }, 100);
        return () => clearInterval(interval);
      }, []);
    

    const getClassName = (event) => {
         
        switch (event.target.id) {
            case 'MES': 
                setClassName('MES');
            break;
            case 'ARI': 
                setClassName('ARI');
            break;
            case 'OAS': 
                setClassName('OAS');
            break;
            default: 
            return 'NA';
        }
        props.lista.push({IDPreg:props.pregunta.IDPregunta,Respuesta:props.pregunta.Resp,Tiempo:props.pregunta.Tiempo,respuestaRes:event.target.id,tiempoRes:tiempo, Cuerpo:props.pregunta.Cuerpo, TiempoAsc:tiempoAsc})
        console.log(props.lista)
        setDesmontar(1) 
        
    };

    var Regiones =
    <svg version="1.1" viewBox="0 0 1366 768" xmlns="http://www.w3.org/2000/svg" >
            
            <a xlinkTitle="1" onClick={getClassName}>
                <path id="MES" name="1" className="st1" d="M942,767v-22.09v-9.49L887,693l3-8l-1-4h-10.71l-0.29,8h-29l-5-6l-22-4l-16-7h-31.1L691,609l-25-6l-8,8l-5,4
                    l-6,2l-5,2l-4,2l-5,3l-5,1h-5l-11-1l-5-2l-4-3h-4h-6h-7l-5-1l-5-6l-5-3h-5l-6-2l-5.19-4l-3.81-3h-5.68l-6.32-4h-6.34h-5.54l-5.12-2
                    l-7-5l-6-3c0,0-7.56,1-8.78,0s-5.22-3-5.22-3l-5-3l-10-6l-4-3l-5-4l-4-3l-4-3l-4-3h-3.88h-7.52h-5.14l-7.46-4l-4-2l-7-2l-5-2l-5-5
                    l-3-5l-3-4l-4-5l-5-3l-6-2h-4.34l-3.66-3l-6-4l-5-4l-2-3l-6-7l-3-5l-2-6l-6-9v-5.25v-4.35l4-3.4l3-3l2-4c0,0,0-4,1-5s2-5,2-5
                    s3,1,0-3s-3-4-3-4l-3-2l-4-5v-5v-3v-3v-3l-2-6.2c0,0-1-4.8-4-5.8s-6-4-6-4l-3-4l-4-4l-3-5l-4-6l-2-3l-2-5h-1.64l-2.36-5l-3-3l-5-3
                    l-3-3l-3-3h-1.84l-3.16-5c0,0-3-3-4-3s-5-5-5-5l-2-4l-2-5l-2-6l-6-6l-2-2v-2.37v-4.35l4-6.27l2-4l5-3l4-2h3.65l0.35-3h1.63l2.37-5
                    h7.12l5.88,5l1,2l3,4l5,2h5h2l2,6v5l3,5h5l1,4l4,6l2,5l3,7l3,8l3,8l2,8l1.95,10l4.05,6l1,7c0,0,2,8,2,9s0,5,0,5l4,11l3,9
                    c0,0,0,5,0,6s4,7,4,7v4l1,5l3,3l4,4l5,1l7,4l3,2c0,0,7,2,8,3s11,2,11,2v5v6l7,3l6,2h5c0,0,5,1,6,1s10-1,10-1l4-1l5-3c0,0,11,0,12-1
                    s5-5,5-5l5-4l5-5l2-7l8-2c0,0,6,0,8,1s7,4,9,4s7,0,7,0l6-3l8-3c0,0,2-2,4-3s5-6,5-6l4-5l4-6l7-2l8-5l7-1c0,0,4,10,5,12s1,12,1,12
                    s9,7,9,9s0,8,0,8l3,6l9,6c0,0,2,7.77,4.5,8.38S622,503,622,504s2,6,5,9s5,7,5,9s10,6,10,6h6l12.04,5l7.96,4c0,0,0,6,2,6s3,2,5,2
                    s8,0,8,0s8-4,9-4s10-2,10-2s10-1,11-1s9-2,9-2l6.88-3l3.12-7l4-1l5,1l2,5l4.08,2h7.52l5.41-2l4-2c0,0,5,0,4-1s-2-6-2-6l-5-7l5-3
                    l6-2l8-9l-1-5l-1-8l5-1l1-8l-1-3v-6l-1-6l1-4l5-7c0,0,1-4,4-4s13-4,13-4l8-3c0,0,9-3,10-3s8-2,8-2s7-3,8-3s7-1,10-1s10,0,12,0
                    s9,0,11,0s10,0,10,0s5,3,5,6s-3,10-3,12s0,2-1,5s-7,7-8,8s-4,5-4,5s-2,4-2,5s1,6,1,6l-1,2l-4,2l-4,3l2,3l6,1v3h-2h-2l-1,4l1,2l3,1
                    l1,7l-1,5l-1,7l-3,4h-2l-3-2l1-10h-5l-5,6v4l-2,3l-1,4l6-1l4,1c0,0-3,7-3,8s1,6,1,6v4l1,9l-2,4v7l-2,10l1,5v6c0,0-3,2-4,4s-3,4-5,6
                    s-4,4-4,4l-2,4l-1,4l-2,2l-4,2c0,0-3,0-3,1s-1,6-1,6h5l6-2l4-4l1-4l3-2l5-4c0,0,0-2,3-1s8,1,9,1s4-1,4-1s2-4,4-4s7-1,7-1l4,1h7h2
                    l10,2h5l7-2l5-2l5-3l6-2l13-1.32l5-0.68l7-1l7-1h6c0,0,5,0,6,0s7,0,7,0v2.68v3.56v2.37v3.16v2.37l2,0.85c0,0,3,0,4,1s3,1,3,1h3h2
                    v-2.85v-2.77l5-0.38l5,1l3,1l2,1c0,0-2,0.05,0,2.53s0,5.54,0,5.54l0.89,6.33v6.33L1013,625v7.43l-2,8.57l-2,2c0,0,0,6,0,7s-1,7-1,7
                    v12v9l-1,7l3,7c0,0,0,2,0,3s-2,3-2,3l-4,2l4,7l5,4.15v4.35c0,0-2,0.49-3,0.49s-4,1-4,1s-2-1-2,2s0,7,0,7l7,6l6,3c0,0-1,5.23,0,6.62
                    c1,1.38,4,8.38,4,8.38l5,4l5,5l8,4l7.95,4H942z"/>
            </a>
            <a xlinkTitle="2" onClick={getClassName}>
                <path id="ARI" name="2" className="st2" d="M234,400l3,3h4.63l9.49-3l4.88-6v-5.66l-3.3-4.34l-1.7-3l-6-3.21l2-3.79l-2-4.12l-3-1.88l-5-7h-6.98h-3.69
                    h-3.69l-3.64-5v-4.05v-5.8h2.58L223,344c0,0-1-3-1-5s0-6,0-6h-3l-3-3v-6.01l-5-5.99c-3-4-5-7-5-7v-6v-3.16v-5.8l-3-5.03v-3.93
                    l-4-3.07l-4-3h-2.43l-2.57-8l-3-5l-2-3c0,0,4-1.56,0-3.78s-6-5.22-7-6.22s-3-4-3-4l-4-5v-7.99v-7.38l-5-1.63l-4-10v-2.62l-6-3.38
                    l-3-3v-6.8l-5-3.2v-4.19l-6-3.81l-2-5l-4-3l-6-3l-2-6v-4.51v-6.86v-4.75v-5.27v-3.16l-2-2.45v-5.46v-9.49v-4.75v-9.49l7,6.2l4,5
                    l7,4h2l2-1h5l4,3c0,3,6,5,6,5l7,3v7l-1,8l2,4c0,0,1,0,2,3s4,10,4,10l2,11l6,9l3,10l3,8.8l6,6.2l2,5l3,7l4,1c0,0,2,3,4,5s2,2,2,2
                    l4,4l2,3l9,1v6l2,4l4,8v4l7,5l6-2c3,6,2,11,2,11l5,2h6l2,6v10.42l-5,7.58v2l2,4l3,2.24l7,2.76l3,2l5,2l5,3v-6.73v-3.03l4-3.24l2-4
                    l5-3l4-2l4-3l2.69-2.25L304,299h4.62h2.51l5.88,5l4,6l5,2h5l4,6v5l3,5h2.79l3.21,4l4,6l2,5l3,7l3,8l1.71,4.55l2.5,8.28l1.44,6.48
                    l3.41,6.69l2.95,13l0.81,3.32L370,406l0.92,7.53l2.4,6.61L378,427l-1,4v6l4,7v4l3,4l1,4l4,4l5,1l4.64,2.65L401,465l3,2l2.38,0.72
                    l3.19,1.09L412,470l3.25,0.95l2.69,0.43L423,472v5v3.12V483l4.94,2.12h6.61L441,488l6,1l5.75-0.54L457,488l4-1l5-3l4.56-0.08
                    l3.16-0.16L478,483v-1.69l2.26-0.57v-2.59l4.68-1.69L488,474l3.25-3.25L493,469l2-7l8-2l5.47,0.36L511,461l4.67,2.46L520,465h7
                    l3.54-1.77l4.31-1.92L541,459l4-3l4.04-4.51L554,445l4-6l3.8-1.09L565,437l4.55-2.84L573,432l7-1l-5-12l-4-4l2-4l2-1l2-6v-6l-2-3
                    v-7c0,0,1.98-3-0.01-4s-1.99-1-1.99-1s-2-3-2-5s2-7,2-7l-1-2l4-2v-2l-2-2l-3-4v-3l4-1v-5c0,0,0-2-1-2s-2-2-2-2l-2-2l1-2l3-4v-3l1-3
                    l2-1l3-0.02l2-0.98l5-1c0,0,3-2,3-3s2-5,2-5v-6.64l-4-4.36l-3-3l-2.49-3.1c0,0-1.51-4.9-1.51-6.9s0-5,0-7s-1-6-1-6l1-5c0,0,2-3,0-3
                    s-4,0-4,0l-3-3c0,0-1-3,1-3s6-2,6-2l3,1l2-6l-2-3l-3-5l7-2l2-5l2-1.29l4-0.71l4-5l4-1v-3.18v-2.77l-2-2.05l2-1.51l10-0.49h5l5-1
                    c0,0,6-2,7-3s3-2,3-2s4-4,5-4s4-4,4-4l3-5c0,0,0-2.11,0-3.05s-2-5.95-2-5.95l2-2.36l5-1.64c0,0,2,3,3,4s4,2,4,2l4-1l6-2l7-3
                    c0,0,1-1,4-2s4-1.11,4-1.11l9-0.89l6,1l7,3l6,3h6l3-5v-2.82l8-1.18c0,0,3-2,4,0s8,8,8,8l3,1c0,0,2,3,3,4s6,7,6,7l7-1v-3.05l5-3.95
                    c0,0,6-1,6,1s0,6.64,0,6.64l5-5.64v-2.8v-4.22l-3-3.98l8,5l7,2l9,3c0,0-7-8-9-8s-2-2-2-2l-2-2l6-5l2-4l-3-1h-6l-4,1l2-6l2-5l2-3
                    l3-2l1-3l3-2l2-5l3-2l3-3v-4.66v-6.33v-2.64v-3.16l-2-3.21l-4-6c0,0,2-2-3-5s-7.19-3.2-7.19-3.2L779,109l-1-10l4-4v-8l5-3l1-7l-2-5
                    l-4-3l-6-5l-4-2h-8.7h-7.91h-8.44h-4.22L726,57h-2.26L718,53l-3-2l-4-5c0,0-4-6-6-7s-6-8-6-8l-3-2l-7-5l-10-4l-6-2l-9.03-4.16
                    c0,0-0.97-2.84-6.97-2.84s-11.33,0-11.33,0L637,9h-7.68h-5.8L620,6l-1.76-6L0,0v5.4L2,11l4,4l4,7l2,4l2,4l4,3l3,1l8,7l2,2l6,2l6,1
                    l1,4l2,5l6,2l7,10l3,3c0,0,1,4,3,6s3,14,3,14l2,6c0,0,2,4,2,6s2,6,2,6l2,3c0,0,3,2,3,4s0,6,0,6l1,5l4,7l5,8l1,6l3,9l3,10l2,6l2,9
                    l2,6l7,6c0,0,3,2,5,3s8,7,8,7s8,4,8,6s8,11,8,11l1,4l-5,13v5l6,7l-4,3l-5-2l-2.25-5.5h-8.44c0,0-2.13,1.5-4.22,0S114,243,114,243
                    l-3,5l5,4l6,7l7,6c0,0,1,0,4,2s8,7,8,7l6,2l8,1h3l8,12c0,0,3,4,5,4s6,4,6,4l6,9c0,0,1,10,1,12s-3,11-3,11l-3,8l3,5c0,0,16,17,18,17
                    s9,2,9,2l5,3l4,3l8,11l7,13L234,400z"/>
            </a>
            <a xlinkTitle="3" onClick={getClassName}>
                <path id="OAS" name="3" className="st3" d="M243,229h8.12l6.88-3h3.67l4.33-8v-8.47v-4.75v-5.8l3-5.98c0,0,3-2,5-3s7-6.32,7-6.32l6-1.68h5.79l3.21-7
                    v-2.92v-6.33v-7.91L292,147c0,0-1-1,0-5s1-4,1-4l1-11l8-5l3-2l6-3l6-2l5-4l9-4l6-4l2-5l5-4l-5-6l-3-2l-1-5l-4-9v-3c0,0,1-1-1-3
                    s-2-2-2-2l-6-4l-6-3l-5-5l-4-7l-2-7l1-6l2-3l1-4v-5l-6-4l-7-3h-5.85c0,0-3.15-3-5.15-3s-4,0-4,0V4.87l-6.14-4.75h-5.8H134.02v4.22
                    v5.27v4.22L138,14l6,3l3,2l1,6c0,0,0,3,0,5s0,5,0,5l-1,5v8l4,7l4,7l3,8c0,0,0,2,2,3s6,8,6,8c1,5,1,15,1,15l-4,8c0,0-3,3-4,5
                    s-3.88,5.56-3.88,5.56L154,124l-1,9l4,3l6,5l7,3l4-1l3,4l6,8l8,8l5,7l7,10c0,0,3,11,4,13s3,10,3,10l2,7l5,9l5,7l2.75,3h5.8h8.46
                    H243z"/>
            </a>
            </svg> 
    
    return(<div className='div-reg'>
    <div className="mapadivReg">    
        <div className='div-pregunta-reg'>
            <h1 id='stea-pregunta-reg'>{props.pregunta.Cuerpo}</h1>
            {props.pregunta.Tiempo===0?null:
            <section className='stea-timer'> 
                <h1>
                    {tiempo}
                </h1>
            </section>}
        </div>
        {Regiones}

        <MapaObjeto keyProp={ClassName}></MapaObjeto>

    </div>
    </div>);
    
}
export default MapaReg;
