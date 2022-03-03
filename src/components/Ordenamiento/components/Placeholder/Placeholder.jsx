import React, { useState } from 'react';
import './Placeholder.css';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Placeholder = () => {
    const datos = [
        {
            id : "01",
            answer : "Independencia",
            image : "https://www.mexicodesconocido.com.mx/wp-content/uploads/2010/06/independencia-mexico-historia.jpg"
        },
        {
            id : "02",
            answer : "Porfiriato",
            image : "https://concepto.de/wp-content/uploads/2019/04/Jos%C3%A9-de-la-Cruz-Porfirio-D%C3%ADaz-Mori-e1555691580270.jpg"
        },
        {
            id : "03",
            answer : "Revolución",
            image : "https://www.trespm.mx/media/k2/items/cache/2be061c2b6449abf6812de42524d71ab_XL.jpg"
        },
        {
            id : "04",
            answer : "Matanza de tlatelolco",
            image : "https://larepublica.pe/resizer/t9AJLyGQjrPSQBG2zfXMw0FVnu8=/1102x648/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/2PLCTNNH5JFZFPVNBJQXBV3NYE.png"
        },
    ]

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
        console.table(result);

        return result;
    }

  return(
    <div>
    <DragDropContext onDragEnd={handlingOnDrag}>
        <Droppable droppableId='datos'>
          {(provided)=>(
              <ul className='options' {...provided.droppableProps} ref={provided.innerRef}>
                  {
                      answers.map((item, index) => {
                          return(
                              <Draggable  draggableId={item.id} index={index} key={item.id}>
                                  {(provided) => (
                                    
                                    <div
                                        
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className='item'
                                    >
                                        <h1 className='title'>{item.answer}</h1>
                                        <div className='imagen'> 
                                            <img className='img' src={item.image} />
                                        </div>
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
