import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions";
import Input from "../Input/Input";
import Boton from "../Boton/Boton";
import { Link } from "react-router-dom";




export default function RegisterForm(){
  const dispatch = useDispatch()
  
  const[name, setNombre]=useState('')
  const[surname, setApellido]=useState('')
  const[username, setUsuario]=useState('')
  const[password, setContraseña]=useState('')
  const[age, setEdad]=useState('')
  const[email, setEmail]=useState('')
  const[city, setCiudad]=useState('')
  
  
  function hola() {
    return(
      <div>hola</div>
    )
  }
  
  

  return(
  <div className='cont-center'>
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
      <div className="input">
      <Input
          label='Apellido:'
          type='text'
          onChange={(e)=>{
            setApellido(e.target.value)
          }}
      />
      </div>
      <div className="input">
      <Input
          label='Usuario:'
          type='text'
          name='user'
          onChange={(e)=>{
            setUsuario(e.target.value)
          }}
      />
      </div>
      <div className="input">
      <Input
          label='Contraseña:'
          type='password'
          onChange={(e)=>{
            setContraseña(e.target.value)
          }}
        />
      </div>
      <div className="input">
      <Input
          label='Edad:'
          type='number'
          onChange={(e)=>{
            setEdad(e.target.value)
          }}
      />
      </div>
      <div className="input">
      <Input
          label='Email:'
          type='text'
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
      />
      </div>
      <div className="input">
      <Input
          label='Ciudad:'
          type='text'
          onChange={(e)=>{
            setCiudad(e.target.value)
          }}
      />
      </div>
      <div className="divcrear">
        {name !=='' && surname !=='' && username !=='' && password !=='' && age !=='' && email !=='' && city!=='' ?
        <Link to='/login'>
        <Boton colorBtn='btn_azul'
        onClick={()=>{
          let register= {
            username,
            password,
            profile: {
              name,
              surname,
              age,
              email,
              city,
            },
          }
          dispatch(registerUser(register))
        }}
        >
          Crear Usuario
          </Boton>

        </Link>
        
        
        :null}
        
      </div>
    </form>
    </div>
  )
}