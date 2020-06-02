import express from 'express'
import routes from './routes'
import cors from 'cors'
import path from 'path'

const app = express()

app.use(express.json())
app.use(routes)
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(3333)
