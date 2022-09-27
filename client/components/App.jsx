import React, { useEffect } from 'react'
import Pin from './Pin'
import AddFruitForm from './AddFruitForm'

import { useDispatch, useSelector } from 'react-redux'
import { fetchFruits } from '../actions'

import Map, { Marker } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import {API_KEY} from '../../secrets'
mapboxgl.accessToken = API_KEY


function App() {
  const fruits = useSelector((state) => state.fruits)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFruits())
  }, [])
  
  const handleClick = (e, fruitId, fruitName) => {
    e.originalEvent.stopPropagation()
    alert(`hello from ${fruitName}`)
  }

  const initialViewState = {
    longitude : 174.7740,
    latitude : -41.2969,
    zoom : 17.15,
  }

  return (
    <div className="app">
      <h2>React Map</h2>
      <div>
        <Map 
          initialViewState={{...initialViewState}}
          style={{width: 600, height: 400}}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          {fruits.map((fruit, i) => {
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
          })}
        </Map>
      </div>
      <div>
        <h3>Reveal a Fruit</h3>
        <p>Click on a Red Marker to Reveal a Fruit</p>
        <h3>Add a Fruit To The Map</h3>
        <AddFruitForm/>
        <h4>Hint:</h4>
        <p>Choose a Latitude between -41.2968 and -41.2970</p>
        <p>Choose a Longitude between 174.773 and 174.775</p>
      </div>
    </div>
  )
}

export default App