import React, { useState } from 'react';
import './Placeholder.css';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Placeholder = (props) => {
    const datos = props.options

    
    const [answers, setAnswer] = useState(datos);
    const handlingOnDrag  = (result) => {
        if(result.destination == null)  return;
        
        setAnswer((prevAnswers) => reOrder(prevAnswers, result.source.index, result.destination.index));
    }

    const reOrder = (prevAnswers, start, end) =>{
        console.log(prevAnswers);
        const result = [...prevAnswers];
        const [removed] = result.splice(start, 1);
        result.splice(end, 0, removed);

        props.setRespuesta(result)
        console.table(props.respuesta);

        return result;
    }

  return(
    <div>
    <DragDropContext onDragEnd={handlingOnDrag}>
        <Droppable droppableId='datos'>
          {(provided)=>(
              <ul className='stea-ordenamientoOptions-flexbox' {...provided.droppableProps} ref={provided.innerRef}>
                  {
                      answers.map((item, index) => {
                          return(
                              <Draggable  draggableId={index.toString()} index={index} key={index.toString()}>
                                  {(provided) => (
                                    
                                    <div
                                        
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className='stea-orderItem-flexbox'
                                    >
                                        <p>{index}.</p>
                                        <p className='stea-orderItemTitle-fontTitle'>{item.answer}</p>
                                        <p>{item.pista}</p>
                                    </div>
                                  )}
                              </Draggable>
                          );
                      })
                  }
                  {provided.placeholder}
              </ul>
          )}              
        </Droppable>
    </DragDropContext>
    </div>
  ) 
};

export default Placeholder;
