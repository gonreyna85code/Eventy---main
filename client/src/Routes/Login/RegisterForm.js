import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserCity, registerUser } from "../../redux/actions";
import Input from "../../components/Input/Input";
import Boton from "../../components/Boton/Boton";
import { useNavigate } from 'react-router';
import Map from "../../components/Maps/Map";
import styles from './RegisterForm.module.css'

export default function RegisterForm(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[name, setNombre]=useState('')
  const[surname, setApellido]=useState('')
  const[username, setUsuario]=useState('')
  const[password, setContraseña]=useState('')
  const[age, setEdad]=useState('')
  const[email, setEmail]=useState('')

  const UserCity = useSelector(state=> state.UserCity)
 
 

  
  
  
  

  return(
  <div className={styles.container}>
    <h1>Crear nuevo Usuario</h1>
    <form>
      <div>
          <Input
            label='Nombre:'
            type='text'
            onChange={(e)=>{
              setNombre(e.target.value)
            }}
          />
      </div>
      <div className={styles.Input}>
      <Input
          label='Apellido:'
          type='text'
          onChange={(e)=>{
            setApellido(e.target.value)
          }}
      />
      </div>
      <div className={styles.Input}>
      <Input
          label='Usuario:'
          type='text'
          name='user'
          onChange={(e)=>{
            setUsuario(e.target.value)
          }}
      />
      </div>
      <div className={styles.Input}>
      <Input
          label='Contraseña:'
          type='password'
          onChange={(e)=>{
            setContraseña(e.target.value)
          }}
        />
      </div>
      <div className={styles.Input}>
      <Input
          label='Edad:'
          type='number'
          onChange={(e)=>{
            setEdad(e.target.value)
          }}
      />
      </div>
      <div className={styles.Input}>
      <Input
          label='Email:'
          type='text'
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
      />
      </div>
      
      <Map 
      type='user'
      places ={true}
      coords={UserCity.cityCords}
      LabelName='Ciudad'
      />

      <div className ={styles.hola}>
        {name !=='' && surname !=='' && username !=='' && password !=='' && age !=='' && email !=='' && UserCity.cityCords ?
        <Boton colorBtn='btn_azul'
        
        onClick={(e)=>{
          e.preventDefault()
          let register= {
            username,
            password,
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
        // {...console.log(UserCity)}
        >
          Crear Usuario
          </Boton>
        :null}
        
      </div>
    </form>
    </div>
  )
}