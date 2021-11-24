/**
 *  Ejemplo de uso del componente:
 * 
 * <Input
        label='Fecha'
        type='date'
        name='date'
        onChange={handleChange}
    />
 * 
 */

import styles from './Input.module.css'

const Input = ({ label, ...rest }) =>{
    return (

        <div className={styles.item_input}>
        
            <label>{label}</label>
            <input {...rest}/>

        </div>
       
    )
}


export default Input;