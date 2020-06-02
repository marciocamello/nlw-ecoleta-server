import express from 'express'

import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = express.Router()

routes.get('/', (request, response) => {
  return response.json({
    message: 'Ecoleta Server API'

  })
})

routes.get('/items', ItemsController.index)

routes.get('/points', PointsController.index)
routes.post('/points', PointsController.create)
routes.get('/points/:id', PointsController.show)

export default routes
