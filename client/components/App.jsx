import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchFruits } from '../actions'

import Map, {Source, Layer} from 'react-map-gl'
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
      {type: 'Feature', geometry: {type: 'Point', coordinates: [174.7730, -41.2969]}},
      {type: 'Feature', geometry: {type: 'Point', coordinates: [174.7750, -41.2969]}},
    ]
  }

  const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 15,
      'circle-color': '#007cbf'
    }
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
            <Source id="my-data" type="geojson" data={geojson}>
              <Layer {...layerStyle} />
            </Source>
          </Map>
        </div>
      </div>
    </>
  )
}

export default App
