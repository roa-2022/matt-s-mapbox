exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('fruit')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('fruit').insert([
        { id: 1, name: 'banana', lng: 174.7740, lat: -41.2969 },
        { id: 2, name: 'apple', lng: 174.7730, lat: -41.2969  },
        { id: 3, name: 'feijoa', lng: 174.7750, lat: -41.2969  },
      ])
    })
}
