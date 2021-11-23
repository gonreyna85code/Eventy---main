import React from 'react'
import deportesImg from './images/categoria-deportes.png'
import logoBlanco from './images/logo-blanco.png'
import styles from './home.module.css'
import Boton from '../Boton/Boton'
import botonStyles from "../Boton/Boton.module.css"


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
                <p className={styles.eventsTitle}>EVENTOS DESTACADOS</p>
            </div>
        </div>
    )

}