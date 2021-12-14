import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getEvent,
  postPreference,
  getUser,
  findUser,
  deleteEvent,
  present,
} from "../../redux/actions";
import style from "./DetailEvents.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Ubicación.PNG";
import { useMercadopago } from "react-sdk-mercadopago";
import Input from "../../components/Input/Input";
import Loading from "../../components/Loading/Loading";
import Map from "../../components/Maps/Map";
import Boton from "../../components/Boton/Boton";
import Container from "../../components/Container/Container";

function creatorr(n = "", s = "") {
  if (n && s) {
    return (
      n[0].toUpperCase() + n.slice(1) + " " + s[0].toUpperCase() + s.slice(1)
    );
  }
  return "";
}

export default function DetailEvet() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cantidad, setCantidad] = useState(1);
  const [preference, setPreference] = useState({});
  const user = useSelector((state) => state.User);
  const Events = useSelector((state) => state.Event);
  const PreferenceId = useSelector((state) => state.PreferenceId);

  useEffect(() => {
    dispatch(getEvent(name));
  }, [dispatch, name]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const theEvent = Events[0];

  console.log(theEvent);
  console.log(user);
  console.log(user.publicKey);

  useEffect(() => {
    if (theEvent && user) {
      const fee = theEvent.info.hasOwnProperty("ticketPrice")
        ? theEvent.info.ticketPrice
        : 3;
      setPreference({
        title: "Entradas de " + theEvent.name,
        price: fee,
        quantity: cantidad,
        payer: {
          name: user.profile?.name,
          surname: user.profile?.surname,
          email: user.profile?.email,
          city: user.profile?.city,
        },
        statement_descriptor: "Eventy Entradas",
        expires: true,
        expiration_date_from: "2021-12-01T12:00:00.000-04:00",
        expiration_date_to: theEvent.date,
      });
    }
  }, [theEvent, cantidad, user]);

  function handleChange(e) {
    setCantidad(e.target.value);
    console.log(cantidad);
  }

  function handleClick(e) {
    console.log(preference);
    dispatch(postPreference(preference));
  }

  const mercadopago = useMercadopago.v2(
    "TEST-73717f29-d26d-4a49-aec6-3f75b4872625",
    {
      locale: "es-AR",
    }
  );

  useEffect(() => {
    if (mercadopago && PreferenceId) {
      mercadopago.checkout({
        preference: {
          id: PreferenceId,
        },
        render: {
          container: ".pago",
          label: "Comprar " + cantidad + " entrada/s",
        },
      });
    }
  }, [mercadopago, PreferenceId, cantidad]);

  useEffect(() => {
    if (Object.keys(user).length !== 0 && theEvent) {
      if (user._id !== theEvent.user) {
        dispatch(findUser(theEvent?.user?._id));
      }
    }
  }, [theEvent, dispatch, user]);

  var creator = useSelector((state) => state.OtherUsers);
  if (creator) {
    if (Object.keys(creator).length === 0) {
      creator = { profile: { name: "", surname: "" } };
    }
  }

  function handleAsistir() {
    const seguidor = user?._id;
    const seguido = theEvent?._id;
    const data = {
      id1: seguidor,
      id2: seguido,
    };
    dispatch(present(data));
    console.log(data);
  }

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteEvent(theEvent.name));
    alert("El evento ha sido eliminado");
    setTimeout(function () {
      navigate("/");
      window.location.reload();
    }, 2000);
  }

  return (
    <div>
      {!user && !user._id ? (
        navigate("/login")
      ) : (
        <div>
          {theEvent ? (
            <div>
              {theEvent && theEvent.expired ? (
                <div className={style.evento_expired}>
                  <span>Este evento ya se ha realizado</span>
                </div>
              ) : null}
              <div
                className={style.fondo}
                style={{
                  background: `linear-gradient(0deg, rgb(1, 56, 95) 10%, rgba(1, 56, 95, 0.9) 30%, rgba(1, 56, 95, 0.5) 100%), url(${theEvent.info.imagen})`,
                }}
              >
                <Container>
                  <div>
                    {theEvent.info.imagen ? (
                      <img
                        className={style.imagenDetail}
                        src={theEvent.info.imagen}
                        alt=""
                      ></img>
                    ) : (
                      <img
                        className={style.imagenDetail}
                        src={
                          "https://www.masquenegocio.com/wp-content/uploads/2018/03/evento-concierto-874x492.jpg"
                        }
                        alt=""
                      ></img>
                    )}
                  </div>
                  <div className={style.info_detail}>
                    <h1 className={style.nombreEvento}>{theEvent.name}</h1>
                    <div>
                      <FontAwesomeIcon
                        className={style.icono}
                        icon={faMapMarkerAlt}
                      />
                      <span className={style.info}>
                        {theEvent.location.cityName}
                      </span>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        className={style.icono}
                        icon={faCalendarAlt}
                      />
                      <span className={style.info}>{theEvent.date}</span>
                    </div>
                    <div>
                      {theEvent && !theEvent.expired ? (
                        <Boton  colorBtn="btn_naranja" onClick={(e) => handleAsistir()} >Asistiré</Boton>
                      ) : null}
                      {user._id === theEvent.user._id ? (
                        <div>
                          <Link to={"/editar-evento/" + name}>
                            <Boton colorBtn="btn_naranja">Editar Evento</Boton>
                          </Link>
                          <Boton
                            colorBtn="btn_naranja"
                            onClick={(e) => handleDelete(e)}
                          >
                            Eliminar Evento
                          </Boton>
                        </div>
                      ) : (
                        <Link to={`/user/${creator.id}`}>
                          <span className={style.creator}>
                            Creado por:{" "}
                            {creatorr(
                              creator?.profile?.name,
                              creator?.profile?.surname
                            )}
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </Container>
              </div>

              <div className={style.dataContent}>
                <Container>
                  <div className={style.dataInfo}>
                    <h2>Información del evento:</h2>
                    <p className={style.dataInfoP}>
                      {theEvent.info.description}
                    </p>
                  </div>
                  <div className={style.dataInfo}>
                    <div>
                      <Map
                        coords={theEvent.location.cityCords}
                        LabelName="Ciudad"
                      />
                    </div>
                  </div>
                </Container>
              </div>
              {theEvent && !theEvent.expired ? (
                <div>
                  <Container>
                    <div className={`pago ${style.cont_pagos}`}>
                      {theEvent.event_pay === true ? (
                        <div>
                          <h1>Comprar entradas:</h1>
                          <div className={style.cont_datospago}>
                            <h3>
                              Precio general: ${theEvent.info.ticketPrice}
                            </h3>
                            <div>
                              <Input
                                label="Cantidad de entradas"
                                type="number"
                                name="quantity"
                                min={1}
                                onChange={(e) => handleChange(e)}
                              />
                              <Boton
                                colorBtn="btn_azul"
                                onClick={(e) => handleClick(e)}
                              >
                                Comprar {cantidad} entrada/s
                              </Boton>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p>Este evento es GRATUITO.</p>
                      )}
                    </div>
                  </Container>
                </div>
              ) : null}
            </div>
          ) : (
            <Loading />
          )}
          {theEvent && !theEvent.expired ? (<div className={style.discus}>
            <div id="disqus_thread"></div>
            {
              /**
               *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
               *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
              /*
    var disqus_config = function () {
    this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
    */
              (function () {
                // DON'T EDIT BELOW THIS LINE
                var d = document,
                  s = d.createElement("script");
                s.src = "https://eventy.disqus.com/embed.js";
                s.setAttribute("data-timestamp", +new Date());
                (d.head || d.body).appendChild(s);
              })()
            }
            <noscript>
              Please enable JavaScript to view the{" "}
              <a href="https://disqus.com/?ref_noscript">
                comments powered by Disqus.
              </a>
            </noscript>
          </div>) : null}
          <div className={style.home}>
            <Link to="/">
              <Boton colorBtn="btn_azul">Volver al Home</Boton>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
