import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardHome.module.css";
import {FontAwesomeIcon}from '@fortawesome/react-fontawesome'
import {faCalendarAlt, faMapMarkerAlt, faTicketAlt, faUsers, faInfoCircle} from '@fortawesome/free-solid-svg-icons'


export default function Card({name, location, date, img, id, tipoEvento, categoria, asistentes, user}){
    return(
        <div className = {styles.contenedor} key={id}>
            
            <div className={styles.info_user}>
                <div className={styles.img_user} 
                    style={{backgroundImage:`url(${user.photo ? user.photo : `https://i.pinimg.com/564x/40/b1/3b/40b13b8551695223454663c0d26caaa3.jpg`})`}}>
                </div>
                <div className={styles.cont_info_user}>
                    <Link to = {`/user/${user._id}`}><span className={styles.name_user}>{`${user.name} ${user.surname}`}</span></Link>
                    <Link to = {'/detailEvent/' + name}><h3 className={styles.name_evento}>{name}</h3></Link>
                </div>
            </div>
            <div className={styles.info_evento}>
                <div className={styles.cont_info}>
                
                    <div className={styles.cont_info}>
                        <div>
                            <FontAwesomeIcon  className={''} icon={faMapMarkerAlt} /> <span className = {styles.locationCard}>{location}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon className={''}  icon={faCalendarAlt} /> <span className = {styles.dateCard}>{date /*no cambiar esto -  se hizo el cambio de formato en la base de datos*/}</span>
                        </div>
                    </div>
                    
                </div>

                <div className={styles.cont_img}
                    style={{backgroundImage:`url(${img ? img : `https://i.pinimg.com/564x/40/b1/3b/40b13b8551695223454663c0d26caaa3.jpg`})`}}>
                </div>
                <div className={styles.acciones}>
                    <div>
                        <Link to = {'/detailEvent/' + name}><FontAwesomeIcon  className={''} icon={faInfoCircle} />Ver Detalles</Link>
                    </div>
                    <div> 
                        <span><FontAwesomeIcon  className={''} icon={faUsers} />{asistentes}</span>
                    </div>
                    <div>
                        <span><FontAwesomeIcon  className={''} icon={faTicketAlt} />{tipoEvento ? `Pago` : `Gratis`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}