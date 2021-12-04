import React,{ useState} from 'react';
import  {GoogleApiWrapper, Map,Marker} from 'google-maps-react'
import Places from './Places';
import styles from './styles';



export function MapContainer(props){
  // const cityCords = useSelector(state=>state.cityCords)
  const [showingInfoWindow, setShowingInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker]= useState({})
  const [selectedPlace, setSelectedPlace] = useState({})
  const [mapCenter, setMapCenter]= useState({
    lat : -34.6036844,
    lng : -58.3815591
  })

  function onMarkerClick (props, marker, e){
    setSelectedPlace(props)
    setActiveMarker(marker)
    setShowingInfoWindow(true)

  }

  function onMapClicked (props) {
    if (showingInfoWindow) {
      setShowingInfoWindow(true)
      setActiveMarker(null)
    }
    
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
        onClick={onMapClicked}>
          <Marker onClick={onMarkerClick}
          position={{
            lat: props.coords.lat,
            lng: props.coords.lng
          }}
          name={'Current location'} />
   
          
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
      onClick={onMapClicked}>
        
        <Marker onClick={onMarkerClick}
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