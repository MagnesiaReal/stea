import react, {useEffect, useRef, useState} from 'react'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import spacecraft from '../../../images/spacecraft.png'
import './RespCoin.scss'
import Answer from './Answer/Answer';


export default function RespCoin(props) {
  const [mouseCoords, setMouseCoords] = useState({x: 0, y: 0});
  
  const [wrongAnswers, setWrongAnswers] = useState(props.activity.wrongAnswers);
  const [waItr, setWaItr] = useState(0);

  const [questions, setQuestions] = useState(props.activity.questions);
  const [qItr, setQItr] = useState(0);

  const [toShow, setToShow] = useState([]);
  const [questionTime, setQuestionTime] = useState(99999);

  const [globTime, setGlobTime] = useState(props.activity.time);
  const [time, setTime] = useState(0);

  const [fire, setFire] = useState(false);

  const spaceRef = useRef(null);
  
  useEffect(()=>{
    // FIRE FOR ANDROID BROWSER
    const onSpaceDown = (e) => {
      console.log(e.key);
      if(e.key === ' ') setFire(true);
    }
    window.addEventListener('keydown', onSpaceDown);
    // ########################

    shuffle(wrongAnswers);
    shuffle(questions);
    onNextQuestion();

    // ########################
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


  const shuffle = function (array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }  

  const setAnswerstoShow = (showAnswers) => {
    // save correct answer
    showAnswers.push({answer: questions[qItr].answer, y:0});
    setQuestionTime(questions[qItr].time);
    setQItr(qItr + 1);
    // save proporcional wrong answers by questions but shuffle before use Effect
    const answerStep = Math.floor(wrongAnswers.length/questions.length);
    for (let i = answerStep*waItr ; i < wrongAnswers.length && i < answerStep*(waItr+1); i++) {
      showAnswers.push({answer: wrongAnswers[i], y: 0});
    }
    setWaItr(waItr + 1); 
  }

  const setPositionInGame = (showAnswers) => {
    const limit = spaceRef.current.clientHeight - 170;
    const stepPos = limit / showAnswers.length;
    for(let i = 0; i < showAnswers.length; i++) {
      showAnswers[i].y = stepPos*i + 100;
    }
    console.log(showAnswers);
  }

  function onNextQuestion(e) {
    if(globTime) {
      console.log('This activity has a global time');

    } else {
      console.log('No time spaceRef: ', spaceRef);
      // first create anAnswers array to show at the moment
      const showAnswers = [];
      setAnswerstoShow(showAnswers);
      // shuffle answers and then set a position in grid
      shuffle(showAnswers);
      // set position for all possible answers
      setPositionInGame(showAnswers);
      setToShow(showAnswers);
    }
  }

  return(<div id="stea-stretch">
    <main id="stea-rc-game">
      <section ref={spaceRef} id="stea-rc-area" onMouseMove={onMouseCoords} onTouchMove={onToucheCoords}>
      Coordenadas:
        x: {mouseCoords.x}
        y: {mouseCoords.y}
        <div style={{top: mouseCoords.y-60}} id="spacecraft">
          <div className={(fire)?"stea-rc-fire":""}></div>
          <img src={spacecraft} alt="spacecraft"/>
        </div>



        <div className="answers">
        Una respuesta
        </div>
        
        {toShow.map((v, idx) =>  <Answer {...v} questionTime={questionTime} mouseCoords={mouseCoords} fire={fire}/> )}



      </section>
      {isMobile ? <button onClick={onFullScreen} className="btn btn-light">Full Screen</button> : null}
      {isMobile ? <button className="btn btn-warning btn-fire" onClick={onFire}>Fire <FontAwesomeIcon icon="fas fa-rocket"/></button>: null}
    </main>
  </div>
  );
}
