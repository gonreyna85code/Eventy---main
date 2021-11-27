import React from "react";
import styles from "./Select.module.css";
/*options:
  type A:
  este tipo de select es aquel que depende de otra caracteristica del formulario, por ejemplo, las subcategorias que 
  dependen de la categoria
   la propiedades que recibe son:
        herencia: es la caracteristica de la que depende este select, por ejemplo:
            para la creacion de eventos la subcategoria depende de la categoria entonces herencia:event.category
        options: es un arreglo con todos los conjuntos de posibles opciones con la siguiente forma:
        [{herencia:'valor parametro que debe coincidir con herencia',option:[opciones para esa herencia en especifico]},{...}]
    ejemplo:
    <Select type='a' herencia={event.category} options={[{herencia:'social',option:[{value:"Fiesta",name:"Fiesta"},{value:"Reunion",name:"Reunion"}...]}]}>
*/ 
export default function Select({type,name,onchange,default_value,default_name,herencia,options}){
    if(type==="a"){
        options=options.filter((o)=>o.herencia===herencia);
        options=options.map((o)=>o.option)[0]
    }
    return (
        <select name={name} onChange={onchange} defaultValue={default_value} className={styles.select}>
          <option  value={default_value} disabled>
            {default_name}
          </option>
          {options?.map((o)=><option value={o.value} key={o.value}>{o.name?o.name:o.value}</option>)}
        </select>
    )
}
