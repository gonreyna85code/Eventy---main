import React from 'react'
import logoBlanco from './images/logo-blanco.png'
import botonStyles from "../Boton/Boton.module.css"
import styles from './home.module.css'
import Card from '../Card/CardEvent'
import {FontAwesomeIcon}from '@fortawesome/react-fontawesome'
import {faCircle } from '@fortawesome/free-solid-svg-icons'
import{faUser}from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import Container from '../Container/Container'


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
        <div>hola</div>
        // <div className={styles.container}>
        //     <div className={styles.navBar}>
        //         <img className={styles.navLogo} src={logoBlanco} alt=''/>
        //         <div className={styles.acceder}>
        //             <div className={styles.elipsis}>
        //             <FontAwesomeIcon icon={faCircle}/>
        //             <FontAwesomeIcon icon={faCircle}/>
        //             <FontAwesomeIcon icon={faCircle}/>
        //             </div>
        //             <Link to = '/login'>
        //             <button className={`${botonStyles.btn} ${botonStyles.btn_azul} ${styles.navBarButon}`}>  
        //                 <FontAwesomeIcon icon={faUser}/>
        //                 <span>ACCEDER</span>
        //             </button>
        //             </Link>
        //         </div>
        //     </div>
        //     <div className={styles.principalBanner}>
        //         <div>
        //             <span className={styles.P1}>SIGUE</span>
        //             <span className={styles.P2}>LOS EVENTOS</span>
        //             <span className={styles.P3}>CERCANOS A TI</span>
        //         <Link to = '/login'>
        //         <button className={`${botonStyles.btn} ${botonStyles.btn_azul} ${styles.bannerBoton}`}> ACCEDER</button>
        //         </Link>
        //         </div>
        //     </div>
        //     <div className={styles.clases}>
        //         <div className={styles.clasesContainer}>
        //             <div className={styles.sociales}>
        //                 <p className= {styles.nombreClase}>
        //                     SOCIALES
        //                 </p>
        //                 <Link to = '/login'>
        //                 <button className={`${styles.boton} ${botonStyles.btn} ${botonStyles.btn_naranja} `}>VER EVENTOS</button>
        //                 {/* <Boton className={styles.boton} colorBtn='naranja'> VER EVENTOS</Boton> */}
        //                 </Link>
        //             </div>

        //         </div>
        //         <div className={styles.clasesContainer}>
        //             <div className={styles.deportes}>
        //                 <p className= {styles.nombreClase}>
        //                     DEPORTES
        //                 </p>
        //                 <Link to = '/login'>
        //                 <button className={`${botonStyles.btn} ${botonStyles.btn_azul} ${styles.boton}`}>VER EVENTOS</button>
        //                 </Link>
                        
        //             </div>
        //         </div>
        //     </div>




        //     <div className={styles.events}>
        //         <h1 className={styles.eventsTitle}>EVENTOS DESTACADOS</h1>
        //         <div className={styles.carrusel}>
        //             <Container>
        //                 <div id='CarrouselEventos' className = {styles.cardsEvents}>
        //                 {
        //                     pruebaEventos && pruebaEventos.map((el)=>{
        //                         return(
        //                         <Card key={el.name} img = {el.img} name = {el.name} location = {el.location.cityName} date = {el.date} id = {el.id} buttonColor='naranja'/>
        //                         )
        //                     })
        //                 }
        //                 </div>
        //             </Container>
        //             <div>
        //                 <button  className= {`${botonStyles.btn} ${botonStyles.btn_naranja} ${styles.carruselButton}`} onClick={()=>{
        //                     if(document.getElementById('CarrouselEventos').style.transform === ''){
        //                         document.getElementById('CarrouselEventos').style.transform=`translateX(+33.3%)`
        //                     }else{
        //                         let hola = parseFloat(document.getElementById('CarrouselEventos').style.transform.split('(')[1].split(')')[0])
        //                         if (hola===0) {
                                    
        //                         }else{
        //                             document.getElementById('CarrouselEventos').style.transform= `translateX(${hola +33.3}%)`

        //                         }
        //                     }
                            
        //                 }}>
        //                     {'<'}
        //                 </button>
        //                 <button className= {`${botonStyles.btn} ${botonStyles.btn_naranja} ${styles.carruselButton}`} onClick={async()=>{
        //                     if(document.getElementById('CarrouselEventos').style.transform === ''){
        //                         document.getElementById('CarrouselEventos').style.transform=`translateX(-33.3%)`
        //                     }else{
                                
        //                         let hola = parseFloat(document.getElementById('CarrouselEventos').style.transform.split('(')[1].split(')')[0])
        //                         if (hola>-60) {
        //                             document.getElementById('CarrouselEventos').style.transform= `translateX(${hola -33.3}%)`
        //                         } 
        //                     }
        //                 }}>
        //                     {'>'}
        //                 </button>
        //             </div>

        //         </div>
        //     </div>




        //     <div className={styles.noticias}>
        //         <h1 className={styles.noticiasTitle}>ULTIMAS NOTICIAS</h1>
        //         <div>
        //         <Container>
        //             <div className={styles.carrusel}>
        //                 <div id='CarrouselNoticias' className = {styles.cardsEvents}>
        //                 {
        //                     pruebaEventos && pruebaEventos.map((el)=>{
        //                         return(
        //                         <Card key = {el.name} img = {el.img} name = {el.name} location = {el.location.cityName} date = {el.date} id = {el.id} buttonColor= 'azul'/>
        //                         )
        //                     })
        //                 }
        //                 </div>

        //                 <div>
        //                     <button className= {`${botonStyles.btn} ${botonStyles.btn_azul} ${styles.carruselButton}`} onClick={()=>{
        //                         if(document.getElementById('CarrouselNoticias').style.transform === ''){
        //                             document.getElementById('CarrouselNoticias').style.transform=`translateX(33.3%)`
        //                         }else{
        //                             let hola = parseFloat(document.getElementById('CarrouselNoticias').style.transform.split('(')[1].split(')')[0])
        //                             if (hola===0) {
                                        
        //                             }else{
        //                                 document.getElementById('CarrouselNoticias').style.transform= `translateX(${hola +33.3}%)`

        //                             }
        //                         }
                                
        //                     }}>
        //                         {'<'}
        //                     </button>
        //                     <button className= {`${botonStyles.btn} ${botonStyles.btn_azul} ${styles.carruselButton}`} onClick={async()=>{
        //                         if(document.getElementById('CarrouselNoticias').style.transform === ''){
        //                             document.getElementById('CarrouselNoticias').style.transform=`translateX(-33.3%)`
        //                         }else{
                                    
        //                             let hola = parseFloat(document.getElementById('CarrouselNoticias').style.transform.split('(')[1].split(')')[0])
        //                             if (hola>-60) {
        //                                 document.getElementById('CarrouselNoticias').style.transform= `translateX(${hola -33.3}%)`
        //                             } 
        //                         }
        //                     }}>
        //                         {'>'}
        //                     </button>
        //                 </div>


        //             </div>
        //         </Container>
        //         </div>
        //     </div>
        //     <div className={styles.sideBar}>
        //             <span>Eventy - 2021 | Soy Henry</span>
        //     </div>
        // </div>
    )

}