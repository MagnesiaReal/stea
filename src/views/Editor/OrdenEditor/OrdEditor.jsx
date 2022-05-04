import React, { useState } from 'react'

const OrdEditor = () => {

    const [forms, setForm] = useState({});
    const [pregunta,setPregunta] = useState({});
    const [element, setElement] = useState([{}])

    var index = 0;

    const handleChange = (e) => {
        setForm({
            ...forms,
            [e.target.name]: e.target.value
        })
        console.log(forms)
    }

    const handleQuestionChange = (e) => {
        const q = element.find( element => element.id === e.target.id)
        setPregunta(q)
        if(e.target.name === 'answer'){   
            element[e.target.id].answer = e.target.value;
            console.log("holas");
        }
        if(e.target.name === 'pista'){   
            element[e.target.id].pista = e.target.value;
            console.log("holas");
        }
        if(e.target.name === 'image')   element[e.target.id].answer = e.target.image;
        setElement(element)
        setForm({
            ...forms,
            'options' : {...element, [e.target.id] : {...pregunta,[e.target.name]: e.target.value}}
        })
    }

    const handleDelete = (e) => {
        const borrado = element.splice(e.target.id,1)
        console.log(borrado);
        setElement(element)
        setForm({
            ...forms,
            'options' : {...element}
        })
        console.log(element);

    }

    const handleAdd = (e) => {
        const newElement = {
                answer : "",
                image : "",
                pista : ""
        }
        
        console.log(index)
        setElement([
            ...element,newElement
            ])
        console.log(element)
        setForm({
            ...forms,
            'options' : {...element}
        })
        
    }
   

  return (
    <div>
        <h1>Pregunta</h1>
        <form>
            <label>Pregunta</label>
            <input type="text" name='pregunta'  placeholder='Coloca tu pregunta aquí' onChange={handleChange} />
            <label>tiempo</label>
            <input type='number' name='num' onChange={handleChange}/>
            <label>Pista superior</label>
            <input type='text' name='pista_superior' onChange={handleChange}/>
            { element.length>9 ? <h2>Ya no se pueden agregar más opciones!</h2> : <input type='button' name={element.length+1} value="Añadir una opción" onClick={handleAdd}/> }
            {element.map( (item,index) => 
                <div index={index} key={index} >
                    <h1>{index}</h1>
                    <h3>{item.answer}</h3>
                    <h4>{item.pista}</h4>
                    <label>Opción</label>
                    <input type='text' name='answer' id={index} key={index}  onChange={handleQuestionChange}/>
                    <label>Pista</label>
                    <input type='text' name='pista' id={index}  onChange={handleQuestionChange}/>
                    <input type='button' name={index} id={index} value="Delete" onClick={handleDelete}/>
                </div>
            )}
            <label>Pista inferior</label>
            <input type='text' name='pista_inferior' onChange={handleChange}/>
        </form>
        <p></p>
    </div>
  )
}

export default OrdEditor