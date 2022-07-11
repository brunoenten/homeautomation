import { getKnex } from '../../../knex'

export default async function handler(req, res) {

  const {
    query: { did },
    method,
  } = req

  const knex = await getKnex()
  const device = await knex('devices').where({id: did}).first
  if (device == undefined) {
    return res.status(404)
  }

  switch (method) {
    case 'GET':
      res.status(200).json(device)
    case 'PUT':
      delete req.body.id
      console.log(req.body)
      await knex('devices').where({id: did}).update(req.body)
      res.status(200).json(req.body)
    default:
      res.status(400)
  }

}