import React,{useState} from 'react';
import  { InfoWindow,Marker, GoogleMap} from '@react-google-maps/api'
import Places from './Places';
import styles from './styles';
import EventMarker from './EventMarker.png'
import { Link } from 'react-router-dom';
// import GoogleMap from 'google-maps-react'


export default function MapContainer(props){
  
  const mapCenter = {lat : -34.6036844,lng : -58.3815591}
  const [activeMarker, setActiveMarker] = useState()
  const center= {lat: props.coords?.lat,lng: props.coords?.lng}

 

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
        (<GoogleMap 
          mapContainerStyle = {styles.containerStyle}
          style={styles.mapStyle}
          zoom={11}
          onClick={()=>{
            setActiveMarker(null)
          }}
          center={center}
        >
          {activeMarker
            ?(<InfoWindow
            position={{lat:activeMarker.location.cityCords.lat, lng:activeMarker.location.cityCords.lng}}
            onCloseClick={()=>{
              setActiveMarker(null)
            }}
            >
              <div >
                {console.log(activeMarker)}
                <h3>
                evento:
                <Link to={`/detailEvent/${activeMarker.name}`}> {activeMarker.name}</Link>

                </h3>
                <h3>fecha: {activeMarker.date}</h3>
                <h3>tipo de evento : {activeMarker.category + ', ' + activeMarker.subcategory}</h3>
              </div>
            </InfoWindow>)
            :null
          }




          {props.type==='nearEvents'
          
          
          ? (props.NearEvents.length>0? 
            props.NearEvents?.map((e)=>{
              return(
                activeMarker?null:
                <Marker 
                key={props.NearEvents.indexOf(e)}
                onClick={()=>{
                  setActiveMarker(e)
                }}
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

            }):null)
          :
          <Marker 
          position={{
            lat: props.coords.lat,
            lng: props.coords.lng
          }}
          name={'Current location'} 
          
          
          />
          }

  
          
        </GoogleMap>)
        :
        
        <GoogleMap 
        style={styles.mapStyle}
      mapContainerStyle = {styles.containerStyle}
      zoom={11}
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
 
        {activeMarker
        ?(<InfoWindow
        position={{lat:activeMarker.lat, lng:activeMarker.lng}}
        >
          <div>
            hola
          </div>
        </InfoWindow>)
        :null
        }
        
      </GoogleMap>
        
        }
      </div>
    )
  }

