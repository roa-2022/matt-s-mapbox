import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchFruits } from '../actions'
import mapboxgl from '!mapbox-gl'
import {API_KEY} from '../../secrets'

mapboxgl.accessToken = API_KEY

function App() {
  const fruits = useSelector((state) => state.fruits)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchFruits())
  }, [])

  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(174.7740)
  const [lat, setLat] = useState(-41.2969)
  const [zoom, setZoom] = useState(17.15)

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    })
  })

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4))
      setLat(map.current.getCenter().lat.toFixed(4))
      setZoom(map.current.getZoom().toFixed(2))
    })
  })

  return (
    <>
      <div className="app">
        <div>
          <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <div ref={mapContainer} className="map-container" />
        </div>
      </div>
    </>
  )
}

export default App
