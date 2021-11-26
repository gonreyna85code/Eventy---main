import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Home.module.css';
import NavBar from '../NavBar/NavBar';
import EventHome from './EventHome';
import { getUser, getNearbyEvents } from '../../redux/actions';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './HomeCarrusel.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import Container from '../../components/Container/Container';
import Boton from '../../components/Boton/Boton';
import CardEvent from '../../components/CardEvent'

const responsive = {
    0: {
        items: 3,
    },
    1024:  {
        items: 3,
    },
}

const Home = () => {
    
    const dispatch = useDispatch();
    const user = useSelector( state => state.User );
    const eventosCercanos = useSelector(state => state.NearbyEvents)

    useEffect(()=>{
        dispatch(getUser());
    }, [dispatch]);

    useEffect(()=>{
        dispatch(getNearbyEvents(user.profile.city));
    }, [dispatch, user.profile.city]);
    
    console.log({eventosCercanos})

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
                            user.events && user.events.map( evento => {
                                return(
                                    <EventHome
                                    name={evento.name}
                                    img={evento.info.imagen}
                                    location={evento.location}
                                    date={evento.date}
                                    id={evento._id}
                                    />
                                );
                            })
                        }
                        responsive={responsive}
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
            <div className={styles.cont_busqueda}>
                <Container>
                    <div className={styles.cont_info_busqueda}>
                        <h2>Busca un Evento de tu Interes</h2>
                        <div className={styles.cont_searchBar}>
                            <SearchBar/>
                        </div>
                    </div>
                </Container>
            </div>
            <div className={`${styles.cat_sociales} ${styles.cont_categoria_home}`}>
                <div className={styles.cont_info_categoria_home}>
                    <h2>Sociales</h2>
                    <Boton colorBtn='btn_naranja'>Ver Eventos</Boton>
                </div>
                <div className={styles.cont_carrusel_categoria_home}>
                    <AliceCarousel
                        mouseTracking
                        items={
                            user.events && user.events.map( evento => {
                                
                                return(
                                    <div>
                                       {

                                        evento.info.imagen ?
                                        
                                        <CardEvent
                                            name={evento.name}
                                            img={evento.info.imagen}
                                            location={evento.location}
                                            date={evento.date}
                                            id={evento._id}
                                            buttonColor='naranja'
                                            />
                                        : ``
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
                            user.events && user.events.map( evento => {
                                
                                return(
                                    <div>
                                       {

                                        evento.info.imagen ?
                                        
                                            <CardEvent
                                                name={evento.name}
                                                img={evento.info.imagen}
                                                location={evento.location}
                                                date={evento.date}
                                                id={evento._id}
                                                buttonColor='naranja'
                                                />
                                            :
                                            
                                            ``
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
                    <Boton colorBtn='btn_naranja'>Ver Eventos</Boton>
                </div>
            </div>
        </div>
    );
}

export default Home;