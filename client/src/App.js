import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/home.js'
import Userform from './components/Userform';
import HomeUser from './components/HomeUser/HomeUser';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path = '/' element ={<Home/>}/>
        <Route exact path = '/login' element = {<Userform/>}/>
        <Route exact path = '/homeuser' element = {<HomeUser/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
