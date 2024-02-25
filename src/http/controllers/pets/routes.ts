import { Router } from 'express'
import { createPet } from './create-pet'
import { validateJWT } from '@/http/middlewares/validate-jwt'
import { createAdoptionRequirementsByPet } from './create-adoption-requirements-by-pet'
import { fetchPetsByCity } from './fetch-pets-by-city'

const petRoutes = Router()

petRoutes.post('/pets', validateJWT, createPet)
petRoutes.post(
  '/pets/:id/requirements',
  validateJWT,
  createAdoptionRequirementsByPet,
)
petRoutes.get('/pets', fetchPetsByCity)

export default petRoutes
