/**
    Ejemplo de uso:
        <Boton colorBtn='azul'>Test Boton</Boton>

    Posibles colores:
        btn_azul
        btn_naranja
 */
import styles from './Boton.module.css';

const Boton = ({colorBtn, children, onClick}) =>{
    
    
 return(
     <button className={`${styles.btn} ${styles[colorBtn]}`} onClick={onClick}>
        {children}
     </button>
 );
}

export default Boton;