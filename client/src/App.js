import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LogingForm from './Routes/LogingForm';
import Landing from './Routes/Landing';
import CrearEventos from './Routes/CrearEventos/CrearEventos';
import DetailEvet from './Routes/DetailEvent';
import NavBar from "./Routes/NavBar/NavBar"
import Userform from './Routes/LogingForm';
import Home from './Routes/Landing';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path = '/' element ={<Landing/>}/> 
        <Route exact path = '/login' element = {<Userform/>}/>
        <Route exact path = '/homeuser' element = {<Home/>}/>
        <Route exact path = '/crear-evento' element = {<CrearEventos/>}/>
        <Route exact path = '/detailEvent/:name' element = {<DetailEvet/>}/>
        <Route exact path = '/' element ={<Landing/>}/>
        <Route exact path = '/login' element = {<LogingForm/>}/>
        <Route exact path = '/crear-evento' element={<div>
          <CrearEventos/>
        </div>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;