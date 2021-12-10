import React from 'react';
import styles from './PopUp.module.css';

const PopUp = ({children, estatus, onClick}) => {
    
    return(
        <div className={estatus ? styles.popup_active : styles.popup_disabled}>
            <div className={styles.popup}>
                <div className={styles.closeBtn}>
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