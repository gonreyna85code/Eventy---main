
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import CrearEventos from './Routes/CrearEventos/CrearEventos';
import DetailEvet from './Routes/DetailEvent';
import {getUser} from './redux/actions'
import Home from './Routes/Home/Home';
import SocialCategory from './Routes/SocialCategory/SocialCategory';
import SportCategory from './Routes/SportCategory/SportCategory';
import {Navigate} from 'react-router-dom'
import Loginform from './components/Login/LogingForm';
import RegisterForm from './components/Login/RegisterForm';



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
          <Route exact path = '/crear-evento' element = {user && !user._id ? <Navigate to='/' /> :<CrearEventos/>}/>
          <Route exact path = '/detailEvent/:name' element = {user && !user._id ? <Navigate to='/' /> : <DetailEvet/>}/>
          <Route exact path = '/login' element = {user && user._id ? <Navigate to='/' /> :<Loginform/>}/>
          <Route exact path = '/createUser' element = {user && user._id ? <Navigate to='/' /> :<RegisterForm/>}/>
          <Route exact path = '/social' element = {user && !user._id ? <Navigate to='/' /> :<SocialCategory/>}/>
          <Route exact path = '/sport' element = {user && !user._id ? <Navigate to='/' /> :<SportCategory/>}/>

        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;