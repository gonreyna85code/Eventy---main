import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Landing from './Routes/Landing'
import Userform from './Routes/Userform';
import Home from './Routes/home';
import CrearEventos from './Routes/CrearEventos/CrearEventos';
//<<<<<<< HEAD
import DetailEvet from './Routes/DetailEvent';
//=======
//import NavBar from "./Routes/NavBar/NavBar"
//>>>>>>> 7927f2b4e2f4f8cbb4385cd25d20948936448065

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
        <Route exact path = '/crear-evento' element={<div>
          <CrearEventos/>
        </div>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;