import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions";
import Input from "../Input/Input";
import Boton from "../Boton/Boton";



export default function RegisterForm(){
  const dispatch = useDispatch()
  
  const[name, setNombre]=useState('')
  const[surname, setApellido]=useState('')
  const[username, setUsuario]=useState('')
  const[password, setContraseña]=useState('')
  const[age, setEdad]=useState('')
  const[email, setEmail]=useState('')
  const[city, setCiudad]=useState('')
  const[profile, setProfile]=useState('')
  const[Complete, setComplete] = useState(false)
  
  
  
  function logUsuario() {
    setProfile(
      {
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
    );
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
        {}
      <Boton colorBtn='btn_azul'
      onClick={()=>{
        let register = {
          username: "acalvelo",
          password: "hotwheeels",
          profile: {
            name: "Alfredo",
            surname: "Calvelo",
            age: 21,
            email: "alfredocalvelo1@gmail.com",
            city: "Buenos Aires",
          }
        }
        dispatch(registerUser(register))
      }} 
      >
        Crear Usuario
        </Boton>
        
      </div>
    </form>
    </div>
  )
}