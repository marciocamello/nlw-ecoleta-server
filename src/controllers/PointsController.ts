import { Request, Response } from 'express'
import Points from '../database/models/Points'
import PointItems from '../database/models/PointItems'

class PointsController {
  async index (request: Request, response: Response): Promise<Response> {
    const { city, uf, items } = request.query

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()))

    const points = await Points.filteredPoints(parsedItems, city, uf)

    return response.json(points)
  }

  async show (request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const point = await Points.show(id)

    if (!point) {
      return response.status(400).json({ message: 'Point not found.' })
    }

    const items = await Points.items(id)

    return response.json({
      point, items
    })
  }

  async create (request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body

    const point = {
      image: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }

    const insertdIds = await Points.save(point)

    const point_id = insertdIds[0]

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id: point_id
      }
    })

    await PointItems.save(pointItems)

    return response.json({
      id: point_id,
      ...point
    })
  }
}

export default new PointsController()
