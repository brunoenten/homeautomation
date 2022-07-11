import { getKnex } from '../../knex'

export default async function handler(req, res) {

  const {
    method
  } = req

  const knex = await getKnex()

  switch (method) {
    case 'GET':
      const rows = await knex.select('*').from('devices')
      return res.status(200).json(rows)
    case 'POST':
      const created = await knex('devices').insert(req.body, ['id', 'name'])
      return res.status(201).json(created)
    default:
      return res.status(400)
  }
}