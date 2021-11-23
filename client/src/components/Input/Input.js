import './Input.css'

const Input = ({ label, ...rest }) =>{
    return (

        <div className="item-input">
        
            <label>{label}</label>
            <input {...rest}/>

        </div>
       
    )
}


export default Input;