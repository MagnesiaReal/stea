import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import AXIOS from "../../../services/http-axios"

export default function ModalAddActivity(props) {
    const cookie = new Cookies;

    const [initDate, setInitDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [activities, setActivities] = useState("");

    useEffect(()=> {
        // invocamos la lista de actividades que el owner creo o que el owner puede editar para agregar a su grupo
        AXIOS.get('/activity/allforadmin')
        .then((res) => {
        if(res.status === 204) {
            console.log('ACTIVITIES ADMINOWNER>> No content');
        } else {
            console.log('ACTIVITIES ADMINOWNER>> ', res.data.message);
            setActivities(res.data.activitiesData);
        }
        }).catch((err)=> {
            console.log('ACTIVITIES>> Error: ', err.response.status, err.response.data.message);
        });
    });

    // Esta funcion manda a la base de datos los datos de la actividad que se agrego
    // NOTA: Si el usuario va a crear lo tiene que mandar al editor y posteriormente el agregara su actividad creada de forma manual
    function onAddActivity(e) {
        e.preventDefault();
        
        const credentials = {
            userId: cookie.get('userId'),
            UUID: cookie.get('UUID'),
            initDate: "2022-12-13", // Fecha inicial del 
            endDate: "2022-12-15", // Aqui debe ir la fecha final para hacer la actividad
            groupId: props.groupId, 
            activityId: 1 // Aqui traer la Id de la actividad seleccionada
        };

        AXIOS.post('activity/add', credentials)
        .then((res)=> {
            console.log('MODALADDACTIVITY>> ', res.data.message);
        }).catch((err)=>{
            console.log('MODALACCESS>> Error status code: ', err.response.status, err.response.data.message);
        });
    }

    return (
        <div>Un simple modal a editar</div>
    );
}