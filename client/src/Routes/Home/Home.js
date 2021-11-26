import styles from './Home.module.css';
import NavBar from '../NavBar/NavBar';

const Home = () => {
    return(
        <div className='cont-home'>
            <NavBar/>
            <h1 className={styles.titulo}>Eventos Cercanos</h1>
        </div>
    );
}

export default Home;