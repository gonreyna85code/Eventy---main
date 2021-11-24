import React from 'react'
import deportesImg from './images/categoria-deportes.png'
import logoBlanco from './images/logo-blanco.png'
import styles from './home.module.css'
import Boton from '../components/Boton/Boton'
import botonStyles from "../components/Boton/Boton.module.css"
import Card from '../components/CardEvent'

//COMIENZO DE ZONA DE HARDCODEO
const pruebaEventos = [
    {
    name: 'LollaPalooza 2022',
    id: 1,
    location: 'San Isidro, Argentina',
    date: 'Marzo 18, 19 y 20 | 2022',
    img: 'https://i.pinimg.com/564x/e6/e1/58/e6e158eba9ba9208b4abb6fec41e2aeb.jpg'
},
{
    name: 'Festival Intenacional de Cine de Mar del Plata',
    id: 2,
    location: 'Mar del Plata, Argentina',
    date: 'Noviembre 18 al 28 | 2021',
    img: 'https://www.mardelplatafilmfest.com/beta36/images/news/36-festival-internacional-de-cine-de-mar-del-plata-imagen1_9.jpg'
},
{
    name: 'Festival La Nueva Generación (LNG) 2022',
    id: 3,
    location: 'Córdoba, Argentina',
    date: 'Noviembre 11, 12, 13 | 2022',
    img: 'https://indiehoy.com/wp-content/uploads/2019/10/la-nueva-generacion.jpg'
}
]

//FIN DE LA ZONA DE HARDCODEO. (Esto se reemplaza con los eventos que se traen de la DB)

export default function Home(){

    return(
        <div className={styles.container}>
            <div className={styles.navBar}>
                <img className={styles.navLogo} src={logoBlanco}/>
            </div>
            <div className={styles.principalBanner}>
                <div>
                    <p className={styles.P1}>SIGUE</p>
                    <p className={styles.P2}>LOS EVENTOS</p>
                    <p className={styles.P3}>CERANOS A TI</p>

                </div>
            </div>
            <div className={styles.clases}>
                <div className={styles.clasesContainer}>
                    <div className={styles.sociales}>
                        <p className= {styles.nombreClase}>
                            SOCIALES
                        </p>
                        <button className={`${botonStyles.btn} ${botonStyles.btn_naranja} ${styles.boton}`}>VER EVENTOS</button>
                        {/* <Boton className={styles.boton} colorBtn='naranja'> VER EVENTOS</Boton> */}

                    </div>

                </div>
                <div className={styles.clasesContainer}>
                    <div className={styles.deportes}>
                        <p className= {styles.nombreClase}>
                            DEPORTES
                        </p>
                        <button className={`${botonStyles.btn} ${botonStyles.btn_azul} ${styles.boton}`}>VER EVENTOS</button>
                        {/* <Boton className={styles.boton} colorBtn='azul'> VER EVENTOS</Boton> */}
                        
                        
                    </div>
                </div>
            </div>
            <div className={styles.events}>
                <h1 className={styles.eventsTitle}>EVENTOS DESTACADOS</h1>
                <div className = 'cardsEvents'>
                {
                    pruebaEventos && pruebaEventos.map((el)=>{
                        return(
                            <div key = {el.id}>
                        <Card img = {el.img} name = {el.name} location = {el.location} date = {el.date} id = {el.id}/>
                        </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )

}