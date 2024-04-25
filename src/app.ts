import express from 'express'
import userRoutes from './http/controllers/users/routes'
import petRoutes from './http/controllers/pets/routes'

export const app = express()

app.use(express.json())
app.use(userRoutes)
app.use(petRoutes)

app.get('/', (request, response) => {
  return response.json({ status: 'Server working' })
})
