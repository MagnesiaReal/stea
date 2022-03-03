import logo from './logo.svg';
import './App.css';
import Mapa from './components/Mapa/Mapa.jsx'
import MapaCul from './components/MapaCul/Mapa.jsx'
import MapaReg from './components/MapaReg/Mapa.jsx'
import Login from './views/Login/Login'
import Home from './views/Home/Home'
import Register from './views/Register/Registrer'
import Placeholder from './components/Ordenamiento/components/Placeholder/Placeholder';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";

function App() {
  return ( 
  <Router>
    <Routes>
      {/*Rutas de usuario*/}
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/Mapa' element={<Mapa/>}> </Route>
      <Route path='/MapaCulturas' element={<MapaCul/>}> </Route>
      <Route path='/MapaRegiones' element={<MapaReg/>}> </Route>
      <Route path='/Order' element={<Placeholder/>}> </Route>
      <Route exact path='*' element={<Navigate to='/home'/>}/>
    </Routes>
  </Router> );
}

export default App;
