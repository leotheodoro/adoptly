import { Router } from 'express'
import { createPet } from './create-pet'
import { validateJWT } from '@/http/middlewares/validate-jwt'
import { createAdoptionRequirementsByPet } from './create-adoption-requirements-by-pet'
import { fetchPetsByCity } from './fetch-pets-by-city'
import { petDetails } from './pet-details'
import multer from 'multer'

const petRoutes = Router()

const upload = multer({
  dest: './tmp',
})

petRoutes.post('/pets', validateJWT, createPet)
petRoutes.post(
  '/pets/:id/requirements',
  validateJWT,
  createAdoptionRequirementsByPet,
)
petRoutes.get('/pets', fetchPetsByCity)
petRoutes.get('/pets/:id', petDetails)
petRoutes.put(
  '/pets/upload',
  upload.array('images', 5),
  (request, response) => {
    const { file } = request

    console.log(file)

    return response.send()
  },
)

export default petRoutes
