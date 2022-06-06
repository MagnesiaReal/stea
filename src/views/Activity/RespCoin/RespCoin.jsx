import react, {useEffect, useRef, useState} from 'react'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import spacecraft from '../../../images/spacecraft.png'
import './RespCoin.scss'


export default function RespCoin(props) {
  const [mouseCoords, setMouseCoords] = useState({x: 0, y: 0});
  const [wrongAnswers, setWrongAnswers] = useState(props.activity.wrongAnswers);
  const [questions, setQuestions] = useState(props.activity.questions);
  const [globTime, setGlobTime] = useState(props.activity.time);
  const [time, setTime] = useState(0);
  const [questItr, setQuestItr] = useState(0);
  //const [wrongAnswers, setWrongAnswers] = useState();
  //const [questions, setQuestions] = useState();
  const [fire, setFire] = useState(false);

  const spaceShipRef = useRef(null);
  
  useEffect(()=>{
    const onSpaceDown = (e) => {
      console.log(e.key);
      if(e.key === ' ') setFire(true);
    }
    window.addEventListener('keydown', onSpaceDown);

    

    return () => {
      window.removeEventListener('keydown', onSpaceDown);
    }
  },[]);

  function onMouseCoords(e) { 

    const y = (e.nativeEvent.offsetY<=60) ? 60 : (e.nativeEvent.offsetY >= e.target.clientHeight-60) ? e.target.clientHeight-60 : e.nativeEvent.offsetY;
    setMouseCoords({
      x: e.nativeEvent.offsetX,
      y: y
    });
  }

  function onToucheCoords(e) {

    const y = (e.touches[0].clientY <= 60) ? 60 : (e.touches[0].clientY >= e.target.clientHeight-60) ? e.target.clientHeight-60 : e.touches[0].clientY;
    setMouseCoords({
      x: e.touches[0].clientX,
      y: y
    });
  }

  function onFullScreen(e) {
    document.body.requestFullscreen();
  }

  function onFire(e) {
    setFire(true);
  }

  function onNextQuestion(e) {
    if(globTime) {

    } else {
      

    }
  }

  return(<div id="stea-stretch">
    <main id="stea-rc-game">
      <section id="stea-rc-area" onMouseMove={onMouseCoords} onTouchMove={onToucheCoords}>
      Coordenadas:
        x: {mouseCoords.x}
        y: {mouseCoords.y}
        <div style={{top: mouseCoords.y-60}} id="spacecraft">
          <div className={(fire)?"stea-rc-fire":""}></div>
          <img src={spacecraft} alt="spacecraft"/>
        </div>

      
      
        <div id="answers">
          Una respuesta
        </div>

      </section>
      {isMobile ? <button onClick={onFullScreen} className="btn btn-light">Full Screen</button> : null}
      {isMobile ? <button className="btn btn-warning btn-fire" onClick={onFire}>Fire <FontAwesomeIcon icon="fas fa-rocket"/></button>: null}
    </main>
  </div>
  );
}
