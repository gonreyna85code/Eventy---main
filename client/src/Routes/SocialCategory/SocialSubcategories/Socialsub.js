import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Boton from "../../../components/Boton/Boton";
import { findEventSub } from "../../../redux/actions";

export default function SubCategory(){

    const {subcategory} = useParams();
    console.log(subcategory);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(findEventSub(subcategory)); 
    }, [dispatch, subcategory]);

    const eventos = useSelector((state) => state.Event);

    return(
        <div>
            <h1>{subcategory}</h1>
        </div>
    )
}