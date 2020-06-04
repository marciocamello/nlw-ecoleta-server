import { Request, Response } from 'express'
import Items from '../database/models/Items'

class ItemsController {
  async index (request: Request, response: Response): Promise<Response> {
    try {
      const items = await Items.index()
      const imageUrl = process.env.BASE_URL

      const serializedItems = items.map(item => {
        return {
          id: item.id,
          title: item.title,
          image_url: `${imageUrl}/uploads/${item.image}`
        }
      })

      return response.json(serializedItems)
    } catch (e) {
      return response.status(400).json({ message: e.message })
    }
  }
}

export default new ItemsController()
