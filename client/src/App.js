import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/home.js'
import Userform from './components/Userform';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path = '/' element ={<Home/>}/>
        <Route exact path = '/userform' element = {<Userform/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
