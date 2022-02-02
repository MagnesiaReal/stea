import logo from './logo.svg';
import './App.css';
import Mapa from './views/Mapa.js'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  return ( 
  <Router>
    <Routes>
      <Route path='/Mapa' element={<Mapa V1={2}/>}>
        
      </Route>
    </Routes>
  </Router> );
}

export default App;
