import {useRef, useState, useEffect } from "react"


export default function Answer(props) {
  const ansRef = useRef(null);
  const [focused, setFocursed] = useState(false);

  useEffect(() => {
    if(props.fire && (props.y < props.mouseCoords.y && props.y+ansRef.current.offsetHeight > props.mouseCoords.y)) {
      console.log('YES, LIKE YOU GUESS I shooting you moder fuker ', props.answer); 
    }
  }, [props.fire]);

  
  
  console.log(ansRef);
  return <div
    ref={ansRef}
    key={props.answer}
    className={"answer"} 
    style={{top: `${props.y}px`, animation:`answer-tray ${props.questionTime}s linear`}}>
    <div 
      className={(props.y < props.mouseCoords.y && props.y+ansRef.current.offsetHeight > props.mouseCoords.y)?"answer-rotation focus-answer" : "answer-rotation"}>
      {props.answer}
    </div>
  </div>
}
