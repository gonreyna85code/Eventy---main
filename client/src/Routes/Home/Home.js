import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Home.module.css';
import NavBar from '../NavBar/NavBar';
import EventHome from './EventHome';
import { getUser, getNearbyEvents } from '../../redux/actions';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './HomeCarrusel.css';



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
        <div className='cont-home'>
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
                        autoPlayInterval={10000}
                        keyboardNavigation={true}
                        disableButtonsControls={false}
                        disableDotsControls={true}
                    />
                </div>
                <div className={styles.cont_busqueda}>
                </div>
            </div>
        </div>
    );
}

export default Home;