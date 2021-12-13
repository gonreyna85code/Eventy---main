import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Boton from "../../components/Boton/Boton";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import { getUser, postEvent, changeEventCity } from "../../redux/actions";
import Map from "../../components/Maps/Map";
import useImage from "../../hooks/useImage";
import styles from './Home.module.css'


const categories = [{value:"sports",name:"Deportes"},{value:"social",name:"Social"}]
const subcategories=[
  {herencia:"sports",option:[{value:"Maraton"}, {value:"Aeromodelismo"}, {value:"Futbol"}, {value:"Tenis"}, {value:"Handball"}]},
  {herencia:"social",option:[{value:"Fiesta"}, {value:"Reunion"}, {value:"Protesta"}, {value:"Concierto"}]}
];



const CrearEventoHome = () => {

  const dispatch = useDispatch();
  const uploadImage = useImage();

  const user = useSelector( state => state.User );
  const EventCity = useSelector(state=> state.EventCity)
  const [eventName, setEventName]= useState('')
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [date, setDate]= useState('')
  const [imgUrl, setImgUrl]= useState(null)
  const [errorImg, setErrorImg] = useState(null)
  const [description, setDescription] = useState('')
  const [event_pay, setEventPay]= useState(false)
  const [ticketPrice, setTicketPrice]=useState(0)
  const [credential, setCredential] = useState('')
  const [tipoPago, setTipoPago]=useState(null)
  const [mostrarTipoPago, setMostrarTipoPago] = useState(false)
  
    useEffect(()=>{
        dispatch(getUser());
    }, [ EventCity, dispatch]);

const yesterday = new Date(new Date().setDate(new Date().getDate()));
const year = yesterday.getFullYear();
const month = yesterday.getMonth() +1 ;
var day = yesterday.getDate();
var fecha
if(day.valueOf() < 10){
  day = "0" + day
  fecha = (year + "-" + month + "-" +  day);
} else {
   fecha = (year + "-" + month + "-" +  day);
}


const handleChangeSelect = (e) => {

    if(e.target.name === 'event_pay'){
        if(e.target.value === 'false'){
            setEventPay(false)
            setMostrarTipoPago(false)
            setTipoPago('Evento Gratis')
        } else if (e.target.value === 'true'){
            setTipoPago('Evento de Pago')
            setEventPay(true)
        }
    }

}


    const handleSubmit = (e) => {
        let event = {
            category,
            date,
            event_pay,
            location: EventCity,
            name: eventName,
            subcategory: subCategory,
            user: user?._id,
            info: {
                imagen: imgUrl,
                description,
                ticketPrice:ticketPrice?ticketPrice:'El evento no vende entradas',
                credential: credential,
            }
        }
        e.preventDefault()
        dispatch(postEvent(event));
        dispatch(changeEventCity({}));
        console.log(event);
        alert("Evento creado con exito");
    }

const handleClickTipoPago = () => {
    if(mostrarTipoPago){
        setMostrarTipoPago(false)
    } else {
        setMostrarTipoPago(true)
    }
}


    const handleImage = async (file) => {

        let resultImg = await uploadImage(file);

        if(!resultImg.error){
            setImgUrl(resultImg.url)
            setErrorImg(null)
        } else {
            setErrorImg(resultImg.error)
            setImgUrl(null)
        }

    } 
  return (
    <div className={styles.cont_form_crear_evento}>
        <form className={styles.form} onSubmit={handleSubmit}>

            <div className={styles.user_crearevento}>
                <div className={styles.img_user_crearevento} style={{backgroundImage: `url(${user && user.profile?.photo})`}} ></div>
                <div className={styles.cont_user_crearevento}>
                    <h4>{user ? user.profile?.name : null}</h4>
                    <span onClick={handleClickTipoPago}>{tipoPago ? tipoPago : `¿Este evento es de pago?`}</span>
                </div>
            </div>
            <div className={mostrarTipoPago ? `${styles.tipo_pago} ${styles.tipo_pago_act}` : `${styles.tipo_pago}`}>
                <div>
                    <div>
                        <h4>¿Este evento es de pago?</h4>
                        <select  name="event_pay" onChange={ (e) => handleChangeSelect(e) }>
                            <option value=''>Selecciona una opción</option>
                            <option value='false'>No</option>
                            <option value='true'>Si</option>
                        </select>
                    </div>
                    {
                        event_pay && (
                            <div>
                                <Input
                                    label="Precio de las entradas"
                                    type="text"
                                    name="fee"
                                    onChange={(e) => setTicketPrice(e.target.value)}
                                />
                                <Input
                                    label="Public Key (MercadoPago)"
                                    type="text"
                                    name="credential"
                                    onChange={(e) => setCredential(e.target.value)}
                                />
                                <p className={styles.notificacion}><a href="https://www.mercadopago.com.co/developers/es/guides/resources/credentials" target='_blank' rel="noreferrer">Guía para encontrar tu public key</a></p>
                                
                            </div>
                        )
                    }
                    {
                        event_pay ? 
                            credential ? <span onClick={handleClickTipoPago}>Guardar</span> : <p className={styles.notificacion_crear_evento}>Complete todos los campos para poder guardar los datos de pago</p>
                        : <span onClick={handleClickTipoPago}>Guardar</span>
                    }
                    
                    
                </div>
            </div>

            <Input
                label="Nombre del Evento"
                type="text"
                name="name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
            />
            <div className={styles.map}>
                <Map
                    type ='event'
                    places={true}
                    coords={EventCity.cityCords}
                    LabelName='Direccion'
                />
            </div>
            <Select
                name="category"
                onchange={(e) => setCategory(e.target.value)}
                default_value="1"
                default_name='Selecciona una Categoría'
                options={categories}  
            />
            {
                category === 'social' || category === 'sports'
                ?
                    <Select
                    type="a"
                    name="subcategory"
                    onchange={(e) => setSubCategory(e.target.value)}
                    default_value="1"
                    default_name='Selecciona una Subcategoría'
                    herencia={category} options={subcategories}/>

                : null
            }

            <Input
                label="Fecha"
                required
                type="date"
                name="date"
                min= {fecha}
                onChange={(e) => setDate(e.target.value)}
            />

            <Input
                label="Imagen del Evento"
                type="file"
                name="imagenArchivo"
                onChange={ async (e) => handleImage (e.target.files[0]) }
            />
            { errorImg && <p className={styles.error}>{errorImg}</p>}
            { imgUrl && <img src={imgUrl} alt='' className={styles.imagenCrearEvento}/> }

            <div className={styles.item_textarea}>
                <label>Descripción del evento</label>
                <textarea
                name="description"
                rows="2"
                onChange={(e) => setDescription(e.target.value)}
                >{description}
                </textarea>
            </div>

            { date && EventCity.cityCords && category && category !== '1' && subCategory && subCategory !== '1' && imgUrl && eventName && description
                ? <Boton colorBtn="btn_azul">Crear Evento</Boton>
                : <p className={styles.notificacion_crear_evento}>Complete todos los campos para poder crear el evento</p>
          }
          
        </form>
    </div>
  )
}

export default CrearEventoHome;
