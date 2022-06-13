import react, {useEffect, useRef, useState} from 'react'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import spacecraft from '../../../images/spacecraft.png'
import './RespCoin.scss'
import Answer from './Answer/Answer';
import Cookies from 'universal-cookie';


export default function RespCoin(props) {
  const cookie = new Cookies();

  const [mouseCoords, setMouseCoords] = useState({x: 0, y: 0});
  
  const [wrongAnswers, setWrongAnswers] = useState(props.activity.wrongAnswers);
  const [waItr, setWaItr] = useState(0);

  const [questions, setQuestions] = useState(props.activity.questions);
  const [qItr, setQItr] = useState(0);
  
  const [questToShow, setQuestToShow] = useState('');
  const [toShow, setToShow] = useState([]);

  const [globTime, setGlobTime] = useState(props.activity.time);
  const [time, setTime] = useState(999999);
  const [ascTime, setAscTime] = useState(0);
  const [globTimeId, setGlobTimeId] = useState(null);
  const [timeId, setTimeId] = useState(0);

  const [fire, setFire] = useState(false);

  const spaceRef = useRef(null);

  const [answers, setAnswers] = useState([]);

  const [isTime0, setIsTime0] = useState(true);
  
  useEffect(()=>{
    // FIRE FOR ANDROID BROWSER
    const onSpaceDown = (e) => {if(e.key === ' ') setFire(true)};
    const onSpaceUp = (e) => {if(e.key === ' ') setFire(false)};
    window.addEventListener('keydown', onSpaceDown);
    window.addEventListener('keyup', onSpaceUp);
    // ########################

    shuffle(wrongAnswers);
    shuffle(questions);

    // ########################
    return () => {
      window.removeEventListener('keydown', onSpaceDown);
      window.removeEventListener('keyup', onSpaceUp);
    }
  },[]);

  useEffect(()=>{
    console.log('Executing nextQuestion for RespCoinActivity');
    setFire(false);
    onNextQuestion();
    return () => {
      clearInterval(timeId);
      clearInterval(globTimeId);
    }
  }, [qItr]);
  
  // this will be usefull
  useEffect(()=> {
    if(questions[qItr].time != 0 && time <= 0) {
      const answerBody = {
        questionId: questions[qItr].questionId,
        question: questions[qItr].question,
        correctAnswer: questions[qItr].answer,
        answer: null,
        time: questions[qItr].time,
        timeLeft: 0,
        ascendingTime: ascTime,
      }
      setQItr(qItr+1);
      setAnswers([...answers, answerBody]);
    }
  }, [time]);

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
      showAnswers[i].x = Math.random()*35;
    }
  }

  function onNextQuestion() {
    if(qItr < questions.length) {
      if(globTime) {
        console.log('This activity has a global time');
      } else {
        clearInterval(timeId);
        setAscTime(0);
        setTime(questions[qItr].time);
        if(questions[qItr].time == 0){
          console.log('this question no have time');
          setIsTime0(true);
          const cTimeId = setInterval(()=>{
            setAscTime((ascTime)=>ascTime+0.1);
          }, 100);
          setTimeId(cTimeId); 

        } else {
          console.log('This question have time: ', questions[qItr].time);
          setIsTime0(false);
          const cTimeId = setInterval(()=>{
            setTime((time)=>time-0.1);
            setAscTime((ascTime)=>ascTime+0.1);
          }, 100);
          setTimeId(cTimeId);
        }
        // first create anAnswers array to show at the moment
        const showAnswers = [];
        setAnswerstoShow(showAnswers);
        // shuffle answers and then set a position in grid
        shuffle(showAnswers);
        // set position for all possible answers
        setPositionInGame(showAnswers);
        setToShow(showAnswers);
        setQuestToShow((questions[qItr].question.startsWith("https://") || questions[qItr].question.startsWith("https://"))? 
          <img src={questions[qItr].question} alt={questions[qItr].question} style={{maxWidth:"30em", maxHeight:'120px'}}/>:
          questions[qItr].question);
      }
    } else {
      console.log('This is your array of answers: ', answers, ' let\'s check this activity');
      let grade = 0;
      if(props.mode == 1) {
        answers.forEach(a=> {
          if(a.answer === a.correctAnswer) grade += 100;
        });
        //grade = grade / answers.length;
      } else {
        const avatarId = cookie.get('avatarId');
        if (avatarId == 1) grade = corredor(answers);
        else if(avatarId == 2) grade = profesora(answers);
        else if(avatarId == 3) grade = cirujana(answers);
        else if(avatarId == 4) grade = ingeniero(answers);
      }
      const values = {
        id: props.activity.id,
        type: props.activity.type,
        answers: answers,
        grade: grade,
        numQuestions: answers.length
      }
      console.log('Repuestas coincidentes calificado', values);
      props.setResults(values);
    }
  }

  function ingeniero(ar) {
    console.log('for ingeniero');
    let questionGrade = 0;
    let auxQuestion = 0;
    let seguidas = 0;
    let seguidasAux = 1;
    let multiply = 1;
    let correct = 0;
    let grade = 0;
    let puntosIng = 1;

    ar.forEach((respuesta)=>{
      questionGrade=0;//Limpiamos el valor de cada pregunta para evitar errores
      if(respuesta.time===0){//Si no tenemos tiempo para responder
        if(respuesta.answer==respuesta.correctAnswer){
          correct++
          questionGrade=10*(1+(1/respuesta.ascendingTime));//calificación de la pregunta por el tiempo
          auxQuestion=questionGrade+auxQuestion;//sumatoria de la calificación
          seguidas++//Cuenta la cantidad de preguntas seguidas que ha contestado
        }else{
          questionGrade=0;
          auxQuestion=questionGrade+auxQuestion;
          seguidasAux=seguidas;//Se guarda el valor de las rachas en caso de que no tengamos respuesta correcta
          seguidas=0;//Se reestablece el contador de seguidas
        }
        if(seguidasAux>=seguidas){//Compara que valor es el mayor entre las rachas obtenidas
          puntosIng=seguidasAux%3//contamos la cantidad de veces que acumulo 3 respuestas correct
          if(puntosIng===0)//si no obtuvo ninguno se pondra como valor 1 para multiplicar
          puntosIng=1;
        }else{
          puntosIng=seguidas%3//contamos la cantidad de veces que acumulo 3 respuestas correct
          if(puntosIng===0)//si no obtuvo ninguno se pondra como valor 1 para multiplicar
          puntosIng=1;
        }
        multiply=multiply+(puntosIng/10);
        grade=(auxQuestion*multiply);//puntuación con el multiply
        console.log(grade,auxQuestion,multiply)

      }else{//Si tenemos tiempo para responder
        if(respuesta.answer==respuesta.correctAnswer){
          correct++;
          questionGrade=10*respuesta.timeLeft;//calificación de la pregunta por el tiempo
          auxQuestion=questionGrade+auxQuestion;//sumatoria de la calificación
          seguidas++//Cuenta la cantidad de preguntas seguidas que ha contestado
        }else{
          questionGrade=0;
          auxQuestion=questionGrade+auxQuestion;
          seguidasAux=seguidas;//Se guarda el valor de las rachas en caso de que no tengamos respuesta correcta
          seguidas=0;//Se reestablece el contador de seguidas
        }
        if(seguidasAux>=seguidas){//Compara que valor es el mayor entre las rachas obtenidas
          puntosIng=seguidasAux%3//contamos la cantidad de veces que acumulo 3 respuestas correct
          if(puntosIng===0)//si no obtuvo ninguno se pondra como valor 1 para multiplicar
          puntosIng=1;
        }else{
          puntosIng=seguidas%3//contamos la cantidad de veces que acumulo 3 respuestas correct
          if(puntosIng===0)//si no obtuvo ninguno se pondra como valor 1 para multiplicar
          puntosIng=1;
        }
        multiply=multiply+(puntosIng/10);
        grade=(auxQuestion*multiply);//puntuación con el multiply
        console.log(grade,auxQuestion,multiply)          

      }
    }
    )

  }

  function cirujana(ar) {
    console.log('for Cirujana', ar);
    let questionGrade = 0;
    let auxQuestion = 0;
    let seguidas = 1;
    let seguidasAux = 1;
    let multiply = 1;
    let correct = 0;

    ar.forEach((a)=>{
      questionGrade=0;//Limpiamos el valor de cada pregunta para evitar errores
      if(a.time===0){//Si no tenemos tiempo para resolver
        if(a.answer==a.correctAnswer){
          correct++;
          questionGrade=10*(1+(1/a.ascendingTime));//calificación de la pregunta por el tiempo
          auxQuestion=questionGrade+auxQuestion;//sumatoria de la calificación
          seguidas++//Cuenta la cantidad de preguntas seguidas que ha contestado
          console.log(questionGrade,auxQuestion,seguidas);
        }else{
          seguidasAux=seguidas;//Se guarda el valor de las rachas en caso de que no tengamos a correcta
          seguidas=1;//Se reestablece el contador de seguidas
        }
      }else{//Si tenemos tiempo para resolver
        if(a.answer === a.correctAnswer){
          correct++;
          questionGrade=10*a.timeLeft;//calificación de la pregunta por el tiempo
          auxQuestion=questionGrade+auxQuestion;//sumatoria de la calificación
          seguidas++//Cuenta la cantidad de preguntas seguidas que ha contestado
        }else{
          seguidasAux=seguidas;//Se guarda el valor de las rachas en caso de que no tengamos a correcta
          seguidas=1;//Se reestablece el contador de seguidas
        }
      }
    });
    if(seguidasAux>=seguidas){//Compara que valor es el mayor entre las rachas obtenidas
      multiply=1.05*seguidasAux//Si tenemos que la racha historia es mayor a la racha que tenemos se multiplica por el historico
    }else{
      multiply=1.05*seguidas//Si tenemos que la racha actual es mayor a la historica se multiplica por ese factor
    }
    const grade=auxQuestion*multiply;//puntuación con el multiply
    console.log(grade,auxQuestion,multiply);
    return grade;
  }

  function profesora(ar) {
    console.log("Profesora en normal");
    let questionGrade = 0;
    let auxQuestion = 0;
    let multiply = 1;
    let correct = 0;
    let xpMultiply = 1;
    let xp = 120;
    let posicion = 1;
    ar.forEach((a)=>{
      questionGrade=0;//Limpiamos el valor de cada pregunta para evitar errores
      if(a.time===0){//Si no tenemos tiempo para resolver
        if(a.answer==a.correctAnswer){
          correct++;
          questionGrade=10*(1+(1/a.ascendingTime));//calificación de la pregunta por el tiempo
          auxQuestion=questionGrade+auxQuestion;//sumatoria de la calificación
          console.log(questionGrade,auxQuestion)
          if(posicion===1||posicion===2||posicion===3){//uso posición porque no se como se puede obtener 
            xpMultiply=1.1;//Modifica el multiply de xp
          }
        }
      }else{//si tenemos tiempo para resolver
        if(a.answer==a.correctAnswer){
          correct++;
          questionGrade=10*a.timeLeft;//calificación de la pregunta por el tiempo
          auxQuestion=questionGrade+auxQuestion;//sumatoria de la calificación
          if(posicion===1||posicion===2||posicion===3){//uso posición porque no se como se puede obtener 
            xpMultiply=1.1;//Modifica el multiply de xp
          }
        }
      }
    }
    )
    const grade=auxQuestion;
    xp=xp*xpMultiply;
    console.log(grade,auxQuestion,multiply);

  }

  function corredor(ar) {
    console.log("Corredor en normal");
    let questionGrade = 0;
    let auxQuestion = 0;
    let correct = 0;
    let seguidas = 0;
    let multiply = 1;
    ar.forEach((a)=>{
      if(a.time===0){//Si no tenemos tiempo para resolver
        correct = 0;
        if(a.asnwer == a.correctAnswer){
          correct++;
          console.log(correct,"+");
          questionGrade=10*(1+(1/parseFloat(a.ascendingTime)));//calificación de la pregunta por el tiempo
          auxQuestion=questionGrade+auxQuestion;//sumatoria de la calificación
          console.log(questionGrade,a.ascendingTime,auxQuestion)
          if(a.ascendingTime<=(4)){
            seguidas++//se incrementa la variable de respuestas seguidas siendo primeros
          }else{
            seguidas=0;//se reestablece el contador
          }
          if(seguidas>=5){//si el corredor tiene más de 5 tiene multiply
            multiply=1.05;
          }
        }
      }else{//Si tenemos tiempo para resolver
        if(a.asnwer==a.correctAnswer){
          correct++;
          questionGrade=10*a.timeLeft;//calificación de la pregunta por el tiempo
          auxQuestion=questionGrade+auxQuestion;//sumatoria de la calificación
          if(a.timeLeft>=(a.time*0.7)){
            seguidas++//se incrementa la variable de respuestas seguidas siendo primeros
          }else{
            seguidas=0;//se reestablece el contador
          }
          if(seguidas>=5){//si el corredor tiene más de 5 tiene multiply
            multiply=1.05;
          }
        }
      }
    });

    const grade = auxQuestion*multiply;
    console.log(grade,auxQuestion,multiply);
    return grade;
  }

  function selectedAnswer(answer) {
    const answerBody = {
      questionId: questions[qItr].questionId,
      question: questions[qItr].question,
      correctAnswer: questions[qItr].answer,
      answer: answer,
      time: questions[qItr].time,
      timeLeft: time,
      ascendingTime: ascTime,
    }

    setQItr(qItr+1);
    setAnswers([...answers, answerBody]);
  }
  return(<div id="stea-stretch">
    <main id="stea-rc-game">
      <section ref={spaceRef} id="stea-rc-area" onMouseMove={onMouseCoords} onTouchMove={onToucheCoords}>
      Coordenadas:
        x: {mouseCoords.x}
        y: {mouseCoords.y}

        <div className="question">
          <div>
            <h2>{questToShow}</h2>
          </div>
        </div>

        <div id="timer">
          <div>
            <h5>{(isTime0) ? ascTime.toFixed(0) : time.toFixed(0)}s</h5>
          </div>
        </div>

        <div style={{top: mouseCoords.y-60}} id="spacecraft">
          <div className={(fire)?"stea-rc-fire":""}></div>
          <img src={spacecraft} alt="spacecraft"/>
        </div>


        {toShow.map((v, idx) =>  <Answer key={v.answer} {...v} time={time} mouseCoords={mouseCoords} fire={fire} selectedAnswer={selectedAnswer}/>)}



      </section>
      {isMobile ? <button onClick={onFullScreen} className="btn btn-light">Full Screen</button> : null}
      {isMobile ? <button className="btn btn-warning btn-fire" onClick={onFire}>Fire <FontAwesomeIcon icon="fas fa-rocket"/></button>: null}
    </main>
  </div>
  );
}
