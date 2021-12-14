import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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
import Map from '../../components/Maps/Map';
import CardHome from './CardHome'


const responsivePrincipal = {
    0: {
        items: 1,
    },
    768:  {
        items: 3,
    },
}
const reponsivePrincipalMenorA3={
    0: {
        items: 1,
    }
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


const subcategoriasSport = ["Maraton", "Aeromodelismo", "Futbol", "Tenis", "Handball"];
const subcategoriasSocial = ["Fiesta", "Reunion", "Protesta", "Concierto"];

const Home = () => {
    
    const dispatch = useDispatch();
    const NearEvents = useSelector(state => state.NearEvents)
    const user = useSelector( state => state.User );
    const follows = useSelector( state => state.Follows );
    const allEvents = useSelector ( state => state.AllEvents);
    const [eventosDeportes, setEventosDeportes] = useState([]);
    const [eventosSociales, setEventosSociales] = useState([]);

    const [estatusPopup, setEstatusPopup] = useState(false);
   
    const navigate = useNavigate()
    const [userCord, setUserCord] = useState(0)
    const [defaultDistance ] = useState(5)
    const [distance , setDistance] = useState(5)
    const [mapPopup, setMapPopup] =useState(false)

  
    
    useEffect(()=>{
        function succes(position){
            setUserCord({lat:position.coords.latitude, lng:position.coords.longitude})
        }
        function error(e){
            alert(e.message)
        }
        navigator.geolocation.getCurrentPosition(succes,error)
    }, [user])

    useEffect(()=>{
        dispatch(getUser());
    }, [dispatch]);

    useEffect(()=>{
        dispatch(getAllEvents())
    }, [dispatch])

    useEffect(()=>{
        dispatch(getNearEvents(userCord,defaultDistance*1000))
    }, [dispatch, userCord, defaultDistance])
    
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
            {user&& user.password==='' ? navigate('/completarPerfil'):null }
            <NavBar/>
            {console.log(NearEvents)}
            <div className={styles.cont_principal}>
                <div className={styles.cont_info_principal}>
                    <h1 className={styles.titulo}>Eventos Cercanos</h1>
                    <p>Encuentra eventos a 
                        { user && <select className ={styles.distanceSelector} 
                        onChange={(e)=>{
                            setDistance(e.target.value)
                            dispatch(getNearEvents(userCord,e.target.value*1000))
                        }}>
                            <option>{defaultDistance}</option>
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>

                        </select> }
                        km de tu ubicación</p>

                        { NearEvents && NearEvents.length > 0 ? (
                                <Boton
                                    onClick={()=>{
                                        setMapPopup(true)
                                    }}
                                    colorBtn='btn_azul'
                                >
                                Ver Mapa
                                </Boton>)
                            : null
                        }
                </div>
                <div className={`cont-carrusel ${styles.cont_carrusel} ${NearEvents && NearEvents.length < 4 ? `carrusel_menos_3_items` : ``}`}>
                    { NearEvents &&  NearEvents.length > 0
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
                        responsive={ NearEvents && NearEvents.length > 4 ? responsivePrincipal : reponsivePrincipalMenorA3 }
                        controlsStrategy="alternate"
                        autoPlay={true}
                        infinite={true}
                        autoPlayInterval={4000}
                        keyboardNavigation={true}
                        disableButtonsControls={false}
                        disableDotsControls={true}
                    />
                    :<div className ={styles.errorMessage}>No hay Eventos En {distance? distance:defaultDistance} Km a tu alrededor </div>
                    
                
                }
                
                { user && userCord && NearEvents ? (
                    <PopUp
                        estatus={mapPopup}
                        title='Eventos Cercanos'
                        onClick={()=>{
                            setMapPopup(false)
                        }}
                    >
                       <div className={styles.MapPopup}>
                            <Map
                            coords={userCord}
                            type='nearEvents'
                            NearEvents= { NearEvents}
                            />
                        </div>
                    </PopUp>
                ) : null
                }
                

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
            <div className={styles.cont_general}>
                <Container>
                    <div className={styles.cont_listado_eventos}>
                        <h5>Eventos de usuarios seguidos</h5>
                        {
                            
                            follows && follows.length > 0 ? follows.map( evento => {
                                
                                return ( <CardHome
                                    name={evento[0].name}
                                    location={evento[0].location?.cityName}
                                    date={evento[0].date}
                                    img={evento[0].info?.imagen}
                                    id={evento[0]._id}
                                    tipoEvento={evento[0].event_pay}
                                    categoria={evento[0].category}
                                    user={evento.user}
                                />)


                            })

                            : null
                        }

                    </div>
                    <div className={styles.cont_rigth}>
                        
                        <div className={styles.cont_listado_categorias}>
                            <h3>Listado de Categorías</h3>

                            <Link to = '/sport'><h4>Deportes</h4></Link>
                            <ul>{
                                
                                subcategoriasSport && subcategoriasSport.map( s => {
                                    return <li key={s}><Link to={`/subcategory/${s}`}>{s}</Link></li>
                                })
                            
                            }</ul>
                            <Link to = '/social'><h4>Sociales</h4></Link>
                            <ul>{
                                
                                subcategoriasSocial && subcategoriasSocial.map( s => {
                                    return <li key={s}><Link to={`/subcategory/${s}`}>{s}</Link></li>
                                })
                            
                            }</ul>

                        </div>
                        
                    </div>
                </Container>
            </div>
            
        </div>
    );
}

export default Home;