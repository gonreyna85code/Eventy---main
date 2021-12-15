import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserCity, registerUser, validateUser } from "../../redux/actions";
import Input from "../../components/Input/Input";
import Boton from "../../components/Boton/Boton";
import { useNavigate } from 'react-router';
import Map from "../../components/Maps/Map";
import styles from './RegisterForm.module.css'
import axios from "axios";
const development = process.env.NODE_ENV !== 'production';
const local = "http://localhost:4000/"
const heroku = "https://api-eventy.herokuapp.com/"

export default function RegisterForm(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[name, setNombre]=useState('')
  const[surname, setApellido]=useState('')
  const[username, setUsuario]=useState('')
  const[password, setContraseña]=useState('')
  const[age, setEdad]=useState('')
  const[email, setEmail]=useState('')
  const [publicKey, setPublicKey] = useState('');
  const [accesKey, setAccesKey] = useState('');

  const validUser = useSelector(state=>state.validUser)
  const UserCity = useSelector(state=> state.UserCity)
  const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/



 

  
  
  
  

  return(
  <div className={styles.container}>
    <h1>Crear nuevo Usuario</h1>
    <form>
      <div className={name.length>0 ?styles.InputValid: styles.InputInvalid}>
          <Input
            label='Nombre:'
            type='text'
            onChange={(e)=>{
              setNombre(e.target.value)
            }}
          />
      </div>
      <div className={surname.length>0 ?styles.InputValid: styles.InputInvalid}>
      <Input
          label='Apellido:'
          type='text'
          onChange={(e)=>{
            setApellido(e.target.value)
          }}
      />
      </div>
      <div className={username.length<1 || !validUser?styles.InputInvalid: styles.InputValid}>
      <Input
          label='Usuario:'
          type='text'
          name='user'
          onChange={(e)=>{
            
            dispatch(validateUser(e.target.value))
            setUsuario(e.target.value)
          }}
          />
          <div>{validUser?null:'Ese nombre de usuario ya existe, prueba con uno diferente'}</div>
      </div>
      <div className={password.length>0 ?styles.InputValid: styles.InputInvalid}>
      <Input
          label='Contraseña:'
          type='password'
          onChange={(e)=>{
            setContraseña(e.target.value)
          }}
        />
      </div>
      <div className={age>=18 ?styles.InputValid: styles.InputInvalid}>
      <Input
          label='Edad:'
          type='number'
          onChange={(e)=>{
            setEdad(e.target.value)
          }}
      />
      <div>{age<18 ? 'Debes ser mayor de 18 años para crear un usuario':null}</div>
      </div>
      <div className={emailRegex.test(email) ?styles.InputValid: styles.InputInvalid}>
      <Input
          label='Email:'
          type='text'
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
      />
      <p>Para crear eventos pagos, es necesario que nos facilite su credencial Acces Key de Mercado Pago</p>
      <p>Este apartado es opcional</p>
            <Input
          label='Acces Token de Mercado Pago:'
          type='text'
          onChange={(e)=>{
            setPublicKey(e.target.value)
          }}
      />
               <Input
          label='Public Key de Mercado Pago:'
          type='text'
          onChange={(e)=>{
            setAccesKey(e.target.value)
          }}
      />
      </div>
      
      <Map 
      type='user'
      places ={true}
      coords={UserCity.cityCords}
      LabelName='Ciudad'
      />

      <div >
        {name !=='' && surname !=='' && username !=='' && password !=='' && age !=='' && email !=='' && UserCity.cityCords ?
        <Boton colorBtn='btn_azul'
        
        onClick={ (e)=>{
          
          e.preventDefault()
          let register= {
            username,
            password,
            publicKey,
            accesKey,
            profile: {
              name,
              surname,
              age,
              email,
              city:UserCity,
            },
          }
          dispatch(registerUser(register))
          dispatch(changeUserCity({}))
          navigate('/login')
          console.log(register);
        }}
        >
          Crear Usuario
          </Boton>
        :null}
        
      </div>
    </form>
    </div>
  )
}