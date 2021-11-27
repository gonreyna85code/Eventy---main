import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Boton from "../../components/Boton/Boton";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import styles from "./CrearEventos.module.css";
import { postEvent, getUser } from "../../redux/actions";

const CrearEventos = () => {
  const categories = [{value:"sports",name:"Deportes"},{value:"social",name:"Social"}]
  const subcategories=[
    {herencia:"sports",option:[{value:"Maraton"}, {value:"Aeromodelismo"}, {value:"Futbol"}, {value:"Tenis"}, {value:"Handball"}]},
    {herencia:"social",option:[{value:"Fiesta"}, {value:"Reunion"}, {value:"Protesta"}, {value:"Concierto"}]}
  ];
  const user = useSelector((state) => state.User);
  const dispatch = useDispatch();
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
        <Select name="category" onchange={handleChange} default_value="1" default_name='Categoria' options={categories}/>
        <br />
        {event.category === 'social' || event.category === 'sports' ? <Select type="a" name="subcategory" onchange={handleChange} default_value="1" default_name='Sub-Categoria' herencia={event.category} options={subcategories}/> : null}
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
        </div>

        <Boton colorBtn="btn_azul">Crear Evento</Boton>
      </form>
    </div>
  );
};

export default CrearEventos;
