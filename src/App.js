import logo from './logo.svg';
import './App.css';
import Mapa from './components/Mapa/Mapa.js'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  return ( 
  <Router>
    <Routes>
      <Route path='/Mapa' element={<Mapa/>}>
        
      </Route>
    </Routes>
  </Router> );
}

export default App;
