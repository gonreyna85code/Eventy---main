/**
    Ejemplo de uso:
        <Boton colorBtn='azul'>Test Boton</Boton>

    Posibles colores:
        azul
        naranja
 */
import styles from './Boton.module.css';
import React, {useEffect, useState}from 'react';



const Boton = ({colorBtn, children}) =>{
    
    let [color, setColor] = useState(null)
    useEffect(()=>{
        setColor(`btn_${colorBtn}`)
    })
 return(
     <button className={`${styles.btn} ${styles[color]}`}>
        {children}
     </button>
 );
}

export default Boton;