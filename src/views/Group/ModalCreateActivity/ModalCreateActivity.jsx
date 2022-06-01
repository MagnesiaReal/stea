import React from 'react'
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from 'react-router-dom'
import AXIOS from "../../../services/http-axios"
import './ModalCreateActivity.css'

const ModalCreateActivity = (props) => {
  const cookie = new Cookies;
  const navigation = useNavigate();
    const [title, setTitle] = useState("1");
    const [description, setDescription] = useState("1")
    useEffect(()=> {
        
    });

    // Esta funcion manda a la base de datos los datos de la actividad que se agrego
    // NOTA: Si el usuario va a crear lo tiene que mandar al editor y posteriormente el agregara su actividad creada de forma manual
    function onCreateActivity(e) {
        e.preventDefault();
        
        const credentials = {
            userId: cookie.get('userId'),
            UUID: cookie.get('UUID'),
            title: title, // Aqui traer la Id de la actividad seleccionada
            description: description
        };
        console.log(credentials)
        AXIOS.post('activity/create', credentials)
        .then((res)=> {
            console.log('MODALADDACTIVITY>> ', res.data);
            navigation(`/editor/${res.data.activityId}`)
        }).catch((err)=>{
            console.log('MODALACCESS>> Error status code: ', err.response.status, err.response.data.message);
        });
    }

    const handleTitle = (e) => {
      setTitle(e.target.value)
    }

    const handleDescription = (e) => {
      setDescription(e.target.value)
    }
    

    return (
      
        <div className="modal fade" id="stea-create-modal" tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Crear actividad</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" align="middle">
                          <form className='stea-modalForm-container' onSubmit={onCreateActivity}>
                            <input className='stea-modalForm-text' type="text" onChange={handleTitle} placeholder="Pon el titulo de la aplicación" required/>
                            <textarea className='stea-modalForm-text' onChange={handleDescription} rows="6" placeholder="Pon una descripción" required/>
                            <input type="submit"/>
                          </form>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default ModalCreateActivity

