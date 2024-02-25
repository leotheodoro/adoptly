import { Router } from 'express'
import { createPet } from './create-pet'
import { validateJWT } from '@/http/middlewares/validate-jwt'
import { createAdoptionRequirementsByPet } from './create-adoption-requirements-by-pet'

const petRoutes = Router()

petRoutes.post('/pets', validateJWT, createPet)
petRoutes.post(
  '/pets/:id/requirements',
  validateJWT,
  createAdoptionRequirementsByPet,
)

export default petRoutes
