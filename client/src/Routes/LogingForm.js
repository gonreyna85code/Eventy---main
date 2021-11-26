import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions";
=======
import { useDispatch} from "react-redux";
import { registerUser } from "../redux/actions";
>>>>>>> 2640cf2020a72d95d25a063e625ed589e0d24934
import { login } from "../redux/actions";
import { getUser } from "../redux/actions";
import Boton from ".././components/Boton/Boton";
import Input from ".././components/Input/Input";


function validatorInput(input) {
  let errores = {};
  if (!input.profile.name) {
    errores.name = "Defina su primer nombre";
  } else if (!input.profile.surname) {
    errores.surname = "Defina su/s apellido/s";
  } else if (!input.username) {
    errores.username = "Debe colocar un nombre de usuario";
  } else if (!input.password) {
    errores.password = "Debe colocar una contraseña";
  } else if (!input.profile.age) {
    errores.age = "Defina su edad";
  } else if (!input.profile.email) {
    errores.email = "Debe colocar un email de contacto";
  } else if (!input.profile.city) {
    errores.city = "La ciudad nos servirá para mostrarle eventos cercanos";
  }

  return errores;
}

export default function Userform() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  

  const [input, setInput] = useState({
    username: "",
    password: "",
    profile: {
      name: "",
      surname: "",
      age: 0,
      email: "",
      city: "",
    },
  });

  const [register, setRegister] = useState(false);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrores(
      validatorInput({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleChangeProfile(e) {
    setInput({
      ...input,
      profile: {
        ...input.profile,
        [e.target.name]: e.target.value,
      },
    });
    setErrores(
      validatorInput({
        ...input,
        profile: {
          ...input.profile,
          [e.target.name]: e.target.value,
        },
      })
    );
    console.log(input);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    if (
      !input.profile.name ||
      !input.profile.surname ||
      !input.username ||
      !input.password ||
      !input.profile.age ||
      !input.profile.email
    ) {
      alert("Todos los campos deben ser completados correctamente");
    } else {
      dispatch(registerUser(input));
      alert("Usuario creado, Bienvenido a Eventy");
      dispatch(getUser());
      navigate('/');
      setInput({
        username: "",
        password: "",
        profile: {
          name: "",
          surname: "",
          age: 0,
          email: "",
          city: "",
        },
      });
    }
  }

  function handleEnter(e){
    e.preventDefault();
    console.log(input);
    if (
      !input.username ||
      !input.password
    ) {
      alert("Todos los campos deben ser completados correctamente");
    } else {
      dispatch(login(input));
      alert("Usuario confirmado, Bienvenido a Eventy");
      dispatch(getUser());
      navigate('/');
      setInput({
        username: "",
        password: "",
        profile: {
          name: "",
          surname: "",
          age: 0,
          email: "",
          city: "",
        },
      });
    }
  }

  function handleNotRegister(e){
    e.preventDefault();
    setRegister(true);
    console.log(register);
  }

  function form(){

    return(
    <div className='cont-center'>
      <h1>Crear nuevo Usuario</h1>
      <form>
        <div>
            <Input
              label='Nombre:'
              type='text'
              name='name'
              value = {input.name}
              onChange={(e) => handleChangeProfile(e)}
            />
          {errores.name && <p className="error">{errores.name}</p>}
        </div>
        <div className="input">
        <Input
            label='Apellido:'
            type='text'
            name='username'
            value = {input.surname}
            onChange={(e) => handleChangeProfile(e)}
        />
          {errores.surname && <p className="error">{errores.surname}</p>}
        </div>
        <div className="input">
        <Input
            label='Usuario:'
            type='text'
            name='username'
            value = {input.username}
            onChange={(e) => handleChange(e)}
        />
          {errores.username && <p className="error">{errores.username}</p>}
        </div>
        <div className="input">
        <Input
            label='Contraseña:'
            type='password'
            name='password'
            value = {input.password}
            onChange={(e) => handleChange(e)}
          />
          {errores.password && <p className="error">{errores.password}</p>}
        </div>
        <div className="input">
        <Input
            label='Edad:'
            type='number'
            name='age'
            value = {input.age}
            onChange={(e) => handleChangeProfile(e)}
        />
          {errores.age && <p className="error">{errores.age}</p>}
        </div>
        <div className="input">
        <Input
            label='Email:'
            type='text'
            name='email'
            value = {input.email}
            onChange={(e) => handleChangeProfile(e)}
        />
          {errores.email && <p className="error">{errores.email}</p>}
        </div>
        <div className="input">
        <Input
            label='Ciudad:'
            type='text'
            name='city'
            value = {input.city}
            onChange={(e) => handleChangeProfile(e)}
        />
          {errores.city && <p className="error">{errores.city}</p>}
        </div>
        <div className="divcrear">
        <Boton colorBtn='btn_azul' onClick={(e) => handleSubmit(e)}>Crear Usuario</Boton>
        </div>
      </form>
      </div>
    )
  }

  const [errores, setErrores] = useState({});

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
            name='username'
            value = {input.username}
            onChange={(e) => handleChange(e)}
        />
        {errores.username && <p className="error">{errores.username}</p>}
        </div>
        <div className="input">
          <Input
            label='Contraseña'
            type='password'
            name='password'
            value = {input.password}
            onChange={(e) => handleChange(e)}
          />
          {errores.password && <p className="error">{errores.password}</p>}
        </div>
      </form>
      <div>
      <Boton colorBtn='btn_azul' onClick={(e) => handleEnter(e)}>INGRESAR</Boton>
      </div>
      <div>
      <Boton colorBtn='btn_naranja' onClick={(e)=> handleNotRegister(e)}>Aún no estoy registrado</Boton>
      {
        register === true && form() 
      }
    </div>
    </div>
  );
}
