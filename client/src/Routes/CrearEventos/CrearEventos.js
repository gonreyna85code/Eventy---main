import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Boton from "../../components/Boton/Boton";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Container from '../../components/Container/Container'
import styles from "./CrearEventos.module.css";
import { postEvent, getUser } from "../../redux/actions";
import Map from "../../components/Maps/Map";
import Warning from "../../components/Warning.js/Warning";



const CrearEventos = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const categories = [{value:"sports",name:"Deportes"},{value:"social",name:"Social"}]
  const subcategories=[
    {herencia:"sports",option:[{value:"Maraton"}, {value:"Aeromodelismo"}, {value:"Futbol"}, {value:"Tenis"}, {value:"Handball"}]},
    {herencia:"social",option:[{value:"Fiesta"}, {value:"Reunion"}, {value:"Protesta"}, {value:"Concierto"}]}
  ];
  const user = useSelector((state) => state.User);
  if(!user){
    dispatch(getUser());
  }


  

  function crearEvento(e){
    let event={
      category,
      date,
      event_pay,
      ticketPrice:ticketPrice?ticketPrice:'El evento no vende entradas',
      location:EventCity,
      name:eventName,
      subcategory: subCategory,
      user:user?._id,
      info:{
        imagen:imgUrl,
        description
      }
    }
    e.preventDefault()
    dispatch(postEvent(event));
    console.log(event);
    alert('Evento creado con exito')
  }
  const EventCity = useSelector(state=> state.EventCity)
  const[eventName, setEventName]= useState('')
  const[category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const[date, setDate]= useState('')
  const [imgUrl, setImgUrl]= useState('')
  const[description, setDescription] = useState('')
  const [event_pay, setEventPay]= useState(false)
  const [ticketPrice, setTicketPrice]=useState(0)
  
  if (user === 'Usuario no logueado') {
    return(<Warning/>)
  }
  
  return (
    <div className={styles.cont_crear_evento}>
      <div className={styles.header}>
        <h1>Crear un Nuevo Evento</h1>
      </div>
      <Container>
        <form className={styles.form} >
          <Input
            label="Nombre del Evento"
            type="text"
            name="name"
            onChange={e=>setEventName(e.target.value)}
            />
          <Map
          type ='event'
          places={true}
          coords={EventCity.cityCords}
          LabelName='Direccion'
          />
          <Select
            name="category"
            onchange={e=>setCategory(e.target.value)}
            default_value="1"
            default_name='Selecciona una Categoría'
            options={categories}  
          />
          {category === 'social' || category === 'sports' ?
            <Select
              type="a"
              name="subcategory"
              onchange={e=>setSubCategory(e.target.value)}
              default_value="1"
              default_name='Selecciona una Subcategoría'
              herencia={category} options={subcategories}/> : null}
          
          <Input
            label="Fecha"
            type="date"
            name="date"
            onChange={e=> setDate(e.target.value)}
          />
          <Input
            label="Imagen del Evento (url)"
            type="url"
            name="imagen"
            onChange={e=>setImgUrl(e.target.value)}
          />
          <div className={styles.item_textarea}>
            <label>Descripción del evento</label>
            <textarea
              name="description"
              rows="4"
              onChange={e=>setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
          <label>
                    <input
                    type = 'checkbox'
                    name = 'event_pay'
                    onChange = {(e)=> setEventPay(e.target.checked)}
                    />
                    ¿Es un evento pago?
          </label>
          {
            event_pay === true ?
            <div>
              <Input
            label="Precio de las entradas"
            type="text"
            name="fee"
            onChange={e=>setTicketPrice(e.target.value)}
          />
            </div>
            :
            <p>Marque la casilla si se venden entradas para su evento. De lo contrario, precione 'Crear Evento'</p>
          }
          </div>
          {date && EventCity.cityCords && category && category!== '1' && subCategory && subCategory !== '1' && imgUrl && eventName && description
            ?<Boton onClick={crearEvento} colorBtn="btn_azul">Crear Evento</Boton>
            :null
          }
          
        </form>
      </Container>
    </div>
  )
}

export default CrearEventos;
