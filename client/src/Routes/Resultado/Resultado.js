import React from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card/CardEvent";
// import Card from "../../components/CardEvent";


export default function Resultado(){
    const resultado = useSelector(state => state.SearchResult)

    return (
        <div>
            {resultado.data && resultado.data.length !== 0? <div>
                {resultado.data.map(el => {return  <Card key={el.name} img = {el.info.imagen} name = {el.name} location = {el.location} date = {el.date} id = {el.id} buttonColor='naranja'/>})}
            </div>: <h1>No se encontraron resultados para esta busqueda</h1>}
        </div>
    )
}