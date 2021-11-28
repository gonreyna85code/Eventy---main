import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {login} from "../../redux/actions";
import Boton from "../../components/Boton/Boton";
import Input from "../../components/Input/Input";




export default function Loginform() {
  const dispatch = useDispatch();
  const[username, setUserName] = useState('')
  const [password, setPasword]= useState('')

  return (
    <div className='cont-center'>
      <Link to="/">
      <Boton colorBtn='btn_naranja'>Volver al Home</Boton>
      </Link>
      <h1>Por favor, Ingrese su Usuario y Contraseña</h1>
      <form>
        <div className="input">
          <Input
            label='Usuario'
            type='text'
            onChange={
              (e)=>{
                setUserName(e.target.value)
              }
            }
        />
        </div>
        <div className="input">
          <Input
            label='Contraseña'
            type='password'
            onChange={
              (e)=>{
                setPasword(e.target.value)
              }
            }
          />
        </div>
      </form>
      <div>
      <Boton colorBtn='btn_azul' onClick={()=>{
        
        dispatch(login({username,password}))
        console.log(username, password)
        
      }}> INGRESAR </Boton>
      </div>
      <div>
      <Link to="/createUser">
      <Boton colorBtn='btn_naranja'>Aún no estoy registrado</Boton>
      </Link>

    </div>
    </div>
  );
}
