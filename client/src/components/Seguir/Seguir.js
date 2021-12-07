import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../../redux/actions";
import Boton from "../Boton/Boton";

export default function Seguir({ouser}){
    var user=useSelector(state=>state.User);
    const dispatch=useDispatch();
    const [params,setParams]=useState('Seguir');

    useEffect(()=>{
        if(Object.keys(user).length !== 0){
            if(user.follows.includes(ouser.id)){
                setParams('Dejar de seguir');
            }
        }
    },[params,user,ouser]);

    function handleClick(e){
        if(e.target.textContent==='Seguir'){
            dispatch(follow(user.username,ouser.id))
            setParams('Dejar de seguir');
        }else{
            setParams('Seguir');
            dispatch(unfollow(user.username,ouser.id));
        }
    }

    return (
        <Boton colorBtn='btn_azul' children={params} onClick={handleClick}/>
    )

}