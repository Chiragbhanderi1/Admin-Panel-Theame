import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

function MapContainer(props) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const onMarkerClick = (props, marker) => {
    setActiveMarker(marker);
    setSelectedPlace(props);
    
    // Set the label of the selected marker when it's clicked
  };
 
  return (
    <div style={{position:"relative", width: '100%', height: props.height }}>
    <Map
      google={props.google} 
      zoom={11}
      initialCenter={{ lat: props.addresses[0].coordinates[0], lng: props.addresses[0].coordinates[1] }}
      style={{position:"relative", width: '100%', height: '100%' }}
    >
      {props.addresses.map((address, index) => (
        <Marker
          key={index}
          position={{ lat: address.coordinates[0], lng: address.coordinates[1] }}
          onClick={onMarkerClick}
          name={address.label} 
          link={address.link}// Use the label property from the address object
        />
      ))}

      <InfoWindow
        marker={activeMarker}
        visible={!!activeMarker}
      >
        <div>
          <a href={selectedPlace?.link}><span>{selectedPlace && selectedPlace.name}</span></a>
        </div>
      </InfoWindow>
    </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
