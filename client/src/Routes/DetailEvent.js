import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvent } from "../redux/actions";

export default function DetailEvet(){
    
    const{name} = useParams();
    console.log(name)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getEvent(name)); 
    }, [dispatch]);

    const theEvent = useSelector((state) => state.Event);

    console.log(theEvent);

    return(
       <div>
           {
               theEvent?
               <div>
                   <h1>{theEvent.name}</h1>
               </div>
               :
               <h1>Cargando... </h1>
           }
           <Link to ='/homeuser'>
               <button> Volver al Home </button>
           </Link>
       </div>
    )
}