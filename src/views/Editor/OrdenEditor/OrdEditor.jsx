import React, { useEffect, useState } from 'react'
import './OrdEditor.css'

const OrdEditor = (props) => {
    
    const [forms, setForm] = useState(props.activity);
    const [pregunta,setPregunta] = useState({});
    const [time, setTime] = useState(props.activity.time);
    const [element, setElement] = useState([])
    const [listo, setListo] = useState(false)
    
    useEffect(() => {
        setListo(false);
        setElement(props.activity.options)
        setListo(true)
    }, [])


    

    const handleChange = (e) => {
        if(e.target.name === "time"){
            setForm({
                ...forms,
                [e.target.name] : time
            })
        }else{
            setForm({
                ...forms,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleQuestionChange = (e) => {
        const elemento = element[e.target.id]
        setPregunta(elemento)
        if(e.target.name === 'answer'){   
            element[e.target.id].answer = e.target.value;
        }
        if(e.target.name === 'pista'){   
            element[e.target.id].pista = e.target.value;
        }
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

    }

    const handleAdd = (e) => {
        const newElement = {
                answer : "",
                pista : ""
        }
        setElement([
            ...element,newElement
            ])
        setForm({
            ...forms,
            'options' : [...element]
        })
        
    }

    const handleAddTime = (e) => {
        setTime(time => time + 5 )
        handleChange(e)
    }

    const handleSubTime = (e) => {
        setTime(time => time - 5)
        handleChange(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("el formulario es este: ",forms)
        props.activity.pregunta = forms.pregunta
        props.activity.time = time
        props.activity.pista_inferior = forms.pista_inferior
        props.activity.pista_superior = forms.pista_superior
        props.activity.options = element.slice()

    }
   
    if(!listo){ return (<div>loading {console.log("el formulario es el siguiente: ", forms)} {console.log("los elementos son: ", element)}</div> )}else{

        return ( 
        <div className='stea-ordenamiento-editor'>
            <p className='stea-ordenamiento-editorPregunta'>Pregunta: {forms.pregunta}</p>
            <div className='stea-ordenamiento-editorContenido'>
                <form onSubmit={handleSubmit} className="stea-ordenamiento-form">
                    <div className='stea-ordenamiento-formPrincipal'>
                        <label className='stea-ordenamiento-editorLabel'>Pregunta</label>
                        <input className='stea-ordenamiento-editorInput' type="text" name='pregunta'  placeholder='Coloca tu pregunta aquí' onChange={handleChange} required="required"/>
                        <div className='stea-ordenamiento-editorTiempo'>
                        {time === 0 ? <div className='stea-ordenamiento-botonTiempo-disabled' onClick={handleSubTime} name="time" disabled>-</div> : <div className='stea-ordenamiento-botonTiempo' onClick={handleSubTime} name="time">-</div>}
                            <label className='stea-ordenamiento-editorLabel' onChange={handleChange} >{time} segundos</label>
                        {time >= 360 ? <div className='stea-ordenamiento-botonTiempo-disabled' onClick={handleAddTime} name="time" disabled>+</div> : <div className='stea-ordenamiento-botonTiempo' onClick={handleAddTime} name="time">+</div>}
                        </div>
                        <label className='stea-ordenamiento-editorLabel'>Pista superior</label>
                        <input className='stea-ordenamiento-editorInput' value={forms.pista_superior} type='text' name='pista_superior' placeholder='Puedes colocar una pista superior' onChange={handleChange} />
                    </div>
                    <div className='stea-ordenamiento-editorbotones'>
                        { element.length>9 ? <p className='stea-ordenamiento-editorAviso'>¡Ya no se pueden agregar más opciones!</p> : <input className='stea-ordenamiento-botonGuay' type='button' name={element.length+1} value="Añadir una opción" onClick={handleAdd}/> }
                        <input className='stea-ordenamiento-botonGuay' type="submit" />
                    </div>
                    { !listo === true ? <div>cargando</div> : element.map( (item,index) => 
                        <div className='stea-ordenamiento-editoritemQuestion' index={index} key={index} >
                            <label className='stea-ordenamiento-editorLabel'>{index}.</label>
                            <label className='stea-ordenamiento-editorLabel'>Respuesta de la opción</label>
                            <input type='text' className='stea-ordenamiento-editorInputQ' name='answer' value={item.answer} placeholder='Coloca la respuesta' id={index} key={index}  onChange={handleQuestionChange} required="required"/>
                            <label className='stea-ordenamiento-editorLabel'>Pista</label>
                            <input type='text' className='stea-ordenamiento-editorInputQ' name='pista' value={item.pista} placeholder='Pista o link de imagen' id={index}  onChange={handleQuestionChange}/>
                            <input className='stea-ordenamiento-botonGuay' type='button' name={index} id={index} value="Borrar" onClick={handleDelete}/>
                        </div>
                    )}
                    <label className='stea-ordenamiento-editorLabel'>Pista inferior</label>
                    <input className='stea-ordenamiento-editorInput' value={forms.pista_inferior} type='text' name='pista_inferior' onChange={handleChange}/>
                </form>
                <div className='stea-ordenamientoOptions-editorflexbox'>
                    {forms.pista_superior}
                    {element.map( (item,index) => 
                        <div  className='stea-orderItem-editorflexbox' index={index} key={index} >
                            <h1 className='stea-orderItemTitle-fontTitle'>{index}</h1>
                            <p className='stea-orderItemTitle-fontTitle'>{item.answer}</p>
                            { item.pista.startsWith('http') ? <img alt={index} src={item.pista}></img> : <h4>{item.pista}</h4>}
                        </div>
                    )}
                    {forms.pista_inferior}
                </div>
            </div>
            <p></p>
        </div>
      )
    } 
}

export default OrdEditor;
