import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Input/Input';
import Boton from '../../components/Boton/Boton';
import Select from '../../components/Select/Select';
import Warning from '../../components/Warning.js/Warning';
import Initial from '../Profile/Initial';
import { putUser, getUser, allUnsuscription } from '../../redux/actions';
import styles from './Setting.module.css';
import Container from '../../components/Container/Container';
import { useNavigate } from 'react-router-dom';

export default function Setting(){
    const user = useSelector(state => state.User);
    const dispatch=useDispatch();
    const navigate = useNavigate()
    const [profile,setProfile]=useState({
        name:user.profile?.name,
        surname: user.profile?.surname,
        age: user.profile?.age,
        email: user.profile?.email,
        city: user.profile?.city,
        photo:user.profile?.photo?user.profile?.photo:'',
        portada:user.profile?.portada?user.profile?.portada:'',
        gender:user.profile?.gender?user.profile?.gender:'',
    });

    const [key, setKey] = useState(user.publicKey ? user.publicKey : "");
    console.log(key);

    var gender=[{value:'Mujer',name:'Mujer'},{value:'Hombre',name:'Hombre'},{value:'No binario',name:'No binario'}]

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        setProfile({
            name:user.profile?.name,
            surname: user.profile?.surname,
            age: user.profile?.age,
            email: user.profile?.email,
            city: user.profile?.city?.cityName,
            photo:user.profile?.photo?user.profile?.photo:'',
            portada:user.profile?.portada?user.profile?.portada:'',
            gender:user.profile?.gender?user.profile?.gender:'',
        })
    },[user])

    function handleClick(e){
        e.preventDefault();
        dispatch(allUnsuscription(user.username));
    }

    function handleChange(e){
        setProfile({
            ...profile,
            [e.target.name]:e.target.value
        })
    }

    function handleKey(e){
        setKey(e.target.value);
        console.log(key);
    };

    function handleSubmit(e){
        e.preventDefault()
        dispatch(putUser({profile:profile,username:user.username}, key))//acá va el acces token
    }

    if(user==="Usuario no logueado"){
        return (
            <Warning />
        )
    }

    return (
        <>
        {user&& user.password==='' ? navigate('/completarPerfil'):null }
            <div className={styles.setting} >
                <Initial user={user}/>
                <h1>Configuración</h1>
                <Container>
                    <form className={styles.form}>
                        <Input label='Name' type='text' name='name' value={profile.name} onChange={handleChange} />
                        <Input label='Surname' type='text' name='surname' value={profile.surname} onChange={handleChange} />
                        <Input label='Age' type='number' name='age' value={profile.age} onChange={handleChange} />
                        <Input label='Email' type='text' name='email' value={profile.email} onChange={handleChange} />
                        <Input label='City' type='text' name='city' value={profile.city} onChange={handleChange} />
                        <Input label='Link foto portada' type='portada' name='surname' value={profile.portada} onChange={handleChange} />
                        <Input label='Link foto de perfil' type='link' name='photo' value={profile.photo} onChange={handleChange} />
                        <Select name='gender' onchange={handleChange} default_value={1} default_name='Genero' options={gender}/><br/>
                        <Input label='Acces Token de Mercado Pago' type='text' name='key' value={key} onChange={handleKey} />
                        <Boton colorBtn='btn_azul' children='Cancelar todas las suscripciones' onClick={handleClick} /><br/>
                        <Boton colorBtn='btn_naranja' children='Guardar' onClick={handleSubmit} />
                    </form>
                </Container>
            </div>
        </>
    )
}