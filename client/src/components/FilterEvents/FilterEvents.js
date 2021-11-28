import styles from './FilterEvents.module.css';
import Select from '../Select/Select';

const ordenar = [{value:"Desc",name:"Descendente"},{value:"Asc",name:"Ascendente"}];
const categories = [{value:"sports",name:"Deportes"},{value:"social",name:"Social"}]
const subcategories=[
    {herencia:"sports",option:[{value:"Maraton"}, {value:"Aeromodelismo"}, {value:"Futbol"}, {value:"Tenis"}, {value:"Handball"}]},
    {herencia:"social",option:[{value:"Fiesta"}, {value:"Reunion"}, {value:"Protesta"}, {value:"Concierto"}]}
];

const FilterEvents = () => {

    const handleChange = () => {}

    return(
        <div className={styles.cont_filtros}>

        <Select
            name="Ordenar por"
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
         {//category === 'social' || category === 'sports' ?
            <Select
              type="a"
              name="subcategory"
              onchange={handleChange}
              default_value="1"
              default_name='Selecciona una Subcategoría'
              herencia={''} options={subcategories}/>

            //: null
            }
        </div>
    );
}

export default FilterEvents;