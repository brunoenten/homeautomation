exports.up = async function (knex) {
  // Create device table
  await knex.schema.createTable('devices', (table) => {
    table.increments("id", {
      primaryKey: true,
    });
    table.string("name").notNullable()
    table.integer("type_id").notNullable() // FK to types.id
    table.integer("room_id").notNullable() // FK to rooms.id
    table.string("settings")
    table.string("state")
  })

  // Create rooms table
  await knex.schema.createTable('rooms', (table) => {
    table.increments("id", {
      primaryKey: true,
    });
    table.string("name").notNullable()
  })

  // Create types table
  await knex.schema.createTable('types', (table) => {
    table.increments("id", {
      primaryKey: true,
    });
    table.string("name").notNullable()
    table.string("settings").notNullable()
  })
}

exports.down = async function (knex) {
  await knex.raw('DROP TABLE devices CASCADE')
  await knex.raw('DROP TABLE rooms CASCADE')
  await knex.raw('DROP TABLE types CASCADE')
}