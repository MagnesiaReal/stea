import Login from './views/Login/Login'
import Home from './views/Home/Home'
import Register from './views/Register/Registrer'
import Entrega from './views/Entrega_1/Entrega';
import Session from './services/Session/Sesion'
import User from './views/User/User'
import ChangePass from './views/ChangePass/ChangePass'
import GroupConf from './views/GroupConf/GroupConf'

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Cookies from 'universal-cookie';

import Dashboard from './views/Dashboard/Dashboard';
import Group from './views/Group/Group.jsx';
import MapaEditor from './views/Editor/MapaEditor/MapaEditor.jsx';
import RespCoinEditor from './views/Editor/RespCoinEditor/RespCoinEditor.jsx';

import Activity from './views/Activity/Activity'
import Editor from './views/Editor/Editor';
import RespCoin from './views/Activity/RespCoin/RespCoin';

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

        <Route path='/TestActivity' element={<RespCoin/>}/>
    
        
        {/*System paths*/}
        <Route path='/' element={<Session cookie={cookie}/>}>
          <Route index element={<Navigate to={(cookie.get('userId') !== undefined) ? `/user/${cookie.get('userId')}` : '/home'}/>}/>
          <Route path='user/:id' element={<User cookie={cookie}/>}/>
          <Route path='group/:groupId' element={<Group cookie={cookie}/>}/>
          <Route path='groupconf/:groupId' element={<GroupConf cookie={cookie}/>}/>
          <Route path='editor/:activityId' element={<Editor/>}/>
          <Route path='activitygroup/:activityGroupId' element={<Activity/>}/>
          <Route exact path='*' element={<Navigate to={(cookie.get('userId') !== undefined) ? `/user/${cookie.get('userId')}` : '/home'}/>}/> 
        </Route>

        <Route exact path='*' element={<Navigate to='/home'/>}/>
        
      </Routes>
    </Router> );

}

export default App;
