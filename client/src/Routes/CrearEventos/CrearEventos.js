import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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

  const user = useSelector((state) => state.User);
  const EventCity = useSelector((state) => state.EventCity);
  const [eventName, setEventName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [date, setDate] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [event_pay, setEventPay] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(0);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const yesterday = new Date(new Date().setDate(new Date().getDate()));
  const year = yesterday.getFullYear();
  const month = yesterday.getMonth() +1 ;
  var day = yesterday.getDate()
  if(day.valueOf() < 10){
    day = "0" + day
    var fecha = (year + "-" + month + "-" +  day);
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
      name: eventName,
      subcategory: subCategory,
      user: user?._id,
      info: {
        imagen: imgUrl,
        description,
        ticketPrice: ticketPrice ? ticketPrice : "El evento no vende entradas",
      },
    };
    e.preventDefault();
    dispatch(postEvent(event));
    dispatch(changeEventCity({}));
    console.log(event);
    alert("Evento creado con exito");
  }

  if (user === "Usuario no logueado") {
    return <Warning />;
  }

  return (
    <div className={styles.cont_crear_evento}>
      <div className={styles.header}>
        <h1>Crear un Nuevo Evento</h1>
      </div>
      <Container>
        <form className={styles.form}>
          <Input
            label="Nombre del Evento"
            type="text"
            name="name"
            onChange={(e) => setEventName(e.target.value)}
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
            onChange={async (e) =>
              setImgUrl(await uploadImage(e.target.files[0]))
            }
          />
          <div>{imgUrl ? <img src={imgUrl} /> : null}</div>
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
                  label="Precio de las entradas"
                  type="text"
                  name="fee"
                  onChange={(e) => setTicketPrice(e.target.value)}
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
