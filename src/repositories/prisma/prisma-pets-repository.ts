import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from '@prisma/client'
import {
  CreateAdoptionRequirementsParams,
  FindPetsByCityParams,
  PetsRepository,
} from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateWithoutPetImageInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async createAdoptionRequirements({
    petId,
    requirements,
  }: CreateAdoptionRequirementsParams) {
    await prisma.adoptionRequirement.createMany({
      data: requirements.map((text) => ({
        text,
        pet_id: petId,
      })),
    })
  }

  async findByCity({
    city,
    state,
    type,
    energyLevel,
    independenceLevel,
    ambientType,
  }: FindPetsByCityParams) {
    const whereCondition: Prisma.PetWhereInput = {
      User: {
        city,
        state,
      },
    }

    if (type !== undefined) {
      whereCondition.type = type
    }
    if (energyLevel !== undefined) {
      whereCondition.energy_level = energyLevel
    }
    if (independenceLevel !== undefined) {
      whereCondition.independence_level = independenceLevel
    }
    if (ambientType !== undefined) {
      whereCondition.ambient_type = ambientType
    }

    const pets = await prisma.pet.findMany({
      where: whereCondition,
      include: {
        User: true,
        AdoptionRequirement: true,
        PetImage: true,
      },
    })

    return pets
  }
}
