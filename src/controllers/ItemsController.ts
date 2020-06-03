import { Request, Response } from 'express'
import Items from '../database/models/Items'

class ItemsController {
  async index (request: Request, response: Response): Promise<Response> {
    const items = await Items.index()
    const imageUrl = process.env.IMAGE_URL || 'http://localhost:3333'

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `${imageUrl}/uploads/${item.image}`
      }
    })

    return response.json(serializedItems)
  }
}

export default new ItemsController()
