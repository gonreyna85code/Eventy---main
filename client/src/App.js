
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import CrearEventos from './Routes/CrearEventos/CrearEventos';
import DetailEvet from './Routes/DetailEvent';
import Profile from './Routes/Profile/Profile';
import { Navigate } from 'react-router';
import {getUser} from './redux/actions'
import Home from './Routes/Home/Home';
import SocialCategory from './Routes/SocialCategory/SocialCategory';
import SportCategory from './Routes/SportCategory/SportCategory';
import Setting from './Routes/Setting/Setting';
import Resultado from './Routes/Resultado/Resultado.js';
import SubCategory from './Routes/SocialCategory/SocialSubcategories/Socialsub';
import NavBar from './components/NavBar/NavBar';
import Loginform from './components/Login/LogingForm';
import RegisterForm from './components/Login/RegisterForm';
import AllEvents from './Routes/AllEvents/AllEvents';


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
          <Route exact path = '/crear-evento' element = {user && user._id ?<div><NavBar/><CrearEventos/></div>:<Navigate to= '/'/>}/>
          <Route exact path = '/detailEvent/:name' element = {user && user._id ?<div><NavBar/><DetailEvet/></div>:<Navigate to= '/'/>}/>
          <Route exact path = '/login' element = {user && user._id ?<Navigate to= '/'/>:<Loginform/>}/>
          <Route exact path = '/createUser' element = {user && user._id ?<RegisterForm/>:<Navigate to= '/'/>}/>
          <Route exact path = '/profile' element = {user && user._id ?<div><NavBar/><Profile/></div>:<Navigate to= '/'/>}/>
          <Route exact path = '/setting' element = {user && user._id ?<div><NavBar/><Setting/></div>:<Navigate to= '/'/>}/>
          <Route exact path = '/social' element = {user && user._id ?<div><NavBar/><SocialCategory/></div>:<Navigate to= '/'/>}/>
          <Route exact path = '/sport' element = {user && user._id ?<div><NavBar/><SportCategory/></div>:<Navigate to= '/'/>}/>
          <Route exact path = '/subcategory/:subcategory' element = {user && user._id ?<div><NavBar/><SubCategory/></div>:<Navigate to= '/'/>}/>
          <Route exact path = '/result' element = {user && user._id ?<div><NavBar/><Resultado/></div>:<Navigate to= '/'/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;