import React from "react";
import { useSelector } from "react-redux";
import Card from "../../components/CardEvent/CardEvent";
import Loading from '../../components/Loading/Loading'

export default function Resultado(){
    const resultado = useSelector(state => state.SearchResult)

    return (
        <div>
            {resultado.data === "Evento no encontrado" ? <h1>No se encontraron eventos</h1> : resultado.data && resultado.data.length !== 0? <div>
                {resultado.data.map(el => {return  <Card key={el.name} img = {el.info.imagen} name = {el.name} location = {el.location.cityName} date = {el.date} id = {el.id} buttonColor='naranja'/>})}
            </div> :  <Loading/>}
        </div>
    )
}