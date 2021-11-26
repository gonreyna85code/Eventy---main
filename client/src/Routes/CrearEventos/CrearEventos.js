import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Boton from "../../components/Boton/Boton";
import Input from "../../components/Input/Input";
import styles from "./CrearEventos.module.css";
import { postEvent, getUser } from "../../redux/actions";

<<<<<<< HEAD

const CrearEventos = () =>{
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
      }, [dispatch]);
    
    const user = useSelector((state) => state.User);

    const userID = user.id;
    console.log('tita')
    console.log(userID)

    const eventInicialState = {
        name:'',
        location: '',
        info: {},
        event_pay: false,
        date: '',
        user: userID,
        category:'',
        subcategory:''
      }

    const [event, setEvent] = useState(eventInicialState);
    
    console.log('hola')
    console.log(event);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postEvent(event));
        console.log(event);
        alert('El evento se creó exitosamente');
        setEvent(eventInicialState);
    }

    const handleChange = (e) => {

        let valueEvent = e.target.name === 'description' || e.target.name === 'imagen' ? { ...event, info: {...event.info, [e.target.name]: e.target.value} } : { ...event,[e.target.name] : e.target.value }
        setEvent(valueEvent);
        console.log(event)

    } 

  

    return(
        <div className='cont-center'>
            <h1>Crear un Nuevo Evento</h1>

            <form onSubmit={ (e)=> handleSubmit(e) }>

                <Input
                    label='Nombre del Evento'
                    type='text'
                    name='name'
                    onChange={handleChange}
                />
                <Input
                    label='Ciudad'
                    type='text'
                    name='location'
                    onChange={handleChange}
                />
                <Input
                    label='Fecha'
                    type='date'
                    name='date'
                    onChange={handleChange}
                />
                <Input
                    label='Imagen del Evento (url)'
                    type='url'
                    name='imagen'
                    onChange={handleChange}
                />
                 <Input
                    label='Categoría'
                    type='text'
                    name='category'
                    onChange={handleChange}
                />
                 <Input
                    label='Subcategoría (Hobby)'
                    type='text'
                    name='subcategory'
                    onChange={handleChange}
                />
                <div className={styles.item_textarea}>
                    <label>Descripción del evento</label>
                    <textarea 
                        name='description'
                        rows='4'
                        onChange={handleChange}
                    ></textarea>
                </div>

                <Boton onClick = {(e)=> handleSubmit(e)} colorBtn='btn_azul'>Crear Evento</Boton>

            </form>

=======
const CrearEventos = () => {
  const sports = ["Maraton", "Aeromodelismo", "Futbol", "Tenis", "Handball"];
  const socials = ["Fiesta", "Reunion", "Protesta"];
  const user = useSelector((state) => state.User);
  console.log(user);
  const eventInicialState = {
    name: "",
    location: "",
    info: {},
    event_pay: false,
    date: "",
    user: user?.id,
    category: "",
    subcategory: "",
  };

  const dispatch = useDispatch();
  const [event, setEvent] = useState(eventInicialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postEvent(event));
    console.log(event);
    alert("El evento se creó exitosamente");
    setEvent(eventInicialState);
  };

  const handleChange = (e) => {
    let valueEvent =
      e.target.name === "description" || e.target.name === "imagen"
        ? { ...event, info: { ...event.info, [e.target.name]: e.target.value } }
        : { ...event, [e.target.name]: e.target.value, user: user._id };
    setEvent(valueEvent);
    console.log(event);
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div className="cont-center">
      <h1>Crear un Nuevo Evento</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          label="Nombre del Evento"
          type="text"
          name="name"
          onChange={handleChange}
        />
        <Input
          label="Ciudad"
          type="text"
          name="location"
          onChange={handleChange}
        />
        <select name="category" onChange={handleChange} defaultValue="1">
          <option value="1" disabled>
            Categoria
          </option>
          <option value="sports">Deportes</option>
          <option value="social">Social</option>
        </select>
        <br />
        <select name="subcategory" onChange={handleChange} defaultValue="1">
          <option value="1" disabled>
            Sub-Categoria
          </option>
          {event.category === "social"
            ? socials.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))
            : event.category === "sports"
            ? sports.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))
            : null}
        </select>
        <Input label="Fecha" type="date" name="date" onChange={handleChange} />
        <Input
          label="Imagen del Evento (url)"
          type="url"
          name="imagen"
          onChange={handleChange}
        />
        <div className={styles.item_textarea}>
          <label>Descripción del evento</label>
          <textarea
            name="description"
            rows="4"
            onChange={handleChange}
          ></textarea>
>>>>>>> 2640cf2020a72d95d25a063e625ed589e0d24934
        </div>

        <Boton colorBtn="btn_azul">Crear Evento</Boton>
      </form>
    </div>
  );
};

export default CrearEventos;
