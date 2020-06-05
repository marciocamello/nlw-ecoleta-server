import { Request, Response } from 'express'
import Points from '../database/models/Points'
import PointItems from '../database/models/PointItems'

class PointsController {
  async index (request: Request, response: Response): Promise<Response> {
    try {
      const { city, uf, items } = request.query

      const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()))

      const points = await Points.filteredPoints(parsedItems, city, uf)

      const serializedPoints = points.map(point => {
        return {
          ...point,
          image_url: `${process.env.BASE_URL}/uploads/${point.image}`
        }
      })

      return response.json(serializedPoints)
    } catch (e) {
      return response.status(400).json({ message: e.message })
    }
  }

  async show (request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params

      const point = await Points.show(id)

      if (!point) {
        return response.status(400).json({ message: 'Point not found.' })
      }

      const serializedPoint = {
        ...point,
        image_url: `${process.env.BASE_URL}/uploads/${point.image}`
      }

      const items = await Points.items(id)

      return response.json({
        serializedPoint, items
      })
    } catch (e) {
      return response.status(400).json({ message: e.message })
    }
  }

  async create (request: Request, response: Response): Promise<Response> {
    try {
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
        image: request.file.filename,
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

      const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
          return {
            item_id,
            point_id: point_id
          }
        })

      const serializedPoint = {
        ...point,
        image_url: `${process.env.BASE_URL}/uploads/${point.image}`
      }

      await PointItems.save(pointItems)

      return response.json({
        id: point_id,
        ...serializedPoint
      })
    } catch (e) {
      return response.status(400).json({ message: e.message })
    }
  }
}

export default new PointsController()
