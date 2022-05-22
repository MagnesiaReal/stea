import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import AXIOS from "../../../services/http-axios"

export default function ModalConfigActivity(props) {
    const cookie = new Cookies;

    const [initDate, setInitDate] = useState("");
    const [endDate, setEndDate] = useState();
    const [activityId, setActivityId] = useState("1");
    const [mode, setMode] = useState("1")

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

        const d = new Date()
            var month = '' + (d.getMonth() + 1)
            var day = '' + d.getDate()
            var year = d.getFullYear();

            if (month < 10) 
                month = "0" + month;
            if (day < 10) 
                day = "0" + day;
        setInitDate( [year, month, day].join('-'))
    });

    // Esta funcion manda a la base de datos los datos de la actividad que se agrego
    // NOTA: Si el usuario va a crear lo tiene que mandar al editor y posteriormente el agregara su actividad creada de forma manual
    function onUpdateActivity(e) {
        
        console.log(props);
        const credentials = {
            userId: cookie.get('userId'),
            UUID: cookie.get('UUID'),
            initDate: initDate, // Fecha inicial del 
            endDate: endDate, // Aqui debe ir la fecha final para hacer la actividad
            groupId: props.groupId, 
            activityId: activityId, // Aqui traer la Id de la actividad seleccionada
            mode: mode,
            groupActivityId: props.idConfig
        };

        console.log(credentials)
        AXIOS.put('activity/updatedate', credentials)
        .then((res)=> {
            console.log('MODALADDACTIVITY>> ', res.data.message);
        }).catch((err)=>{
            console.log('MODALACCESS>> Error status code: ', err.response.status, err.response.data.message);
        });
        window.location.reload()
    }

    const addActivityId = (e) => {
        setActivityId(e.target.id)
    }

    const handleDates = (e) => {
        setEndDate(e.target.value)
    }

    const handleMode = (e) => {
        setMode(e.target.value)
    }
    

    return (
        <div className="modal fade" id="stea-config-modal" tabindex="-1" role="dialog" aria-hidden="true">
            
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Codigo de acceso</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body" align="middle">
                        <input name="endDate" onChange={handleDates} min={initDate} type="date"/>
                        <select name="mode" id="mode"  onChange={handleMode}>
                            <option defaultValue value="1">Examen</option>
                            <option value="2">Actividad</option>
                            <option value="3">Competencia</option>
                        </select>
                    </div>
                    <div className="modal-footer">
                        {mode === "1" ? <p>El usuario hará la actividad individual y solo puede ver sus resultados al final</p> : <p></p>}
                        {mode === "2" ? <p>El usuario hará la actividad individual y puede los resultados de todos</p> : <p></p>}
                        {mode === "3" ? <p>El usuario hace la actividad en conjunto hasta que el administrador la inicie y puede ver los resultados de todos</p> : <p></p>}
                        <button className="btn" data-dismiss="modal" aria-label="Close">Cerrar</button>
                        { endDate !== undefined && <button onClick={onUpdateActivity} >Agregar</button>}
                    </div>
                </div>
            </div>
        </div>
    );
}