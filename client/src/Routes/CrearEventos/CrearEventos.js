import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Boton from "../../components/Boton/Boton";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Container from "../../components/Container/Container";
import styles from "./CrearEventos.module.css";
import { postEvent, getUser, changeEventCity } from "../../redux/actions";
import Map from "../../components/Maps/Map";
import Warning from "../../components/Warning.js/Warning";
import useImage from "../../hooks/useImage";

const categories = [
  { value: "sports", name: "Deportes" },
  { value: "social", name: "Social" },
];
const subcategories = [
  {
    herencia: "sports",
    option: [
      { value: "Maraton" },
      { value: "Aeromodelismo" },
      { value: "Futbol" },
      { value: "Tenis" },
      { value: "Handball" },
    ],
  },
  {
    herencia: "social",
    option: [
      { value: "Fiesta" },
      { value: "Reunion" },
      { value: "Protesta" },
      { value: "Concierto" },
    ],
  },
];

const CrearEventos = () => {
  const dispatch = useDispatch();
  const uploadImage = useImage();
  const navigate = useNavigate();

  const user = useSelector((state) => state.User);
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
  const [stock, setStock] = useState(0)
  const [alias, setAlias] = useState('')
 
  
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const yesterday = new Date(new Date().setDate(new Date().getDate()));
  const year = yesterday.getFullYear();
  const month = yesterday.getMonth() + 1 ;
  var day = yesterday.getDate() ;
  if(day.valueOf() < 10){
    day = "0" + day
    var fecha = (year + "-" + month + "-" +  day);
  } else {
     fecha = (year + "-" + month + "-" +  day);
  }
  //day.lenght === 1 ? '0' + day : null;
  
  console.log(fecha)

  if (!user) {
    dispatch(getUser());
  }

  function crearEvento(e) {
    let event = {
      category,
      date,
      event_pay,
      location: EventCity,
      name: eventName.trim(),
      subcategory: subCategory,
      user: user?._id,
      accesKey: user?.Acceskey,
      publicKey: user?.publicKey,
      stock: stock? stock : 100,
      ventas: 0,
      info: {
        alias: alias,
        imagen: imgUrl || 'https://res.cloudinary.com/dbzyomisc/image/upload/v1639612565/c466yhhhr0mloibuuaox.jpg',
        description,
        ticketPrice:ticketPrice?ticketPrice:'El evento no vende entradas',
      }
    }
    e.preventDefault()
    dispatch(postEvent(event));
    dispatch(changeEventCity({}));
    
    alert("Evento creado con exito");
    setTimeout(function () {            
            navigate(`/detailEvent/${eventName.trim()}`)    
            window.location.reload();        
        }, 2000);
    /* setTimeout(function () {
      navigate("/");
      window.location.reload();
      }, 2000); */
  }

  const handleImage = async (file) => {

    let resultImg = await uploadImage(file);

    if(!resultImg.error){
        setImgUrl(resultImg.url)
        setErrorImg(null)
    } else {
        
        setErrorImg(resultImg.error)
    }

} 


  if (user === "Usuario no logueado") {
    return <Warning />;
  }
  console.log(date);
  return (
    <div className={styles.cont_crear_evento}>
      {user&& user?.password==='' ? navigate('/completarPerfil'):null }

      <div className={styles.header}>
        <h1>Crear un Nuevo Evento</h1>
      </div>
      <Container>
        <form className={styles.form}>
          <Input
            label="Nombre del Evento"
            type="text"
            name="name"
            onChange={(e) => setEventName(e.target.value.trim())}
          />
          <Map
            type="event"
            places={true}
            coords={EventCity.cityCords}
            LabelName="Direccion"
          />
          <Select
            name="category"
            onchange={(e) => setCategory(e.target.value)}
            default_value="1"
            default_name="Selecciona una Categoría"
            options={categories}
          />
          {category === "social" || category === "sports" ? (
            <Select
              type="a"
              name="subcategory"
              onchange={(e) => setSubCategory(e.target.value)}
              default_value="1"
              default_name="Selecciona una Subcategoría"
              herencia={category}
              options={subcategories}
            />
          ) : null}

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
              rows="4"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="event_pay"
                onChange={(e) => setEventPay(e.target.checked)}
              />
              ¿Es un evento pago?
            </label>
            {event_pay === true ? (
              <div>
                <Input
                  label="Precio de las entradas en ARS"
                  type="number"
                  name="fee"
                  onChange={(e) => setTicketPrice(e.target.value)}
                />
                <Input
                  label="Cantidad de entradas disponibles"
                  type="number"
                  name="stock"
                  onChange={(e) => setStock(e.target.value)}
                />
                <p>Para que recibas los pagos de la venta de entradas, necesitamos tu Alias de Mercado Pago</p>
                <p>Los pagos pasaran por una cuenta moderadora y luego se redirigirán a la que nos das ahora</p>
                  <Input
                  label="Alias de Mercado Pago"
                  type="string"
                  name="alias"
                  onChange={(e) => setAlias(e.target.value)}
                />
             </div>
              
            ) : (
              <p>
                Marque la casilla si se venden entradas para su evento. De lo
                contrario, precione 'Crear Evento'
              </p>
            )}
          </div>
          {date &&
          EventCity.cityCords &&
          category &&
          category !== "1" &&
          subCategory &&
          subCategory !== "1" &&
          eventName &&
          description ? (
            <Boton onClick={crearEvento} colorBtn="btn_azul">
              Crear Evento
            </Boton>
          ) : null}
        </form>
      </Container>
    </div>
  );
};

export default CrearEventos;
