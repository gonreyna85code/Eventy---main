import React from "react";
import { Link } from "react-router-dom";
import './CardEvent.css'

export default function Card({name, id, location, date, img}){
    return(
        <div className = 'contenedor' key = {name}>
            <Link to = {'/detailEvent/' + name}>
            <img className = 'imagen' src = {img} alt = "img not found" />
            </Link>
            <div>
            <Link to = {'/detailEvent/' + name} className = 'nameCard'> 
            <h3>{name}</h3>
            </Link>
            </div>
            <div>
            <h4 className = 'locationCard'>{location}</h4>
            </div>
            <div>
            <h5 className = 'dateCard'>{date}</h5>
            </div>
        </div>
    )
}