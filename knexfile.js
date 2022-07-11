module.exports = {
  client: 'sqlite3',
  connection: {
    filename: ":memory:"
  },
  migrations: {
    directory: './knex/migrations',
  },
  seeds: {
    directory: './knex/seeds',
  },
  useNullAsDefault: true
}