import React from 'react';
import Placeholder from '../components/Placeholder/Placeholder';
import './OrdenamientoAct.css'
const OrdenamientoAct = () => {

  const question = {
    id : 1,
    pregunta : "Ordena los momentos historicos importantes de México a lo largo de la historia",
    respuestas : [
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
      }
    ]
  }



  return <div className='contenedor'>
    <h2>Pregunta {question.id}-.</h2>
    <h3>{question.pregunta}</h3>
    <Placeholder>a</Placeholder>
    <button> Enviar </button>
  </div>;
};

export default OrdenamientoAct;

