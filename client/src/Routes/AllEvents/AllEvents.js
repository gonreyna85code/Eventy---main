import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styles from './AllEvents.module.css';
import FilterEvents from '../../components/FilterEvents/FilterEvents';
import {getAllEvents, getByCat, getBySub, getByCity, filterByName, getAllCities} from '../../redux/actions';
import CardEvent from '../../components/CardEvent';
import Loading from '../Landing'



const AllEvents = () => {
     //const dispatch = useDispatch();
     //const events = useSelector(state => state.AllEvents);
    // const cities = () => {
    //   let array = events.map(event => event.city);
    //     let unique = [...new Set(array)];   
    //     return unique;
    // }
    // useEffect(()=>{
    //     dispatch(getAllEvents());
    // }, [dispatch]);

    const filtrosInicialState = {
        orden: null,
        category: 'Todas',
        subcategory: 'Todas',
        location: 'Todas'
    }

    let actionFilters = {
        category: getByCat,
        subcategory: getBySub,
        location: getByCity,
        orden: filterByName
    }

    const dispatch = useDispatch();
    const eventos = useSelector(state => state.Filtrados);
    const [filtros, setFiltros] = useState(filtrosInicialState);
    const cities = useSelector(state => state.Cities);
    const [citiesFormateadas, setCitiesFormateas] = useState([])

    useEffect(()=>{
        dispatch(getAllEvents());
    }, [dispatch])

    useEffect(()=>{
        dispatch(getAllCities());
    }, [eventos, dispatch]);


    useEffect(()=>{
        let formato = cities.map( e => { return {value:e, name: e}} )
        setCitiesFormateas(formato)
    }, [eventos, dispatch]);
    
    const handleFilters = (e) => {
        dispatch( actionFilters[e.target.name](e.target.value) )
        setFiltros( {...filtros, [e.target.name]: e.target.value }) 
    }
    
    
    

    return(
        <div className={styles.cont_all_events}>
            <div className={styles.cont_header}>
                <h1>Todos Los Eventos</h1>
            </div>
            <FilterEvents stateFiltros={filtros} handleChange={handleFilters} cities={citiesFormateadas}/>
            {
                eventos && eventos.length > 0 ?
                    <div className={styles.cont_listado_eventos}>
                        {
                            eventos.map( evento => evento.name && evento.name.length > 0
                                                    ?
                                                        <CardEvent
                                                            name={evento.name}
                                                            img={evento.info.hasOwnProperty('image') ? evento.info.image : ``}
                                                            location={evento.location}
                                                            date={evento.date}
                                                            id={evento._id}
                                                            buttonColor='naranja'
                                                        />

                                                     : null

                                    )
                        }
                    </div>

                : <Loading/>
            }
        </div>
    );

}

export default AllEvents;