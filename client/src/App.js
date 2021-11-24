import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Landing from './Routes/Landing'
import Userform from './Routes/Userform';
import Home from './Routes/home';
import CrearEventos from './Routes/CrearEventos/CrearEventos';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path = '/' element ={<Landing/>}/>
        <Route exact path = '/login' element = {<Userform/>}/>
        <Route exact path = '/homeuser' element = {<Home/>}/>
        <Route exact path = '/crear-evento' element = {<CrearEventos/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;