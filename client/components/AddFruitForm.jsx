import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import { sendFruit } from '../actions'

function AddFruitForm() {
  const [formData, setFormData] = useState({})
  
  const dispatch = useDispatch()


  function handleOnChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(sendFruit(formData))
  }
  return(
  <>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" onChange={handleOnChange}/>
      </label>
      <label>
        Latitude:
        <input type="text" name="lat" onChange={handleOnChange}/>
      </label>
      <label>
        Longitude:
        <input type="text" name="lng" onChange={handleOnChange}/>
      </label>
      <input type="submit" value="Submit" />
    </form>
  </>
  ) 
}

export default AddFruitForm