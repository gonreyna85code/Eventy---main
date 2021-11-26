import React from "react";
//import Boton from "../Boton/Boton"
import { useDispatch } from "react-redux";
import { findEvent } from "../../redux/actions";
import style from './SearchBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';


export default function SearchBar (){
    const [state, setState] = React.useState(""); 
    const dispatch = useDispatch();

    function search(event){
        event.preventDefault();
        dispatch(findEvent(state))
        setState("")
    }

    return (
        <div className={style.container}>
            <input className={style.input}value = {state}  onChange={event => setState(event.target.value)}/>
            <button className={style.boton} onClick={search}><FontAwesomeIcon icon={faSearch}/></button>
        </div>
    )
}

