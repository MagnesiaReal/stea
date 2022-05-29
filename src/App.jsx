import Mapa from './views/Actividad/Mapas/MapaDiv/Mapa.jsx'
import MapaCul from './views/Actividad/Mapas/MapaCul/Mapa.jsx'
import MapaReg from './views/Actividad/Mapas/MapaReg/Mapa.jsx'
import Login from './views/Login/Login'
import Home from './views/Home/Home'
import Register from './views/Register/Registrer'
import OrdenamientoAct from './components/Ordenamiento/container/OrdenamientoAct';
import Entrega from './views/Entrega_1/Entrega';
import Session from './services/Session/Sesion'
import User from './views/User/User'
import ChangePass from './views/ChangePass/ChangePass'
import GroupConf from './views/GroupConf/GroupConf'
import Actividad from './views/Actividad/Actividad'

import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";
import { useState } from 'react';

import Cookies from 'universal-cookie';

import Dashboard from './views/Dashboard/Dashboard';
import Group from './views/Group/Group.jsx'
import MapaEditor from './views/Editor/MapaEditor/MapaEditor.jsx'
import RespCoinEditor from './views/Editor/RespCoinEditor/RespCoinEditor.jsx'
import Mapas from './views/Actividad/Mapas/Mapas.jsx'

function App() {

  const cookie = new Cookies();
  // Rutas sin login
  return (
    <Router>
      <Routes>
        {/*Rutas de usuario*/}
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login cookie={cookie}/>}/>
        <Route path='/register' element={<Register cookie={cookie}/>}/>
        <Route path='/changepass/:code' element={<ChangePass/>}/>

        <Route path='/editortest' element={<MapaEditor/>}/>
        <Route path='/editortest2' element={<RespCoinEditor/>}/>

        <Route path='/actividad' element={<Actividad/>}> </Route>
        <Route path='/entrega' element={<Entrega/>}> </Route>
        <Route path='/order' element={<OrdenamientoAct/>}> </Route>
        <Route path='/inicio' element={<Dashboard/>}> </Route>
      
        
        {/*System paths*/}
        <Route path='/' element={<Session cookie={cookie}/>}>
          <Route index element={<Navigate to={(cookie.get('userId') !== undefined) ? `/user/${cookie.get('userId')}` : '/home'}/>}/>
          <Route path='user/:id' element={<User cookie={cookie}/>}/>
          <Route path='group/:groupId' element={<Group cookie={cookie}/>}/>
          <Route path='groupconf/:groupId' element={<GroupConf cookie={cookie}/>}/>
          <Route exact path='*' element={<Navigate to={(cookie.get('userId') !== undefined) ? `/user/${cookie.get('userId')}` : '/home'}/>}/> 
        </Route>

        <Route exact path='*' element={<Navigate to='/home'/>}/>
        
      </Routes>
    </Router> );

}

export default App;
