import styles from './FilterEvents.module.css';
import Select from '../Select/Select';

const ordenar = [{value:"asc",name:"Ascendente"},{value:"desc",name:"Descendente"}];
const categories = [{value:"sports",name:"Deportes"},{value:"social",name:"Social"}]
const subcategories=[
    {herencia:"sports",option:[{value:"Maraton"}, {value:"Aeromodelismo"}, {value:"Futbol"}, {value:"Tenis"}, {value:"Handball"}]},
    {herencia:"social",option:[{value:"Fiesta"}, {value:"Reunion"}, {value:"Protesta"}, {value:"Concierto"}]}
];

const FilterEvents = ({stateFiltros, handleChange, cities}) => {

    
    return(
        <div className={styles.cont_filtros}>

        <Select
            name="orden"
            onchange={handleChange}
            default_value="1"
            default_name='Selecciona un tipo de orden'
            options={ordenar}
        />

        <Select
            name="category"
            onchange={handleChange}
            default_value="1"
            default_name='Selecciona una Categoría'
            options={categories}  
        />
         {  stateFiltros.category === 'social' || stateFiltros.category === 'sports' ?
            <Select
              type="a"
              name="subcategory"
              onchange={handleChange}
              default_value="1"
              default_name='Selecciona una Subcategoría'
              herencia={stateFiltros.category} options={subcategories}/>

            : null
            }

        {  cities && cities.length > 0 ?

            <Select
                name="location"
                onchange={handleChange}
                default_value="1"
                default_name='Selecciona una Locación'
                options={cities}
            />
            :``


        }
        </div>
    );
}

export default FilterEvents;