import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {

  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
  ) { }

  create(createPetDto: CreatePetDto) {
    const pet = this.petsRepository.create(createPetDto);
    return this.petsRepository.save(pet);
  }

  findAll() {
    return this.petsRepository.find();
  }

  async findOne(id: string) {
    const pet = await this.petsRepository.findOne({ where: { id } });
    if (!pet) throw new NotFoundException('Pet not found');
    return pet;
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    const pet = await this.findOne(id);
    Object.assign(pet, updatePetDto);
    return this.petsRepository.save(pet);
  }

  async remove(id: string) {
    const pet = await this.findOne(id);
    return this.petsRepository.remove(pet);
  }
}