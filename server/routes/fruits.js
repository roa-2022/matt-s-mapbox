const express = require('express')

const db = require('../db/fruits')

const router = express.Router()

router.get('/', (req, res) => {
  db.getFruits()
    .then((results) => {
      res.json({ fruits: results.map((fruit) => fruit) })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.post('/', (req, res) => {
  let returnId
  db.addFruit(req.body)
    .then((results) => {
      returnId = results
    })
    .then(() => {
      return db.getFruit(returnId)
    })
    .then((results) => {
      res.json(results[0])
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

module.exports = router
