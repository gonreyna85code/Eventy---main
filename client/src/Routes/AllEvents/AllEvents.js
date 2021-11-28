import styles from './AllEvents.module.css';
import FilterEvents from '../../components/FilterEvents/FilterEvents';

const AllEvents = () => {

    return(
        <div className={styles.cont_all_events}>
            <div className={styles.cont_header}>
                <h1>Todos Los Eventos</h1>
            </div>
            <FilterEvents/>

        </div>
    );

}

export default AllEvents;