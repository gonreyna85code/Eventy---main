import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { changeUserCity , changeEventCity} from "../../redux/actions";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
// import GoogleApiWrapper  from 'google-maps-react'
// import {Loader} from "@googlemaps/js-api-loader"
import styles from "./styles";





export default function Places (props){
  const [direccion, setDireccion] = useState('')
  const dispatch = useDispatch()
 

  function handleChange (address){
    setDireccion(address)
  };
 
  function handleSelect (address){
    geocodeByAddress(address)
    .then(async(results) => {
      let cityName=results[0].formatted_address
      let cityCords = await getLatLng(results[0])
      let payload = {cityCords,cityName}
      setDireccion(cityName)
      if (props.type === 'event') {
        dispatch(changeEventCity(payload))
      }else if (props.type === 'user'){
        dispatch(changeUserCity(payload))
      }
      
    })
    
    .catch(error => console.error('Error', error));
  };
  
  return (
    <div>

    <PlacesAutocomplete
              value={direccion}
              onChange={handleChange}
              onSelect={handleSelect}
              >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <div style ={styles.placesStyle.containerStyle}>
                    <label style= {styles.placesStyle.labelStyle}>
                      {`${props.LabelName}:`}
                    </label>
                    <input 
                    style={styles.placesStyle.inputStyle}
                    {...getInputProps({
                        autoComplete:'off',
                        placeholder: 'Encuentra tu Ciudad...',
                        className: 'location-search-input',
                      })}
                    />

                  </div>
                  <div style={styles.placesStyle.suggestionContainer} className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? styles.placesStyle.suggestionActiveStyle
                        : styles.placesStyle.suggestionStyle;
                      return (
                        <div key= {suggestion.index}
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
      </PlacesAutocomplete>
    </div>
  )
}



