/**
    Ejemplo de uso:
        <Boton colorBtn='azul'>Test Boton</Boton>

    Posibles colores:
        azul
        naranja
 */
import './Boton.css';
const Boton = ({colorBtn, children}) =>{
 return(
     <button className={`btn btn-${colorBtn}`}>
        {children}
     </button>
 );
}

export default Boton;