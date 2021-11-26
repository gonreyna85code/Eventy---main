import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LogingForm from './Routes/LogingForm';
import Landing from './Routes/Landing';
import CrearEventos from './Routes/CrearEventos/CrearEventos';
import DetailEvet from './Routes/DetailEvent';
import NavBar from "./Routes/NavBar/NavBar"
import {getUser} from './redux/actions'
import Home from './Routes/Home/Home';


function App() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.User);

  useEffect(()=>{

    dispatch(getUser());

  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        
        <Routes>
          <Route exact path = '/' element ={ user && !user._id ? <Landing/>: <Home/> }/> 
          <Route exact path = '/crear-evento' element = {<CrearEventos/>}/>
          <Route exact path = '/detailEvent/:name' element = {<DetailEvet/>}/>
          <Route exact path = '/login' element = {<LogingForm/>}/>
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;