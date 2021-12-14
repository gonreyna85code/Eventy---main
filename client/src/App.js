import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './App.css';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
// import LogingForm from './components/Login/LogingForm';
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

function App() {
  const navigate = useNavigate()
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
          <Route exact path = '/crear-evento' element = {user && user.password==='' ? navigate('/completarPerfil'):<div><NavBar/><CrearEventos/></div>}/>
          <Route exact path = '/editar-evento/:name' element = {user && user.password==='' ? navigate('/completarPerfil'):<div><NavBar/><EventEditor/></div>}/>
          <Route exact path = '/detailEvent/:name' element = {user && user.password==='' ? navigate('/completarPerfil'):<div><NavBar/><DetailEvet/></div>}/>
          <Route exact path = '/login' element = {<LogingForm/>}/>
          <Route exact path = '/profile' element = {user && user.password==='' ? navigate('/completarPerfil'):<div><NavBar/><Profile/></div>}/>
          <Route exact path = '/setting' element = {user && user.password==='' ? navigate('/completarPerfil'):<div><NavBar/><Setting/></div>}/>
          <Route exact path = '/social' element = {user && user.password==='' ? navigate('/completarPerfil'):<div><NavBar/><SocialCategory/></div>}/>
          <Route exact path = '/sport' element = {user && user.password==='' ? navigate('/completarPerfil'):<div><NavBar/><SportCategory/></div>}/>
          <Route exact path = '/subcategory/:subcategory' element = {user && user.password==='' ? navigate('/completarPerfil'):<div><NavBar/><SubCategory/></div>}/>
          <Route exact path = '/result' element = {user && user.password==='' ? navigate('/completarPerfil'):<div><NavBar/><Resultado/></div>}/>
          <Route exact path = '/all-events' element = {user && user.password==='' ? navigate('/completarPerfil'):<div><NavBar/><AllEvents/></div>}/>
          <Route exact path = '/user/:id' element = {user && user.password==='' ? navigate('/completarPerfil'):<div><NavBar/><User /></div>}/>
          <Route exact path = '/reset/:id' element = {user && user.password==='' ? navigate('/completarPerfil'):<div><NavBar/><ResetPassword/></div>}/>
          <Route exact path = '/forgot' element = {user && user.password==='' ? navigate('/completarPerfil'):<div><NavBar/><Forgot/></div>}/>
          <Route exact path = '/compraExitosa/:title' element = {user && user.password==='' ? navigate('/completarPerfil'):<div><NavBar/><Compra/></div>}/>
          <Route exact path = '/completarPerfil' element = {user && user.password==='' ? navigate('/completarPerfil'):<div><NavBar/><CompletePerfil/></div>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;