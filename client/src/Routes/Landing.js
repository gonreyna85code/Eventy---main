import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import logoBlanco from './images/logo-blanco.png'
import styles from './home.module.css'
import Boton from '../components/Boton/Boton'
import Card from '../components/CardEvent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser }from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import Container from '../components/Container/Container'
import { getEventosLandingPage } from '../redux/actions'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
const responsive = {
    0: {
        items: 1,
    },
    1024:  {
        items: 3,
    },
}

export default function Home(){

    const dispatch = useDispatch();
    const eventos = useSelector(state => state.EventosLandingPage) 

    useEffect(()=>{
        dispatch(getEventosLandingPage())
    }, [dispatch]);

    

    return(
        <div className={styles.cont_landingpage}>
            <div className={styles.navBar}>
                <img className={styles.navLogo} src={logoBlanco} alt='Eventy'/>
                <div className={styles.acceder}>
                    <Link to = '/login'>
                        <Boton colorBtn='btn_azul'>
                            <FontAwesomeIcon icon={faUser}/> ACCEDER
                        </Boton> 
                    </Link>
                </div>
            </div>
            <div className={styles.principalBanner}>
                <Container>
                    <div className={styles.cont_banner}>
                        <h1>SIGUE <span>LOS EVENTOS</span> CERCANOS A TI</h1>
                        <Link to='/login'>
                            <Boton colorBtn='btn_azul'>ACCEDER</Boton>
                        </Link>
                    </div>
                </Container>
            </div>
            <div className={styles.cont_categorias}>
                <div className={styles.clasesContainer}>
                    <div className={styles.sociales}>
                        <h3>SOCIALES</h3>
                        <Link to = '/login'>
                            <Boton colorBtn='btn_naranja'>VER EVENTOS</Boton>
                        </Link>
                    </div>

                </div>
                <div className={styles.clasesContainer}>
                    <div className={styles.deportes}>
                        <h3>DEPORTES</h3>
                        <Link to = '/login'>
                            <Boton colorBtn='btn_azul'>VER EVENTOS</Boton>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles.events}>
                <Container>
                    <h2 className={styles.eventsTitle}>EVENTOS DESTACADOS</h2>
                    <div className={styles.cont_carrusel}>
                        <AliceCarousel
                            mouseTracking
                            items={
                                eventos && eventos.map( evento => {
                                    return(
                                        <Card
                                            name={evento.name}
                                            img={evento.info.imagen}
                                            location={evento.location.cityName}
                                            date={evento.date.slice(8,10)+'/'+evento.date.slice(5,7)}
                                            id={evento._id}
                                            buttonColor='naranja'
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
                            disableButtonsControls={true}
                            disableDotsControls={false}
                        />
                    </div>
                </Container>
            </div>

            <div className={styles.footer}>
                    <span>Eventy - 2021 | Soy Henry</span>
            </div>
        </div>
    )

}