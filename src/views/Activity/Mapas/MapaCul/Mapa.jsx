import React, { useState, useEffect } from 'react';
import './MapaCul.css';
import  './components/MapaObjeto'
import MapaObjeto from "./components/MapaObjeto";



function MapaCul(props){
    const [ClassName,setClassName]= useState(); 
    const [tiempo,setTiempo]=useState(props.pregunta.Tiempo)
    const [idProcess,setIdProcess]=useState(0)
    const [desmontar, setDesmontar]=useState(0)
    const [tiempoAsc,setTiempoAsc]=useState(0)

    useEffect(()=>{
    
        if(desmontar===1){
            console.log("Se respondio")
            clearInterval(idProcess);
            props.nextPregunta(true)
            
        }else if(desmontar===2) {
            console.log("No se respondio")    
            clearInterval(idProcess);
            props.nextPregunta(true)
            
        }
    },[desmontar]);

    useEffect(()=>{
        if(tiempo<=0 && props.pregunta.Tiempo!==0) {
            props.lista.push({IDPreg:props.pregunta.IDPregunta,Respuesta:props.pregunta.Resp,Tiempo:props.pregunta.Tiempo,respuestaRes:"N/A",tiempoRes:0, Cuerpo:props.pregunta.Cuerpo, TiempoAsc:tiempoAsc})
            console.log(props.lista)
            setDesmontar(2);
            
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
            case 'MAY': 
                setClassName('MAY');
            break;
            case 'OLM': 
                setClassName('OLM');
            break;
            case 'TOT': 
                setClassName('TOT');
            break;
            case 'HUA': 
                setClassName('HUA');
            break;
            case 'ZAP': 
                setClassName('ZAP');
            break;
            case 'MIX': 
                setClassName('MIX');
            break;
            case 'TAR': 
                setClassName('TAR');
            break;
            case 'TOL': 
                setClassName('TOL');
            break;
            case 'MEX': 
                setClassName('MEX');
            break;
            case 'TEO': 
                setClassName('TEO');
            break;
            
          default: 
            return 'NA';
        }
        props.lista.push({IDPreg:props.pregunta.IDPregunta,Respuesta:props.pregunta.Resp,Tiempo:props.pregunta.Tiempo,respuestaRes:event.target.id,tiempoRes:tiempo,Cuerpo:props.pregunta.Cuerpo,TiempoAsc:tiempoAsc})
        console.log(props.lista)
        setDesmontar(1)  
        
    };

    var MapCul =
    <svg version="1.1" viewBox="0 0 1366 768" xmlns="http://www.w3.org/2000/svg">
    <g id="Contorno" className="Contorno">
        <path  className="st0" d="M0,0h534v5v12c0,0-4,10,0,14s5,14,5,14v13c0,0-5,10-7,15s-2,5-2,5l4,13l5,9c0,0,2,8,0,12s-0.2,5,0.9,10
            s0,22,0,22h6.1v20l14,8l7,8l6,9v7v11l9,7v6l13,7l5,5l11,7l11,13h6l10,14l6,7c0,0-4,12,0,16s5,13,5,13l12,12l8,12l8,8l13,8l23,14
            l20-7l8,7h9l22,7l7,9l12,12h14l28-6c0,0,3-6,9-7s23-6,23-6s7-2,13-2s20-3,20-3s9,1,12,0s2,2,9-3s12-9,12-9l15-10h7h13l11,1h8l-22,5
            l9,3h6h7l10,1c0,0-1-1,7,1s8,2,8,2s2-2,6-3s11-4,11-4l5-3v-9c0,0-1-2-6-3s-5-1-5-1l0,0l-11,8l-6,1h-6l2-5l10-6c7-4,12-7,12-7
            s9,0,10-3s-7,2,1-3s13-7,13-7s2,2,7-4s5-6,5-6l0,0l9-8v-18v-10l6-3c6-6,6-6,6-6s-2-6,0-11s0-14,0-14s0.8-4,0.9-7s-0.1-5,0-10
            s0-23,0-23l0-7v-7l4.1-2l20-8c0,0,12-7,16-7s15,0,15,0s23-12,26-12s19-2,22-2s16-2,16-2l8-7c0,0,0-4,8-7s12-5,16-5s20,4,20,4l29-3
            c0,0,5,0,8,0s5,0,9,0s25-1,25-1l13,3c0,0,5-1,6,3s0,14,0,14s-5.1,6,0.4,7s5.6,1,5.6,1s4,7,0,11s-4,5-10,7s-6,2-6,2s-5,7-8,10
            s1-2-3,3s-2,8-6,11s0-4-4,3s-4,9-6,12s-5,8-5,8c4,6,4-1,4,6s-3,14-3,14l-7,1c0,0-5,2-6,5s1,8,1,8l13,6h7c-10,6-10,6-10,6l-3,6l1,6
            l10,1c0,0-9,9-9,12s-1-3,0,3s-3,13-3,16s0,3,0,3s6,14,3,17s-3,3-3,3s-2,8-2,11s-5,4-5,4l-9-8c0,0-5-2-4-5s2-7,4-10s0-9,0-9
            s-2-18-9-12s-8,14-8,14l-3,6l-8,13l6,2h6l5,2c0,0,1,3,1,7s-3,15-3,15s1,11,1,14s0,13-2,12l7,3.5l-3,20.5v8c0,0-1,9,0,12s3,5,1,9
            s-6,25-6,25s-1,0-6,6s-9,13-12,14s2-6-3,1s-1-1-5,7s-5,14-5,14l8,5l17,6l2-7l-4-7l12,3l7,6l11,5c0,0,8-12,12-12s18-3,18-3s5-4,8-4
            s8,0,8,0l6,5c0,0,10.6,2,11.8,2s1.2,0,1.2,0l10,1h6v196v20l-10-6l-5-2l-4-6l-2-10l10,4l5,5v-13c-3-7-3-7-3-7l-5-8l-10-3h-9l-5-1
            l2,6l1,7c-7,1-7,1-7,1l-6,1c0,0-6,4-9,5s-5,1-8,1s-10-2-10-2c-8,0-18-1-18-1s-3,0-6,0s-8-2-8-2s-6,0-9-1s-3,0-9-2s-7-2-11-3
            s-9-4-9-4c-8-2-13-3-13-3s0-1-6-1s-6,0-6,0l-21-3l-10-10l-12-7c0,0-7,1-12-1s-8-4-11-4s7,3-3,0s-9-3-16-3s-7,0-7,0s-2,5-5,6
            s-8,3-8,3s-4,0-8,0s-7,0-12-1s3,1-5-1s-2-1-8-2s2,1-6-1s-8-2-8-2s-6-3-9-4s-11-4-11-4l-8-5l-5-1l-5-5c0,0-9-11-13-11s-10,0-10,0
            l-8-2l-10-9l-13-10l-6-4c0,0-1-6-4-8s-8-9-12-12s-12-7-15-8s-4-1-8-3s-11-6-11-6s-3-4-7-5s-17-9-17-9s-5-4-9-6s-7-3-10-6s-3-3-3-3
            l-2-5c-3-9-3-9-3-9l0,0l-8,2l-6-1c0,0-2,0-5-1s-3-1-3-1l-12-4l-6-2l-2,8h-13l2-8c-5-3-5-3-5-3l-5,4l-5,3l-4-8l-7-3l-6,6
            c0,0-1,3-4,5s-4,9-4,9s6,1-4,5s-20,7-20,7s-2,2-8,3s-12,1-12,1s-2-1-5,0s-3,1-3,1s-12,6-17,9s-14,7-14,7l-7,1h-8l-7,5l-17-4l-12-5
            l-11-4c-7-3-10-6-13-6s-7-4-13-4s-13-1-16-1s-13,0-13,0l-12-4c0,0-7-5-10-6s7,3-3-1s-11-6-18-8s-7-1-12-3s-8-5-11-5s-8-5-8-5
            s1-5-7-5s-12,0-16,0s-6,0-9-1s-8-3-8-3s-5-1-14-2s-9-1-9-1l-11-4l-11-3l-5-1l-5-3l-24-9l-6-2c0,0-16-6-19-6s-6,0-11-2s-10-3-10-3
            l-17-12c0,0-6-2-12-3s-17-4-17-4l-7-3c0,0,0-3-3-7s-3-4-3-4s-3-4-8-6s-11-5-11-5l-3-5c0,0-5-2-10-4s-8-3-12-3s-5,0-11-1s-13-2-16-3
            s-5-2-10-3s-9-10-16-7.5s-15-1.5-19,0s-7-0.5-14-3.5s-15-10-15-10s-2-3-4-6s-5-8-5-8s1-3-8-8s-9-5-9-5s-7-5-12-7s-8-3-11-6
            s-3-3-8-6s-5-3-10-5s3,3-13-6s-16-9-16-9l-8-6l-5-6L0,0L0,0z"/>
    </g>
    <a xlinkTitle="1" onClick={getClassName}>
        <path id="MAY" name="1" className="st1" d="M867,372l4-12c0,0,1,4,7,3s20-3,20-3h6l15-3l12-9l8.1-5.4L953,338h13l11,1l-14,5l9,3h6h7l10,1l7,1l8,2l6-3
            l11-4v-6l5,3v-9l-6-3l-5-1l-11,8l-6,1h-6l2-5l10-6l12-7l10-3v-8l14-2l12-10l9-8c0,0,0-4,0-7s0-11,0-11v-10l6-3l5.1-11l0.9-6v-14
            c0,0,0.8-17,0.9-17s-0.1-10,0-13s-0.1-10,0-10c0.1,0,0-14,0-14l4.1-2c0,0,5.6-1.4,9.3-3.7c3.7-2.3,4.7-1.3,10.7-4.3s18,0,18,0l13-7
            c0,0,13-7,16-8s10-4,10-4s4,1,9,0s8-2,13-2s8,5,16-2s0,0,8-7s8-7,8-7s1.7-1.8,8.9-3.4c7.1-1.6,7.1-1.6,7.1-1.6l10.8,1.8l9.2,2.2
            l23-4l6,1h8h9c8,0,12-1,15-1s10,0,10,0l13,3c0,0,6-2,6,3s0,14,0,14l0.4,7l5.6,1v11c0,0-4,5-10,7s-6,2-6,2s-5,7-8,10
            s-2.2,1.6-5.6,7.8c-3.4,6.2,0.6,3.2-3.4,6.2s-7.7,10.4-7.7,10.4L1299,215c-1,9,1,20,1,20c-13,6-13,6-13,6l-4,5l5,3l13,6h7
            c0,0-7,0-10,6s-3,6-3,6s-9,5,1,6s10,1,10,1s-0.4-1.8-4.7,5.1c-4.3,6.9-1.3-6.1-4.3,9.9s-6,5-3,16s3,20,3,20s-3.2,1.5-4.1,7.8
            c-0.9,6.2-0.9,6.2-0.9,6.2l-5,4h-8c0,0,3-3-1-8s-4-5-4-5s4-1,4-10s0-9,0-9s5,3,0,0s-10-6-10-6c-7,8-4,2-7,8s-3,6-3,6l-2,15l11,2
            l1,7c0,0,0.6,2.5-0.7,5.3c-1.3,2.7-2.3,3.7-2.3,9.7s-4,14-4,14l3,12c6,10,4,24,4,24l-0.4,14l0.4,6c0,0,3,2,1,9s-4.8,19-4.8,19
            l-1.2,6c0,0,1-4-6,6s-9,13-12,14s-8,8-8,8s-1.7,1.9-3.3,7.9c-1.7,6.1-1.7,6.1-1.7,6.1l8,5l17,6l1,5l1-12l-4-7l12,3l7,6l11,5l12-12
            c0,0-4,1.2,7-0.9c11-2.1,13.8-4.1,13.8-4.1s-2.9-2,5.1-2s2-5,8,0s9.5,5.6,9.5,5.6l9.5,1.4l10,1h6v216l-10-6l-9-8l-2-10l10,4l2-15
            l-6,2l-5-8l-4-5h-9c-2,12-9,13-9,13l-6,1l-9,5l-8,1l-15.9-2.1c0,0,1.9,1.1-12.1-0.9s-14-2-14-2l-9-1l-9-2l-11-3l-22-7l-6-1
            c0,0,7,2-6,0s-21-3-21-3s1,6-5,1s-17-18-17-18l-12-1l-11-4c0,0-8-2.7-13.5-2.8c-5.5-0.2,1.5-0.2-5.5-0.2s-12,6-12,6l-33,1
            c-8-2-14-3-14-3l-17-6l-11-4l-8-5l-10-6l-15-3l-8-8c0,0-7.3-1.3-12.6-6.2c-5.4-4.8-12-9.9-12-9.9L946,594l-4-8l-12-12
            c-8-5-15-8-15-8l-13.6-6l-5.4-3l-7-5c0,0,0.3,1.1-8.4-4c-8.6-5-8.6-5-8.6-5l-9-6l-10-6l-5-8l-3-9l-8,2v-6l-8-1l-6,4l-12-4v-8h6l4-7
            l3-11c7-8,14-12,14-16s0-10,0-10l6-7l3-5l9-11l3-9v-5l4-19v-7c0,0-2-4,1-6.5s6-3.5,6-3.5L867,372z"/>
    </a>
    <a  xlinkTitle="2" onClick={getClassName}>
        <path id="OLM" name="2" className="st2" d="M683,337.7v7.3v5l-5,5v9l2.5,6l2.5,7v7c0,0,7-4,9,3.5s0,12.5,0,12.5l9,8v6c0,0,5,6,8,6s10,0,10,0s3,7,6,8
            s5-3,8,0s3,5,8,6s8-3,14,0s12,0.2,12,0.2l10,1.2h9h16l9-4.4l8-2l7-9l6-8v-6l7-6c0,0,2-2,5-5s4-8.5,4-8.5V380l-6-9l-8,2h-5l-7,1
            c-7,5-11,8.7-11,8.7s-1,0.3-6,1.3s-5,1-5,1l-9-1h-7l-5-12l-7-9c0,0-8-1-9-3s-13-4-13-4s3-7-7-7s-13-5-13-5l-6,1c0,0,2-3-6,0
            s-13,3-13,3l-8-2L683,337.7z"/>
    </a>
    <a  xlinkTitle="3" onClick={getClassName}>
        <path id="TOT" name="3" className="st3" d="M669,326l-4,11.7l-8,4.3h-9h-8l-9-4.3l-7-3.7l-6-8l-5-8v-6h-6l-8-7h-6l-5-6v-5h-9v-7h-8l-9-6h-9c0,0,6-6,0-7
            s-13,0-13,0v-9c0,0-1-4-5-5s-7,0-7,0v-7v-8v-8v-6c0,0,7-6,11-6s9-1,13,0s11-0.4,11-0.4l7,5.4l13-1l7.5-4.4c4.5,2.4,4.5,2.4,4.5,2.4
            l5,5l6,1l5,6l5,3l6,10h6l1,10l9,4l1,5l3,7l0.2,5.3c0,0-3.2-7.3,1.8,5.7s5,13,5,13l7,4l5,8l5,5L669,326z"/>
    </a>
    <a  xlinkTitle="4" onClick={getClassName}>
        <path id="HUA" name="4" className="st4" d="M539,100h-11h-7h-5h-5h-5h-10h-6v5h-17l-6,8l-6,7c0,0-6,2-6,5s0,6,0,6h-9c0,0,3,7,0,10s0,8,0,8l-8,9v9v5
            c0,0,0,2,0,5s0,3,0,3v9h7h5c8,3,8,3,8,3s4-3,8,0s8,4,11,5s-2-2,3,1s8.5,6,8.5,6h6.5l5,5c0,0,3-2,7,0s4,2,4,2s2,4,6,5s9,3,11,4
            s2,1,2,1l9,4h6h7l11-0.4h9V219l10-5l-9-7v-11v-7l-6-9l-7-8l-2-9.5V157l-5-6l-1-5l-5-8l-2-18l-6-8V100z"/>
    </a>
    <a  xlinkTitle="5" onClick={getClassName}>
        <path id="ZAP" name="5" className="st5" d="M805,507l6-6h6l4-7h-8c0,0-8-6-8-7s0-1,0-1h-7l-7-6c-7-2-14-5-14-5h-8h-6h-7h-5h-9h-7h-9h-6v5c0,0-13,1-17,1
            s-9,0-9,0l-5-6l-6-4v-5h-5v-9c0,0,8,1,0-5s-8-6-8-6l-1-6l-7-4.6c0,0-3,1.4-6,0s-3-1.4-3-1.4h-10h-6h-6h-5h-5v9l-7,3v8v8
            c0,0-1,9,0,8.5s4.1,2.5-0.4,5.5s-15.1,6-15.1,6c4.5,6,10.5,14,10.5,14l10,11c0,0,4,6,4,9s3,6,4,10s1,4,1,4l5,11c6,8,6,8,6,8l8,10
            l7-5h8l7-1l9-4.3l5-2.7c0,0,3,3,10-3s4-5,7-6s8-1,8-1l12-1l8-3l5-5c10,0,7-6,10-7s6-6,6-6l7-3c4-5,7-8,7-8l3-3l7,3l3-6.5l6,11.5
            c0,0,2-15,5-4s3,11,3,11l5-1L805,507z"/>
    </a>
    <a  xlinkTitle="6" onClick={getClassName}>
        <path id="MIX" name="6" className="st6" d="M565,535l6-9v-8l5-13l6-8.5l16.5-14.5v-9v-6v-11l7.5-9v-11.6l5-8.4c0,0-10-9-12.5-7s-2.5,2-2.5,2l-8-2.3
            c0,0-2-5.7-6-8.7s0,6-4-3s-6-20.5-6-20.5c-4-4.5-7-3.5-7-3.5l-9-0.1h-9l-19,3.6h-5l-5,11.5c0,0-9,2-8,5s1,3,1,3l-1.1,4l-5.9,1
            c0,0,3,0,0,5s0,17,0,17l6,8c0,0-5,3,0,6s4,11.5,4,11.5c0-0.5,4,6.5,4,6.5s-2,4-2,7s1,8,1,8l-2,9c0,0,3,3-1,6.5s-11.3,7.5-11.3,7.5
            l6.3,12l9,4l9,4l3,1l10,6c0,0,2-2,7,1s9.8,9,9.8,9L565,535z"/>
    </a>
    <a  xlinkTitle="7" onClick={getClassName}>
        <path id="TAR" name="7" className="st7" d="M233,402h13l6-7l5-7.5h5c0,0,2-1.5,5,0s8,0,8,0h6c0,0,5-1.5,8,0s7,0,7,0h11h11h5h6l6-1l9-2.5l7-0.1V378l5-6v-8
            v-10v-5v-11.3V330v-5v-17v-7v-9l-6-8.7V276l-4-5h-7h-8c0,0-4-5-9-6s-16,0-16,0l-5-0.4h-6.5H288h-5h-6c0,0-4-2.4-7,0s-24-1.1-24-1.1
            l-13,3.5c-6,0-15-3.5-15-3.5c-6-1.5-7,3.5-11,0s-6-4.5-11-4.5s-11,3-14,0s-22-9-22-9l-11-6h-6c0,0-6,1-9,0s-4,4-10,0s-11-5-11-5
            s1,4-5,0s-11-7-11-7s-5,1-6,5s5,4,0,10s-8,15-8,15s0,5,0,8s0,13.3,0,13.3s-4,4.7,0,6.7s9,6,9,6s5,1,8,1s3,0,3,0s7,1,10,1s3,0,3,0
            s2,1,7,0s10-3,10-3s2-4,5-4s11,1,11,1v7c0,0,0,18-1,18s-4,5-7,7s2-4-3,2s-7,12.4-9,11.7s-8,4.3-8,4.3s5,6,8,6s4,0,9,0s11,0,11,0
            s0,0,6,0s11-6,11-6h5c0,0,1-4.6,7-4.3s12,0,12,0s4,0.3,6,4.3s4,9,6,12s11,8,12,13s4.6,19.5,4.6,19.5l6.4,7.5L233,402z"/>
    </a>
    <a  xlinkTitle="8" onClick={getClassName}>
        <path id="TOL" name="8" className="st8" d="M438,260h6v-6h-6c-7-5-7-5-7-5h-5c0,0-6,2-6,5.5s1-1.5,0,3.5s4,9,4,9h7.9L438,260z"/>
    </a>
    <a  xlinkTitle="9" onClick={getClassName}>
        <path id="MEX" name="9" className="st9" d="M444,314h8l5-7h8v-6l12-3v-7v-7.7h-8v-8.1V267l-1-9l-10.5,4l-5.5,5c-8-7-14,8.1-14,8.1l-6.1,10.9v5l6.1,8
            L444,314z"/>
    </a>
    <a xlinkTitle="10" onClick={getClassName}>
        <path id="TEO" name="10" className="st10" d="M474.4,279.6h2.6l2.6,1.3l1.3-0.7l1.7-0.7l0.9-1l1.2-0.9l0.9-1.1c0,0,0.4-1,0.4-1.2
            s2.4-1.8,2.4-1.8s1.3-0.5,1.5-0.5c0.2-0.1,0.7-1.3,0.7-1.3s0.9-2.1,1-2.3c0.1-0.2,0.7-2.5,0.7-2.5s0-1.8,0-1.8s0.6-1.2,0-1.5
            c-0.6-0.3-1.3-1.5-1.3-1.5s-0.5-0.4-1.1-0.7c-0.7-0.3-2.2-0.8-2.2-0.8s-2.5-0.6-2.8-0.7c-0.3-0.1-0.9-0.3-1.3-0.3
            c-0.4-0.1-4.7-0.9-4.7-0.9s-0.5,0.5-0.9,0.9c-0.3,0.3-1.6,1.6-1.7,1.9c-0.1,0.3-0.6,1.5-0.6,1.9s0.3,1.4,0.3,1.6
            c0.1,0.2,0.5,1.3,0.5,1.5s-0.1,0.7-0.1,1.1c-0.1,0.3-0.3,0.6-0.3,0.9s-0.3,0.7-0.3,0.9c0,0.2,0.1-0.4-0.3,0.4
            c-0.5,0.8-0.9,1.1-0.9,1.3c0.1,0.2-0.2,0.7-0.3,1c-0.1,0.3-0.5,0.9-0.5,1.3s-0.2,0.9,0,1.1c0.2,0.3,0.7,1,0.7,1s0.4,0.3,0.6,0.4
            c0.2,0.1,0.7,0.9,0.8,1.1c0.1,0.3,0,1.3,0,1.3L474.4,279.6z"/>
    </a>
    </svg>
    
    return(<div className='div-cul'>
    <div className="mapadivCul">    
        <div className='div-pregunta-cul'>
            <h1 id='stea-pregunta-cul'>{props.pregunta.Cuerpo}</h1>
            {props.pregunta.Tiempo===0?null:<section className='stea-timer'> 
                <h1>
                   {tiempo}
                </h1>
            </section>}
        </div>
        {MapCul}

        <MapaObjeto keyProp={ClassName}></MapaObjeto>

    </div>
    </div>);
    
}
export default MapaCul;
