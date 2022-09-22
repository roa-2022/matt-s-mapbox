import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchFruits } from '../actions'

import Map, {Marker, Source, Layer} from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import {API_KEY} from '../../secrets'
mapboxgl.accessToken = API_KEY



function App() {
  const fruits = useSelector((state) => state.fruits)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchFruits())
  }, [])


  const [lng, setLng] = useState(174.7740)
  const [lat, setLat] = useState(-41.2969)
  const [zoom, setZoom] = useState(17.15)

  // Here is some hard coded data
  // In future, it will later be partially replaced by data from server
  const geojson = {
    type: 'FeatureCollection',
    features: [
    ]
  }

  fruits.forEach(fruit => {
    geojson.features.push(
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [fruit.lng, fruit.lat]
        },
        properties: {
          id: fruit.id,
          name: 'Name goes here'
        }
      }
    )
  });



  const pointLayerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 15,
      'circle-color': '#007cbf'
    }
  }

  // const handleClick = (e) => {
  //   console.log(e)
  // }


  // PIN
  const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  fill: '#d00',
  stroke: 'none'
};

function Pin() {

  return (
    <svg height={20} viewBox="0 0 24 24" style={pinStyle}>
      <path d={ICON} />
    </svg>
  );
}

const handleClick = (e, fruitId, fruitName) => {
  e.originalEvent.stopPropagation()
  console.log(e)
  console.log(fruitId)
  console.log(fruitName)
}


  return (
    <>
      <div className="app">
        <h2>React Map</h2>
        <div>
          <Map 
            initialViewState={{
              longitude: lng,
              latitude: lat,
              zoom: zoom
            }}
            style={{width: 600, height: 400}}
            mapStyle="mapbox://styles/mapbox/streets-v11"
          >
            {
            fruits.map((fruit, i) => {
              return  <Marker
                        key={`${fruit.name}${i}`}
                        longitude={fruit.lng}
                        latitude={fruit.lat}
                        onClick={(e) => {
                          handleClick(e, fruit.id, fruit.name)
                        }}
                      >
                        <Pin/>
                      </Marker>
            })
            }
          </Map>
        </div>
      </div>
    </>
  )
}

export default App