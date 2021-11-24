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