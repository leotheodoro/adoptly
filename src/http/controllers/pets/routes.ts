import { Router } from 'express'
import { createPet } from './create-pet'
import { validateJWT } from '@/http/middlewares/validate-jwt'
import { createAdoptionRequirementsByPet } from './create-adoption-requirements-by-pet'
import { fetchPetsByCity } from './fetch-pets-by-city'
import { petDetails } from './pet-details'

const petRoutes = Router()

petRoutes.post('/pets', validateJWT, createPet)
petRoutes.post(
  '/pets/:id/requirements',
  validateJWT,
  createAdoptionRequirementsByPet,
)
petRoutes.get('/pets', fetchPetsByCity)
petRoutes.get('/pets/:id', petDetails)

export default petRoutes
