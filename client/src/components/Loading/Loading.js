import React from 'react'
import {ReactComponent as Img} from './spinning-circles.svg'
import styles from './Loading.module.css'

const Loading = () => {
    return(
        <div className={styles.loading}>
            <Img/>
        </div>
    )
}

export default Loading;