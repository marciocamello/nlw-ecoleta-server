import express from 'express'
import routes from './routes'
import cors from 'cors'
import path from 'path'
import { errors } from 'celebrate'
import './config'

const app = express()

app.use(cors({
  origin: process.env.ORIGIN_URL
}))
app.use(express.json())
app.use(routes)
app.use(express.urlencoded({ extended: false }))

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

const port = process.env.PORT || 3333

app.use(errors())

app.listen(port, () => {
  console.log(`Start Ecoleta API on port ${port}`)
})
