import express from 'express'
import userRoutes from './http/controllers/users/routes'

export const app = express()

app.use(express.json())
app.use(userRoutes)
