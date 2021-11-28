
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import CrearEventos from './Routes/CrearEventos/CrearEventos';
import DetailEvet from './Routes/DetailEvent';
import Profile from './Routes/Profile/Profile';
import NavBar from "./components/NavBar/NavBar"
import {getUser} from './redux/actions'
import Home from './Routes/Home/Home';
import SocialCategory from './Routes/SocialCategory/SocialCategory';
import SportCategory from './Routes/SportCategory/SportCategory';
import Setting from './Routes/Setting/Setting';
import Resultado from './Routes/Resultado/Resultado.js';
import SubCategory from './Routes/SocialCategory/SocialSubcategories/Socialsub';
import LogingForm from './components/Login/LogingForm'
import RegisterFrom from './components/Login/RegisterForm'

function App() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.User);

  useEffect(()=>{

    dispatch(getUser());

  }, [dispatch]);
  console.log(user);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path = '/' element ={ user && !user._id ? <Landing/>: <Home/> }/> 
          <Route exact path = '/crear-evento' element = {<div><NavBar/><CrearEventos/></div>}/>
          <Route exact path = '/detailEvent/:name' element = {<div><NavBar/><DetailEvet/></div>}/>
          <Route exact path = '/login' element = {<LogingForm/>}/>
          <Route exact path = '/createUser' element = {<RegisterFrom/>}/>
          <Route exact path = '/profile' element = {<div><NavBar/><Profile/></div>}/>
          <Route exact path = '/setting' element = {<div><NavBar/><Setting/></div>}/>
          <Route exact path = '/social' element = {<div><NavBar/><SocialCategory/></div>}/>
          <Route exact path = '/sport' element = {<div><NavBar/><SportCategory/></div>}/>
          <Route exact path = '/subcategory/:subcategory' element = {<div><NavBar/><SubCategory/></div>}/>
          <Route exact path = '/result' element = {<div><NavBar/><Resultado/></div>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;