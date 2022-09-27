import { getFruits, postFruit } from '../apis/fruits'

export const SET_FRUITS = 'SET_FRUITS'
export const ADD_FRUIT = 'ADD_FRUIT'

export function setFruits(fruits) {
  return {
    type: SET_FRUITS,
    payload: fruits,
  }
}

export function fetchFruits() {
  return (dispatch) => {
    return getFruits().then((fruits) => {
      dispatch(setFruits(fruits))
    })
  }
}

export function addFruit(fruit) {
  return {
    type: ADD_FRUIT,
    payload: fruit
  }
}

export function sendFruit(formData) {
  return (dispatch) => {
    return postFruit(formData).then((fruit) => {
      console.log(fruit)
      dispatch(addFruit(fruit)) //TODO learn how this works
    })
  }
}
