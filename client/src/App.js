import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
// import Landing from './Routes/Landing'
import LoginForm from './components/Login/LogingForm';
import Landing from './components/Landing/Landing';
import CrearEventos from './Routes/CrearEventos/CrearEventos';
<<<<<<< HEAD
import NavBar from "./components/NavBar/NavBar"
=======
import DetailEvet from './Routes/DetailEvent';
//import NavBar from "./Routes/NavBar/NavBar"
import {getUser} from './redux/actions'
import Home from './Routes/Home/Home';
import SocialCategory from './Routes/SocialCategory/SocialCategory';
import SportCategory from './Routes/SportCategory/SportCategory';

>>>>>>> e28d52054927fc67e304c4cebd7d9bba35ef8b09

function App() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.User);

  useEffect(()=>{

    dispatch(getUser());

  }, [dispatch]);

  return (
    <BrowserRouter>
<<<<<<< HEAD
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
=======
      <div className="App">
        
        <Routes>
          <Route exact path = '/' element ={ user && !user._id ? <Landing/>: <Home/> }/> 
          <Route exact path = '/crear-evento' element = {<CrearEventos/>}/>
          <Route exact path = '/detailEvent/:name' element = {<DetailEvet/>}/>
          <Route exact path = '/login' element = {<LogingForm/>}/>
          <Route exact path = '/social' element = {<SocialCategory/>}/>
          <Route exact path = '/sport' element = {<SportCategory/>}/>
        </Routes>
        
      </div>
>>>>>>> e28d52054927fc67e304c4cebd7d9bba35ef8b09
    </BrowserRouter>
  );
}

export default App;