import {useEffect, useState} from 'react';
import ModalCreateActivity from '../../Group/ModalCreateActivity/ModalCreateActivity';
//Importando el mock
import { profile } from '../Mock/ProfileMock';
import ProgressBar from 'react-customizable-progressbar';
//CSS
import './ProfileDashboard.css'
import medal1 from '../../../images/1.png'
import medal2 from '../../../images/2.png'
import medal3 from '../../../images/3.png'

const ProfileDashboard = (props) => {
  
  const [level, setLevel] = useState(props.config.xp/150);
  const [xp, setXp] = useState(props.config.xp%150);
  useEffect(()=> {
    
  });

  return (
    <div className='stea-perfilLateral-contenedor'>
      <div style={{position: "relative"}}>
        <img 
          alt={profile.nombre} 
          src={props.avatar.avatarUrl} 
          className='stea-perfilLateral-img'></img>
        <ProgressBar 
          progress={props.config.xp%150}
          steps={150}
          radius={100} 
          strokeWidth={10} 
          trackStrokeWidth={10} 
          pointerRadius={0.1} 
          strokeColor={"#069"} 
          pointerStrokeColor={"#069"}
          transition="1.2s ease"
          initialAnimation={true}
          initialAnimationDelay={600}/>
          <div className='stea-perfilLateral-semestre'>Nivel: {(props.xp)?(props.config.xp/150).toFixed(0):0}</div>
          <div className="stea-perfilLateral-semestre">XP: {(props.xp)?(props.config.xp%150).toFixed(0):0}/150</div>
      </div>
      
      <div className='stea-perfilLateral-informacion'>
        <div className='stea-perfilLateral-name'>{props.userName}</div>
        <div className='stea-perfilLateral-semestre'>Avatar: {props.avatar.nombre}</div>
      </div>
      {/*<div className='stea-perfilLateral-enlaces'>
        <button className="btn btn-dark" data-target="#stea-create-modal" data-toggle="modal">Crear actividad</button>
      </div>*/}
      <div className="stea-perfilLateral-enlaces">
      </div>
      <div className="stea-profile-dashboard-medals">
        {(props.config.firstPlace)? <div><img className="stea-user-medal" src={medal1} alt="medal1"/>  <h6>{props.config.firstPlace}</h6></div>: null}
        {(props.config.secondPlace)? <div><img className="stea-user-medal" src={medal2} alt="medal2"/>  <h6>{props.config.secondPlace}</h6></div>: null}
        {(props.config.thirdPlace)? <div><img className="stea-user-medal" src={medal3} alt="medal3"/>  <h6>{props.config.thirdPlace}</h6></div>: null}
      </div>
    </div>

    
  )
}

export default ProfileDashboard
