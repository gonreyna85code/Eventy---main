import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Boton from "../../components/Boton/Boton";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Container from '../../components/Container/Container'
import styles from "../CrearEventos/CrearEventos.module.css";
import { putEvent, getUser, getEvent, changeEventCity } from "../../redux/actions";
import Map from "../../components/Maps/Map";
import Warning from "../../components/Warning.js/Warning";



const EventEditor = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  
  const{name} = useParams();
  console.log(name)
  useEffect(()=>{ 
    dispatch(getEvent(name)); 
  }, [dispatch, name]);
  
  

   
  const categories = [{value:"sports",name:"Deportes"},{value:"social",name:"Social"}]
  const subcategories=[
    {herencia:"sports",option:[{value:"Maraton"}, {value:"Aeromodelismo"}, {value:"Futbol"}, {value:"Tenis"}, {value:"Handball"}]},
    {herencia:"social",option:[{value:"Fiesta"}, {value:"Reunion"}, {value:"Protesta"}, {value:"Concierto"}]}
  ];
  const navigate = useNavigate()
  const user = useSelector((state) => state.User);
  const [credential, setCredential] = useState('')
  if(!user){
    dispatch(getUser());
  }
  console.log(user)

  function modificarEvento(e){
    let event={
      category,
      date,
      event_pay,
      location:EventCity,
      name:eventName,
      subcategory: subCategory,
      user:user?._id,
      info:{
        imagen:imgUrl,
        description,
        ticketPrice:ticketPrice?ticketPrice:'El evento no vende entradas',
        credential: credential,
      }
    }
    e.preventDefault()
    dispatch(putEvent(event,name));
    dispatch(changeEventCity({}))
    console.log(event);
    alert('Evento editado con exito')
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
      {user&& user.password==='' ? navigate('/completarPerfil'):null }
      <div className={styles.header}>
        <h1>Editar evento {name}</h1>
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
              <p>Es necesario que aporte su Public Key de Mercado Pago para que los pagos se depositen en su cuenta.</p>
              <p>Esta información no será revelada de ninguna forma a otros usuarios o terceros.</p>
              <p>Para obtener su Public Key realice lo siguiente:</p>
              <p>1. Acceda a su cuenta de Mercado Pago a través de mercadopago.com.ar</p>
              <p>2. En el menú a la izquierda, seleccione la pestaña 'Tu negocio' y luego 'Configuración'</p>
              <p>3. En el apartado 'Gestión y administración' acceda a sus 'Credenciales'</p>
              <p>4. Finalmente acceda a 'Credenciales de producción' y allí encontrará su 'Public Key'</p>
              <p></p>
              <p>Actualmente solo tenemos esta opción de pasarela de pagos, pero estamos trabajando para ofrecerle otras alternativas.</p>
              <Input
                label="Public Key"
                type="text"
                name="credential"
                onChange={e=>setCredential(e.target.value)}
              />
            </div>
            :
            <p>Marque la casilla si se venden entradas para su evento. De lo contrario, precione 'Editar Evento'</p>
          }
          </div>
          {date && EventCity.cityCords && category && category!== '1' && subCategory && subCategory !== '1' && imgUrl && eventName && description
            ?<Boton onClick={modificarEvento} colorBtn="btn_azul">Editar Evento</Boton>
            :null
          }
          
        </form>
      </Container>
    </div>
  )
};

export default EventEditor;
