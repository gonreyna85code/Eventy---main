import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LogingForm from './Routes/Login/LogingForm'
import Landing from './Routes/Landing/Landing';
import CrearEventos from './Routes/CrearEventos/CrearEventos';
import DetailEvet from './Routes/DetaliEvent/DetailEvent';
import EventEditor from './Routes/EventEditor/EventEditor';
import Profile from './Routes/Profile/Profile';
import NavBar from "./Routes/NavBar/NavBar"
import {getUser} from './redux/actions'
import Home from './Routes/Home/Home';
import SocialCategory from './Routes/SocialCategory/SocialCategory';
import SportCategory from './Routes/SportCategory/SportCategory';
import Setting from './Routes/Setting/Setting';
import Resultado from './Routes/Resultado/Resultado.js';
import SubCategory from './Routes/SocialCategory/SocialSubcategories/Socialsub';
import AllEvents from './Routes/AllEvents/AllEvents';
import User from './Routes/User/User';
import Compra from './Routes/Compra/Compra';
import ResetPassword from './Routes/ResetPassword';
import Forgot from './Routes/Forgot';
import CompletePerfil from './Routes/CompletarPerfil/completarPerfil';
import { useJsApiLoader } from '@react-google-maps/api';
const libraries=["places"];
function App() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.User);


  const {isLoaded, loadError} = useJsApiLoader(
    {googleMapsApiKey:process.env.GOOGLE_KEY,
    libraries
  })
  useEffect(()=>{

    dispatch(getUser());

  }, [dispatch]);
  if (loadError) {
    alert('script no cargado')
  }
  if (!isLoaded) {
    return<h2>Loading</h2>
  }


  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path = '/' element ={ user && !user._id ? <Landing/>: <Home/> }/> 
          <Route exact path = '/crear-evento' element = {<div><NavBar/><CrearEventos/></div>}/>
          <Route exact path = '/editar-evento/:name' element = {<div><NavBar/><EventEditor/></div>}/>
          <Route exact path = '/detailEvent/:name' element = {<div><NavBar/><DetailEvet/></div>}/>
          <Route exact path = '/login' element = {<LogingForm/>}/>
          <Route exact path = '/profile' element = {<div><NavBar/><Profile/></div>}/>
          <Route exact path = '/setting' element = {<div><NavBar/><Setting/></div>}/>
          <Route exact path = '/social' element = {<div><NavBar/><SocialCategory/></div>}/>
          <Route exact path = '/sport' element = {<div><NavBar/><SportCategory/></div>}/>
          <Route exact path = '/subcategory/:subcategory' element = {<div><NavBar/><SubCategory/></div>}/>
          <Route exact path = '/result' element = {<div><NavBar/><Resultado/></div>}/>
          <Route exact path = '/all-events' element = {<div><NavBar/><AllEvents/></div>}/>
          <Route exact path = '/user/:id' element = {<div><NavBar/><User /></div>}/>
          <Route exact path = '/reset/:id' element = {<div><NavBar/><ResetPassword/></div>}/>
          <Route exact path = '/forgot' element = {<div><NavBar/><Forgot/></div>}/>
          <Route exact path = '/compraExitosa/:title' element = {<div><NavBar/><Compra/></div>}/>
          <Route exact path = '/completarPerfil' element = {<div><NavBar/><CompletePerfil/></div>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;