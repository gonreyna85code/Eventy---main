import React from 'react';
import  {GoogleApiWrapper, Map,Marker} from 'google-maps-react'
import Places from './Places';
import styles from './styles';
import EventMarker from './EventMarker.png'

export function MapContainer(props){  
  const mapCenter ={
    lat : -34.6036844,
    lng : -58.3815591

  }

 
  

    return (
      <div >
        
        {props.places
          ?<Places
          type={props.type}
          LabelName={props.LabelName}
          />
          :null
        }
        {props.coords?
        <Map 
        containerStyle = {styles.containerStyle}
        style={styles.mapStyle}
        className={styles.container}
        google={props.google}
        initialCenter={{
          lat: props.coords.lat,
          lng: props.coords.lng
        }}
        center={{
          lat: props.coords.lat,
          lng: props.coords.lng
          
        }}
        >
          {props.type==='nearEvents'
          ? 
          props.NearEvents.length>0? 
          props.NearEvents.map((e)=>{
            return(
              <Marker 
              position={{
                lat: e.location.cityCords.lat,
                // lat: -34.546824,
                lng: e.location.cityCords.lng,
                // lng: -58.4826985
              }}
              name={'Current location'} 
              icon={EventMarker}
              
              />

            )

          }):null
          :
          <Marker 
          position={{
            lat: props.coords.lat,
            lng: props.coords.lng
          }}
          name={'Current location'} 
          
          
          />
          }
   
          
        </Map>
        :
        
        <Map 
        style={styles.mapStyle}
      containerStyle = {styles.containerStyle}
      google={props.google}
      initialCenter={{
        lat: mapCenter.lat,
        lng: mapCenter.lng
      }}
      center={{
        lat: mapCenter.lat,
        lng: mapCenter.lng
        
      }}
      >
        
        <Marker 
        position={{
          lat:mapCenter.lat,
          lng:mapCenter.lng
        }}
        name={'Current location'} />
 
        
      </Map>
        
        }
      </div>
    )
  }

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCf8E0lXmJWdgTw6vgsHOcslcUZ4oidnE0'),
  // libraries: ["places"]
})(MapContainer)