import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Boton from "../../components/Boton/Boton";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import { postEvent, changeEventCity } from "../../redux/actions";
import Map from "../../components/Maps/Map";
import useImage from "../../hooks/useImage";
import styles from './Home.module.css'


const categories = [{value:"sports",name:"Deportes"},{value:"social",name:"Social"}]
const subcategories=[
  {herencia:"sports",option:[{value:"Maraton"}, {value:"Aeromodelismo"}, {value:"Futbol"}, {value:"Tenis"}, {value:"Handball"}]},
  {herencia:"social",option:[{value:"Fiesta"}, {value:"Reunion"}, {value:"Protesta"}, {value:"Concierto"}]}
];



const CrearEventoHome = ({form, error, handleSubmit, handleChange}) => {

  const dispatch = useDispatch();
  const uploadImage = useImage();

  
  const EventCity = useSelector(state=> state.EventCity)
  const [eventName, setEventName]= useState('')
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [date, setDate]= useState('')
  const [imgUrl, setImgUrl]= useState(null)
  const [description, setDescription] = useState('')
  const [event_pay, setEventPay]= useState(false)
  const [ticketPrice, setTicketPrice]=useState(0)
  const [estatusCreacion, setEstatusCreacion] = useState(false)
  

 
  return (
    <div className={styles.cont_form_crear_evento}>

        <form className={styles.form} onSubmit={handleSubmit}>

            <Input
                label="Nombre del Evento"
                type="text"
                name="name"
                value={form.name}
                onChange={ (e) => handleChange(e) }
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
                onchange={ (e) => handleChange(e) }
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
                    onchange={ (e) => handleChange(e) }
                    default_value="1"
                    default_name='Selecciona una Subcategoría'
                    herencia={category} options={subcategories}/>

                : null
            }

            <Input
                label="Fecha"
                type="date"
                name="date"
                value={form.date}
                onChange={ (e) => handleChange(e) }
            />

            <Input
                label="Imagen del Evento"
                type="file"
                name="imagen"
                value={form.info.imagen}
                onChange={ async (e)=> handleChange(e) }
            />

            { imgUrl && <img src={form.info.imagen} className={styles.imagenCrearEvento}/> }

            <div className={styles.item_textarea}>
                <label>Descripción del evento</label>
                <textarea
                name="description"
                rows="2"
                onChange={ (e) => handleChange(e) }
                >{form.info.description}
                </textarea>
            </div>
            <div>
                <label>
                    <input
                        type = 'checkbox'
                        name = 'event_pay'
                        onChange = { (e) => handleChange(e) }
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
                                onChange={ (e) => handleChange(e) }
                            />
                        </div>
                    :
                    <p>Marque la casilla si se venden entradas para su evento. De lo contrario, precione 'Crear Evento'</p>
                }
            </div>

            { date && EventCity.cityCords && category && category !== '1' && subCategory && subCategory !== '1' && imgUrl && eventName && description
                ? <Boton colorBtn="btn_azul">Crear Evento</Boton>
                : null
          }
          
        </form>
    </div>
  )
}

export default CrearEventoHome;
