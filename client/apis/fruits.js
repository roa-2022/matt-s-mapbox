import request from 'superagent'

const rootUrl = '/api/v1'

export function getFruits() {
  return request.get(rootUrl + '/fruits').then((res) => {
    return res.body.fruits
  })
}

export function postFruit(fruit) {
  return request.post(rootUrl + '/fruits')
    .send(fruit)
    .then((res) => {
      return res.body
  })
}
