import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LogingForm from './Routes/LogingForm';
import Landing from './Routes/Landing';
import CrearEventos from './Routes/CrearEventos/CrearEventos';
import DetailEvet from './Routes/DetailEvent';
import Profile from './Routes/Profile/Profile';
// import NavBar from "./Routes/NavBar/NavBar"
import {getUser} from './redux/actions'
import Home from './Routes/Home/Home';
import SocialCategory from './Routes/SocialCategory/SocialCategory';
import SportCategory from './Routes/SportCategory/SportCategory';


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
          <Route exact path = '/profile' element = {<Profile/>}/>
          <Route exact path = '/social' element = {<SocialCategory/>}/>
          <Route exact path = '/sport' element = {<SportCategory/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;