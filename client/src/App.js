import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
// import Landing from './Routes/Landing'
import LoginForm from './components/Login/LogingForm';
import Landing from './components/Landing/Landing';
import CrearEventos from './Routes/CrearEventos/CrearEventos';
import NavBar from "./components/NavBar/NavBar"

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
        <Route exact path = '/' element ={<Landing/>}/>
        <Route exact path = '/login' element = {<LoginForm/>}/>
        {/* <Route exact path = '/homeuser' element = {<Home/>}/> */}
        <Route exact path = '/crear-evento' element={<div>
          <NavBar/>
          <CrearEventos/>
        </div>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;