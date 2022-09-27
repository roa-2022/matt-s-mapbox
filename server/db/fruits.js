const connection = require('./connection')

function getFruit(id, db = connection) {
  return db('fruit').select().where({ id: id })
}

function getFruits(db = connection) {
  return db('fruit').select()
}

function addFruit(data, db = connection) {
  return db('fruit').insert(data)
}

module.exports = {
  getFruits,
  addFruit,
  getFruit
}
