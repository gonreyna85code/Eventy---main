import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllEvents } from '../../redux/actions';
import styles from './AllEvents.module.css';
import FilterEvents from '../../components/FilterEvents/FilterEvents';

const AllEvents = () => {
    const dispatch = useDispatch();
    const events = useSelector(state => state.AllEvents);
    const cities = () => {
      let array = events.map(event => event.city);
        let unique = [...new Set(array)];   
        return unique;
    }
    useEffect(()=>{
        dispatch(getAllEvents());
    }, [dispatch]);

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