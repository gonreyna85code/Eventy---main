import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import NavBar from '../NavBar/NavBar';
import EventHome from './EventHome';
import { getUser, getAllEvents } from '../../redux/actions';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './HomeCarrusel.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import Container from '../../components/Container/Container';
import Boton from '../../components/Boton/Boton';
import CardEvent from '../../components/CardEvent/CardEvent';
import PopUp from '../../components/PopUp/PopUp';
import CrearEventoHome from './CrearEventoHome';
import Input from '../../components/Input/Input';

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

const subcategorias = ["Maraton", "Aeromodelismo", "Futbol", "Tenis", "Handball", "Fiesta",
    "Reunion", "Protesta", "Concierto"];

const Home = () => {
    
    const dispatch = useDispatch();
    const user = useSelector( state => state.User );
    const allEvents = useSelector ( state => state.AllEvents);
    const [eventos, setEventos] = useState([]);
    const [eventosDeportes, setEventosDeportes] = useState([]);
    const [eventosSociales, setEventosSociales] = useState([]);

    const [estatusPopup, setEstatusPopup] = useState(false);
    const [nombreEvento, setNombreEvento] = useState('');



    useEffect(()=>{
        dispatch(getUser());
    }, [dispatch]);

    useEffect(()=>{
        dispatch(getAllEvents())
    }, [dispatch])

    useEffect(()=>{
        if(allEvents && allEvents.length > 0){
            let filterEvento = allEvents.filter( e => e.location.cityName === user.profile.city)
            setEventos(filterEvento)

            let filterDeportes = allEvents.filter(e => e.category === 'sports')
            setEventosDeportes(filterDeportes)
            let filterSocial = allEvents.filter(e => e.category === 'social')
            setEventosSociales(filterSocial)    
        }
    }, [dispatch, allEvents, user]) 

    const handleChangeCrearEvento = (e) => {
        setNombreEvento(e.target.value);
        setEstatusPopup(true)
    }

    const handleClickPopup = () => {
        setEstatusPopup(false)
    }
    
    return(
        <div className={styles.cont_home}>
            <NavBar/>
            <div className={styles.cont_principal}>
                <div className={styles.cont_info_principal}>
                    <h1 className={styles.titulo}>Eventos Cercanos</h1>
                    <p>Encuentra eventos cercanos a tu ubicación</p>
                </div>
                
                <div className={`cont-carrusel ${styles.cont_carrusel}`}>
                    <AliceCarousel
                        mouseTracking
                        items={
                            eventos && eventos.map( evento => {
                                return(
                                    <EventHome
                                    name={evento.name}
                                    img={evento.info.imagen}
                                    location={evento.location.cityName}
                                    date={evento.date.slice(8,10)+'/'+evento.date.slice(5,7)}
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
                </div>
            </div>
            <div className={styles.cont_crear_evento}>
                <Container>
                    <div className={styles.cont_info_busqueda}>
                        <h2>¿Estas Planeando un Nuevo evento?</h2>
                        <span>Compártelo!</span>
                        <input type='text' onChange={handleChangeCrearEvento} placeholder='¿Como se llama tu evento?'/>
                        <PopUp estatus={estatusPopup} onClick={handleClickPopup}>
                            <CrearEventoHome nombre={nombreEvento}/> 
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
                                user.events && user.events.map( evento => {
                                    
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