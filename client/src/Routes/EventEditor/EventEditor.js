import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Boton from "../../components/Boton/Boton";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Container from '../../components/Container/Container'
import styles from "../CrearEventos/CrearEventos.module.css";
import { putEvent, getUser, getEvent } from "../../redux/actions";


const EventEditor = () => {

    const{name} = useParams();
    console.log(name)

   
  const categories = [{value:"sports",name:"Deportes"},{value:"social",name:"Social"}]
  const subcategories=[
    {herencia:"sports",option:[{value:"Maraton"}, {value:"Aeromodelismo"}, {value:"Futbol"}, {value:"Tenis"}, {value:"Handball"}]},
    {herencia:"social",option:[{value:"Fiesta"}, {value:"Reunion"}, {value:"Protesta"}, {value:"Concierto"}]}
  ];
  const user = useSelector((state) => state.User);
  const dispatch = useDispatch();

  useEffect(()=>{ 
    dispatch(getEvent(name)); 
}, [dispatch, name]);
const evento = useSelector ((state)=> state.Event);

  if(!user){
    dispatch(getUser());
  }
  console.log(user)
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

  
  const [event, setEvent] = useState(eventInicialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(putEvent(event, name));
    console.log(event);
    alert("El evento se editó exitosamente");
    setEvent(eventInicialState);
  };

  const handleChange = (e) => {
    let valueEvent =
      e.target.name === "description" || e.target.name === "imagen"|| e.target.name === 'fee'
        ? { ...event, info: { ...event.info, [e.target.name]: e.target.value } }
        : { ...event, [e.target.name]: e.target.value, user: user._id };
    setEvent(valueEvent);
    console.log(event);
  };

  function handleCheck (e){
    //e.preventDefault();
    let boolean = event.event_pay;
    if(boolean === false){
      boolean = true
    } else if (boolean === true){
      boolean = false
    };
    setEvent({
      ...event,
      event_pay: boolean
    });
    console.log(event)
  }

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.cont_crear_evento}>
      <div className={styles.header}>
        <h1>Editar Evento: {name}</h1>
      </div>
      <Container>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
          <Select
            name="category"
            onchange={handleChange}
            default_value="1"
            default_name='Selecciona una Categoría'
            options={categories}  
          />
          {event.category === 'social' || event.category === 'sports' ?
            <Select
              type="a"
              name="subcategory"
              onchange={handleChange}
              default_value="1"
              default_name='Selecciona una Subcategoría'
              herencia={event.category} options={subcategories}/> : null}
          
          <Input
            label="Fecha"
            type="date"
            name="date"
            onChange={handleChange}
          />
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
          </div>
          <div>
          <label>
                    <input
                    type = 'checkbox'
                    name = 'event_pay'
                    onChange = {(e)=> handleCheck(e)}
                    />
                    ¿Es un evento pago?
          </label>
          {
            event.event_pay === true ?
            <div>
                       <Input
            label="Precio de las entradas"
            type="text"
            name="fee"
            onChange={handleChange}
          />
            </div>
            :
            <p>Marque la casilla si se venden entradas para su evento. De lo contrario, precione 'Crear Evento'</p>
          }
          </div>

          <Boton colorBtn="btn_azul">Editar Evento</Boton>
        </form>
        <Link to = '/'>
        <Boton colorBtn="btn_azul">Volver atrás</Boton>
        </Link>
      </Container>
    </div>
  );
};

export default EventEditor;
