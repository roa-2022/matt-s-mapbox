exports.up = function (knex) {
  return knex.schema.createTable('fruit', (table) => {
    table.increments('id')
    table.string('name')
    table.decimal('lng', 65, 4)
    table.decimal('lat', 65, 4)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('fruit')
}
