import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function validatorInput (input){
    let errores = {};
    if(!input.name){
        errores.name = 'Defina su primer nombre'
    } else if (!input.surname){
        errores.surname = 'Defina su/s apellido/s'
    } else if(!input.username){
        errores.username = 'Debe colocar un nombre de usuario'
    }else if (!input.password){
        errores.password = 'Debe colocar una contraseña'
    }else if (!input.age){
        errores.age = 'Defina su edad'
    } else if (!input.email){
        errores.email = 'Debe colocar un email de contacto'
    } else if (!input.city){
        errores.city = 'La ciudad nos servirá para mostrarle eventos cercanos'
    }

    return errores;
}

export default function Userform (){

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        username: "",
        password:"",
        name: "",
        surname: "",
        age: 0,
        email:"",
        city:""
    });

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrores(validatorInput({
            ...input,
            [e.target.name]: e.target.value,
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        if(!input.name ||
            !input.surname ||
            !input.username||
            !input.password ||
            !input.age ||
            !input.email){
                alert('Todos los campos deben ser completados correctamente')
            } else {
                //dispatch(nombre de la acción(input));
                alert('Usuario creado, Bienvenido a Eventy')
                setInput({
                    username: "",
                    password:"",
                    name: "",
                    surname: "",
                    age: 0,
                    email:"",
                    city:""
                });
            }
    }

    const [errores, setErrores] =useState({});

    return (
     <div>
           <Link to = '/'>
                <button className = 'botonback'>
                    Volver al Home
                </button>
            </Link>
        <h1>Crear nuevo Usuario</h1> 
        <form>
        <div>
            <label>Nombre:</label>
            <input
            type = 'text'
            value = {input.name}
            name = 'name'
            onChange= {(e) => {
                 handleChange(e);
                }}
            /> 
            {errores.name && (
            <p className = 'error'>{errores.name}</p>
            )}
        </div>
        <div className = 'input'>
            <label>Apellido:</label>
            <input
            type = 'text'
            value = {input.surname}
            name = 'surname'
            onChange= {(e) => handleChange(e)}
            />
                {errores.surname && (
                <p className = 'error'>{errores.surname}</p>
            )}
        </div>
        <div className = 'input'>
            <label>Usuario:</label>
            <input
            type = 'text'
            value = {input.username}
            name = 'username'
            onChange= {(e) => handleChange(e)}
            />
                {errores.username && (
                <p className = 'error'>{errores.username}</p>
            )}
        </div>
        <div className = 'input'>
            <label>Contraseña:</label>
            <input
            type = 'password'
            value = {input.password}
            name = 'password'
            onChange= {(e) => handleChange(e)}
            />
                {errores.password && (
                <p className = 'error'>{errores.password}</p>
            )}
            </div>
        <div className = 'input'>
            <label>Edad:</label>
            <input
            type = 'number'
            value = {input.age}
            name = 'age'
            onChange= {(e) => handleChange(e)}
            />
                {errores.age && (
                <p className = 'error'>{errores.age}</p>
            )}
        </div>
        <div className = 'input'>
            <label>Email:</label>
            <input
            type = 'text'
            value = {input.email}
            name = 'email'
            onChange= {(e) => handleChange(e)}
            />
                {errores.email && (
                <p className = 'error'>{errores.email}</p>
            )}
        </div>
        <div className = 'input'>
            <label>Ciudad:</label>
            <input
            type = 'text'
            value = {input.city}
            name = 'city'
            onChange= {(e) => handleChange(e)}
            />
                {errores.city && (
                <p className = 'error'>{errores.city}</p>
            )}
        </div>
        <div className = 'divcrear'>
                    <button className = 'crear' onClick = {(e) => handleSubmit(e)}>Crear Usuario</button>
                </div>
        </form>
     </div>
    )
}