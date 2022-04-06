import Mapa from './components/Mapa/Mapa.jsx'
import MapaCul from './components/MapaCul/Mapa.jsx'
import MapaReg from './components/MapaReg/Mapa.jsx'
import Login from './views/Login/Login'
import Home from './views/Home/Home'
import Register from './views/Register/Registrer'
import OrdenamientoAct from './components/Ordenamiento/container/OrdenamientoAct';
import Entrega from './views/Entrega_1/Entrega';
import Session from './components/Session/Sesion'
import User from './views/User/User'
import ChangePass from './views/ChangePass/ChangePass'

import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";
import { useState } from 'react';

import Cookies from 'universal-cookie';

import Dashboard from './views/Dashboard/Dashboard';

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

        <Route path='/mapa' element={<Mapa/>}> </Route>
        <Route path='/mapaculturas' element={<MapaCul/>}> </Route>
        <Route path='/maparegiones' element={<MapaReg/>}> </Route>
        <Route path='/entrega' element={<Entrega/>}> </Route>
        <Route path='/order' element={<OrdenamientoAct/>}> </Route>
        <Route path='/inicio' element={<Dashboard/>}> </Route>
      
        
        {/*System paths*/}
        <Route path='/' element={<Session cookie={cookie}/>}>
          <Route index element={<Navigate to={(cookie.get('userId') !== undefined) ? `/user/${cookie.get('userId')}` : '/home'}/>}/>
          <Route path='user/:id' element={<User cookie={cookie}/>}/>
        </Route>

        <Route exact path='*' element={<Navigate to='/home'/>}/>
        
      </Routes>
    </Router> );

}

export default App;
