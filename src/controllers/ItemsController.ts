import { Request, Response } from 'express'
import Items from '../database/models/Items'

class ItemsController {
  async index (request: Request, response: Response): Promise<Response> {
    const items = await Items.index()

    const serializedItems = items.map(item => {
      return {
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`
      }
    })

    return response.json(serializedItems)
  }
}

export default new ItemsController()
