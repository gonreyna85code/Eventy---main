/**
    Ejemplo de uso:
        <Boton colorBtn='btn_azul'>Test Boton</Boton>

    Posibles colores:
        btn_azul
        btn_naranja
 */
import styles from './Boton.module.css';

const Boton = ({colorBtn, children, onClick, id}) =>{
    return (
        <button className={`${styles.btn} ${styles[colorBtn]}`} onClick={onClick} id={id}>
            {children}
        </button>
    );
}

export default Boton;