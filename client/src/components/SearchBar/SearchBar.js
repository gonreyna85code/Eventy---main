import React from "react";
import Boton from "../Boton/Boton"
import { useDispatch } from "react-redux";
import { findEvent } from "../../redux/actions";


export default function SearchBar (){
    const [state, setState] = React.useState(""); 
    const dispatch = useDispatch();

    function search(event){
        event.preventDefault();
        dispatch(findEvent(state))
    }

    return (
        <div>
            <input value = {state} placeholder="Busqueda" onChange={event => setState(event.target.value)}/>
            <Boton colorBtn="btn_naranja" onClick={search}>Buscar</Boton>
        </div>
    )
}

