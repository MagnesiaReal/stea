import logo from './logo.svg';
import './App.css';
import Mapa from './components/Mapa/Mapa.jsx'
import MapaCul from './components/MapaCul/Mapa.jsx'
import MapaReg from './components/MapaReg/Mapa.jsx'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  return ( 
  <Router>
    <Routes>
      <Route path='/Mapa' element={<Mapa/>}> </Route>
      <Route path='/MapaCulturas' element={<MapaCul/>}> </Route>
      <Route path='/MapaRegiones' element={<MapaReg/>}> </Route>
    </Routes>
  </Router> );
}

export default App;
