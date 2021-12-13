import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import NavBar from '../NavBar/NavBar';
import EventHome from './EventHome';
import { getUser, getAllEvents, getNearEvents } from '../../redux/actions';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './HomeCarrusel.css';
//import SearchBar from '../../components/SearchBar/SearchBar';
import Container from '../../components/Container/Container';
import Boton from '../../components/Boton/Boton';
import CardEvent from '../../components/CardEvent/CardEvent';
import PopUp from '../../components/PopUp/PopUp';
import CrearEventoHome from './CrearEventoHome';
import Input from '../../components/Input/Input';
import useImage from "../../hooks/useImage";
import Map from '../../components/Maps/Map';


const responsivePrincipal = {
    0: {
        items: 3,
    },
    1024:  {
        items: 3,
    },
}

const responsive = {
    0: {
        items: 1,
    },
    768:{
        items: 2
    },
    1024:  {
        items: 3,
    },
}


    


const Home = () => {
    
    const dispatch = useDispatch();
    const NearEvents = useSelector(state => state.NearEvents)
    const user = useSelector( state => state.User );
    const allEvents = useSelector ( state => state.AllEvents);
    const [eventos, setEventos] = useState([]);
    const [eventosDeportes, setEventosDeportes] = useState([]);
    const [eventosSociales, setEventosSociales] = useState([]);

    const [estatusPopup, setEstatusPopup] = useState(false);
   

    const [userCord, setUserCord] = useState(0)
    const[defaultDistance, setDefaultDistance ] = useState(5)
    const [distance , setDistance] = useState(0)
    const [mapPopup, setMapPopup] =useState(false)

  
    function succes(position){
      setUserCord({lat:position.coords.latitude, lng:position.coords.longitude})
  
    }
    function error(e){
      alert(e.message)
    }
    
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(succes,error)
        dispatch(getUser());
    }, [dispatch]);

    useEffect(()=>{
        dispatch(getAllEvents())
    }, [dispatch])

    useEffect(()=>{
        dispatch(getNearEvents(userCord,defaultDistance*1000))
    }, [dispatch, userCord])
    
    useEffect(()=>{
        if(allEvents && allEvents.length > 0){
            let filterDeportes = allEvents.filter(e => e.category === 'sports')
            setEventosDeportes(filterDeportes)
            let filterSocial = allEvents.filter(e => e.category === 'social')
            setEventosSociales(filterSocial)    
        }
    }, [dispatch, allEvents, user,NearEvents]) 

    const handleClickPopup = () => {
        setEstatusPopup(false)
    }

    
    
    const handleClickCrearEvento = (e) => {
        setEstatusPopup(true)
    }

    return(
        <div className={styles.cont_home}>
            <NavBar/>
            {NearEvents? console.log(NearEvents):null}
            <div className={styles.cont_principal}>
                <div className={styles.cont_info_principal}>
                    <h1 className={styles.titulo}>Eventos Cercanos</h1>
                    <p>Encuentra eventos a 
                        <select className ={styles.distanceSelector} 
                        onChange={(e)=>{
                            setDistance(e.target.value)
                            dispatch(getNearEvents(userCord,e.target.value*1000))
                        }}>
                            <option>{defaultDistance}</option>
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>

                        </select> 
                        km de tu ubicación</p>
                </div>
                <div className={`cont-carrusel ${styles.cont_carrusel}`}>
                    {NearEvents.length>0
                    ?<AliceCarousel
                        mouseTracking
                        items={
                            NearEvents && NearEvents.map( evento => {
                                return(
                                    <EventHome
                                    name={evento.name}
                                    img={evento.info.imagen}
                                    location={evento.location.cityName}
                                    date={evento.date} //no cambiar esto -  se hizo el cambio de formato en la base de datos
                                    id={evento._id}
                                    />
                                );
                            })
                        }
                        responsive={responsivePrincipal}
                        controlsStrategy="alternate"
                        autoPlay={true}
                        infinite={true}
                        autoPlayInterval={4000}
                        keyboardNavigation={true}
                        disableButtonsControls={false}
                        disableDotsControls={true}
                    />
                    :<div className ={styles.errorMessage}>No hay Eventos Cercanos {distance? distance:defaultDistance} Km a tu alrededor </div>
                    
                
                }
                {NearEvents.length>0
                ?
                    <Boton onClick={()=>{
                        setMapPopup(true)
                    }}
                    colorBtn='btn_azul'
                    >

                        ver mapa con eventos cercanos
                    </Boton>
              

                :null
                }
                <div className={styles.MapPopup}>
                    <PopUp
                    estatus={mapPopup}
                    title='Eventos Cercanos'
                    onClick={()=>{
                        setMapPopup(false)
                    }}
                    >
                        <Map
                        coords={userCord}
                        type='nearEvents'
                        NearEvents= {NearEvents}
                        />
                    </PopUp>

                </div>

                </div>
            </div>
            <div className={styles.cont_crear_evento}>
                <Container>
                    <div className={styles.cont_info_crear_evento}>
                        <h2>¿Estas Planeando un Nuevo evento?</h2>
                        <span>Compártelo!</span>
                        <button onClick={(e)=>handleClickCrearEvento(e)}>¿Como se llama tu evento?</button>
                        <PopUp 
                            estatus={estatusPopup}
                            onClick={handleClickPopup}
                            title='Crear Evento'
                        >
                            <CrearEventoHome/> 
                        </PopUp>
                    </div>
                </Container>
            </div>
            <div className={`${styles.cat_sociales} ${styles.cont_categoria_home}`}>
                <div className={styles.cont_info_categoria_home}>
                    <h2>Sociales</h2>
                    <Link to = '/social'>
                    <Boton colorBtn='btn_naranja'>Ver Eventos</Boton>
                    </Link>
                </div>
                <div className={styles.cont_carrusel_categoria_home}>
                    <AliceCarousel
                        mouseTracking
                        items={
                            eventosSociales && eventosSociales.map( evento => {
                                
                                return(
                                    <div>
                                       {
                                        
                                        <CardEvent
                                            name={evento.name}
                                            img={evento.info.imagen ? evento.info.imagen : 'https://www.chefandparty.com/wp-content/uploads/2020/07/Sociales.jpg'}
                                            location={evento.location.cityName}
                                            date={evento.date}
                                            id={evento._id}
                                            buttonColor='naranja'
                                        />
                                        }
                                    </div>
                                );

                            })
                        }
                        responsive={responsive}
                        controlsStrategy="alternate"
                        autoPlay={true}
                        infinite={true}
                        autoPlayInterval={4000}
                        disableButtonsControls={true}
                        disableDotsControls={false}
                    />
                </div>
            </div>
            <div className={`${styles.cat_deportes} ${styles.cont_categoria_home}`}>
                <div className={styles.cont_carrusel_categoria_home}>
                    <AliceCarousel
                        mouseTracking
                        items={
                            eventosDeportes && eventosDeportes.map( evento => {
                                
                                return(
                                    <div>
                                       {

                                        
                                            <CardEvent
                                                name={evento.name}
                                                img= {evento.info.imagen ? evento.info.imagen :'https://blog.jeep.com.ec/hubfs/7%20deportes%20extremos%20para%20realizar%20outdoor%20despu%C3%A9s%20de%20la%20cuarentena-4.png'}
                                                location={evento.location.cityName}
                                                date={evento.date}
                                                id={evento._id}
                                                buttonColor='naranja'
                                                />
                                            
                                        }
                                    </div>
                                );

                            })
                        }
                        responsive={responsive}
                        controlsStrategy="alternate"
                        autoPlay={true}
                        infinite={true}
                        autoPlayInterval={4000}
                        disableButtonsControls={true}
                        disableDotsControls={false}
                    />
                </div>
                <div className={styles.cont_info_categoria_home}>
                    <h2>Deportes</h2>
                    <Link to = '/sport'>
                    <Boton colorBtn='btn_azul'>Ver Eventos</Boton>
                    </Link>
                </div>
            </div>
            <div className={styles.cont_eventos_seguidos}>
                <Container>
                    <h2>Eventos Seguidos</h2>
                    <div className={styles.cont_carrusel_seguidos}>
                        <AliceCarousel
                            mouseTracking
                            items={
                                user && user.events.map( evento => {
                                    
                                    return(
                                        <div>
                                        {
                                            
                                            <CardEvent
                                                name={evento.name}
                                                img={evento.info.imagen ? evento.info.imagen :'https://blog.jeep.com.ec/hubfs/7%20deportes%20extremos%20para%20realizar%20outdoor%20despu%C3%A9s%20de%20la%20cuarentena-4.png'}
                                                location={evento.location.cityName}
                                                date={evento.date}
                                                id={evento._id}
                                                buttonColor='naranja'
                                                />

                                            }
                                        </div>
                                    );

                                })
                            }
                            responsive={responsive}
                            controlsStrategy="alternate"
                            autoPlay={true}
                            infinite={true}
                            autoPlayInterval={4000}
                            disableButtonsControls={true}
                            disableDotsControls={false}
                        />
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Home;