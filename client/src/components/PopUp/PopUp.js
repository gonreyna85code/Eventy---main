import React from 'react';
import styles from './PopUp.module.css';

const PopUp = ({children, estatus, onClick, title}) => {
    
    return(
        <div className={estatus ? styles.popup_active : styles.popup_disabled}>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <h3>{title}</h3>
                    <button onClick={onClick}>X</button>
                </div>
                <div className={styles.cont_popup}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PopUp;