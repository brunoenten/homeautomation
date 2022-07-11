import knex from 'knex'
import config from '../knexfile.js'

/**
 * Global is used here to ensure the connection
 * is cached across hot-reloads in development
 *
 * see https://github.com/vercel/next.js/discussions/12229#discussioncomment-83372
 */
export async function getKnex() {
  if (!global.cachedKnex) {
    global.cachedKnex = knex(config)
    await global.cachedKnex.migrate.latest()
    await global.cachedKnex.seed.run(config)
  }
  return global.cachedKnex
}