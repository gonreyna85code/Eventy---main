import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Input/Input';
import NavBar from '../NavBar/NavBar';
import Initial from '../Profile/Initial';
import { putUser } from '../../redux/actions';

export default function Setting(){
    const user = useSelector(state => state.User);
    const dispatch=useDispatch();

    const [profile,setProfile]=useState({
        name:user.profile.name,
        surname: user.profile.surname,
        age: user.profile.age,
        email: user.profile.email,
        city: user.profile.city,
        photo:'',
        portada:'',
        gender:'',
    });

    function handleChange(e){
        setProfile({
            ...profile,
            [e.target.name]:e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(putUser(profile))
    }

    return (
        <>
        <NavBar />
        <div>
            <Initial user={user}/>

            <form onSubmit={handleSubmit}>
                <Input label='Name' type='text' name='name' value={profile.name} onChange={handleChange} />
                <Input label='Surname' type='text' name='surname' value={profile.surname} onChange={handleChange} />
                <Input label='Age' type='number' name='age' value={profile.age} onChange={handleChange} />
                <Input label='Email' type='text' name='email' value={profile.email} onChange={handleChange} />
                <Input label='City' type='text' name='city' value={profile.city} onChange={handleChange} />
                <Input label='Link foto portada' type='portada' name='surname' value={profile.portada} onChange={handleChange} />
                <Input label='Link foto de perfil' type='link' name='photo' value={profile.photo} onChange={handleChange} />
                <Input label='Submit' type='submit' name='submit' value='Submit' />
            </form>
        </div>
        </>
    )
}