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
  
  var{name} = useParams();
  
  useEffect(()=>{ 
    dispatch(getEvent(name)); 
  }, [dispatch, name]);
  
  const EventCity = useSelector(state=> state.EventCity)

   
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
  console.log(Object.entries(EventCity).length)

  const event = useSelector((state) => state.Event);
  if (Object.entries(EventCity).length === 0){
    var loc = event[0]?.location
  } else {
    loc = EventCity
  }
  console.log(EventCity)
  function modificarEvento(e){
    
    e.preventDefault()
    let event={
      category,
      date,
      event_pay,
      location: loc,
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
   if(Object.entries(EventCity).length === 0) {
     dispatch(putEvent(event,name));
    console.log(event);
    alert('Evento editado con exito')
    setTimeout(function () {            
      navigate(`/detailEvent/${eventName}`)    
      window.location.reload();        
  }, 2000);}else{
    dispatch(putEvent(event,name));
    dispatch(changeEventCity({}))
    console.log(event);
    alert('Evento editado con exito')
    setTimeout(function () {            
      navigate(`/detailEvent/${eventName}`)    
      window.location.reload();        
  }, 2000)
  }
  }

  const yesterday = new Date(new Date().setDate(new Date().getDate()));
  const year = yesterday.getFullYear();
  var month = yesterday.getMonth() +1 ;
  var day = yesterday.getDate()
  if(day.valueOf() < 10){
    day = "0" + day
    var fecha = (year + "-" + month + "-" +  day);    
  } 
  if(month.valueOf() < 10){
    month = "0" + month
     fecha = (year + "-" + month + "-" +  day);
  } else {
     fecha = (year + "-" + month + "-" +  day);
  }
  const dia = event[0]?.date.toString().substring(0,2)
  const mes = event[0]?.date.toString().substring(3,5)
  const anio = event[0]?.date.toString().substring(6,10)
  const DATE =  anio + "-" + mes + "-" +  dia;
  
  
  const[eventName, setEventName]= useState(event[0]?.name)
  const[category, setCategory] = useState(event[0]?.category)
  const [subCategory, setSubCategory] = useState(event[0]?.subcategory)
  const[date, setDate]= useState(DATE)
  const [imgUrl, setImgUrl]= useState(event[0]?.info?.imagen)
  const[description, setDescription] = useState(event[0]?.info?.description)
  const [event_pay, setEventPay]= useState(false)
  const [ticketPrice, setTicketPrice]=useState(0)
 
  
  
  
  
  
  if (user === 'Usuario no logueado') {
    return(<Warning/>)
  }
  return (
    <div className={styles.cont_crear_evento}>
      {user&& user?.password==='' ? navigate('/completarPerfil'):null }
      <div className={styles.header}>
        <h1>Editar evento {name}</h1>
      </div>
      <Container>
        <form className={styles.form} >
          <Input
            label="Nombre del Evento"
            type="text"
            name="name"
            defaultValue={event[0]?.name}
            onChange={e=>setEventName(e.target.value)}
            />
          <Map
          type ='event'
          places={true}
          defaultValue={event[0]?.location?.cityCords}
          coords={event[0]?.location?.cityCords}
          LabelName='Direccion'
          />
          <Select
            name="category"
            onchange={e=>setCategory(e.target.value)}
            default_name={event[0]?.category}
            options={categories}  
          />
          
            <Select
              type="a"
              name="subcategory"
              onchange={e=>setSubCategory(e.target.value)}
              default_name={event[0]?.subcategory}
              herencia={category} options={subcategories}/>
          
          <Input
            label="Fecha"          
            type="date"
            value={date}
            min={fecha}
            name="date"
            onChange={e=> setDate(e.target.value)}
          />
          <Input
            label="Imagen del Evento (url)"
            type="url"
            name="imagen"
            defaultValue={event[0]?.info?.imagen}
            onChange={e=>setImgUrl(e.target.value)}
          />
          <div className={styles.item_textarea}>
            <label>Descripción del evento</label>
            <textarea
              name="description"
              rows="4"
              defaultValue={event[0]?.info?.description}
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
                defaultValue={event[0]?.info?.credential}
                onChange={e=>setCredential(e.target.value)}
              />
            </div>
            :
            <p>Marque la casilla si se venden entradas para su evento. De lo contrario, precione 'Editar Evento'</p>
          }
          </div>
           
            <Boton onClick={(e) => modificarEvento(e)} colorBtn="btn_azul">Editar Evento</Boton>
            
          
          
        </form>
      </Container>
    </div>
  )
};

export default EventEditor;
