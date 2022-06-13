import {useRef, useState, useEffect } from "react"


export default function Answer(props) {
  const ansRef = useRef({offsetHeight:0});
  const [isImage, setIsImage] = useState(false);
  const [time, setTime] = useState(props.time);
  const [answer, setAnswer] = useState('');

  useEffect(()=> {
    setAnswer((props.answer.startsWith("http://") || props.answer.startsWith("https://"))?
      <img src={props.answer} alt={props.answer}></img>:
      props.answer);
  }, []);

  useEffect(() => {
    if(props.fire && (props.y < props.mouseCoords.y && props.y+ansRef.current.offsetHeight > props.mouseCoords.y)) {
      console.log('YES, as you guess I am shotting your self: ', props.answer);
      props.selectedAnswer(props.answer);
    }
  }, [props.fire]);

  
  
  return <div
    ref={ansRef}
    key={props.answer}
    className={"answer"} 
    style={{top: `${props.y}px`, right: `${props.x}%`}}>
    <div 
      className={(props.y < props.mouseCoords.y && props.y+ansRef.current.offsetHeight > props.mouseCoords.y)?"answer-rotation focus-answer" : "answer-rotation"}>
      {answer}
    </div>
  </div>
}
