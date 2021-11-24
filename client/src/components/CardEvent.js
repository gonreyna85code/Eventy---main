import React from "react";
import { Link } from "react-router-dom";
import './CardEvent.css'

export default function Card({name, id, location, date, img}){
    return(
        <div className = 'contenedor' key = {name}>
            <Link to = {'/events/' + id}>
            <img className = 'imagen' src = {img} alt = "img not found" />
            </Link>
            <div>
            <Link to = {'/events/' + id} className = 'nameCard'> 
            <h1>{name}</h1>
            </Link>
            <h4 className = 'locationCard'>{location}</h4>
            <h5 className = 'dateCard'>{date}</h5>
            </div>
        </div>
    )
}