import React from "react";
import Boton from "../Boton/Boton"


export function searchBar (){
    const [state, setState] = React.useState(""); 

    function search(){}
    return (
        <div>
            <input value = {state} placeholder="Busqueda" onChange={setState(value)}/>
            <Boton colorBtn="btn_naranja" onClick={search}>Buscar</Boton>
        </div>
    )
}