import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { ImageCompressor } from '../utils/image-compressor.util';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PetsService {

  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
  ) { }

  async create(createPetDto: CreatePetDto, images?: Express.Multer.File[]): Promise<Pet> {
    const compressedImages: string[] = [];

    // Processa as imagens se existirem
    if (images && images.length > 0) {
      for (const image of images) {
        const compressedFilename = `compressed-${image.filename}`;
        const compressedPath = path.join('uploads/pets', compressedFilename);

        await ImageCompressor.compressImage(
          image.path,
          compressedPath,
          70, // qualidade
          800 // largura máxima
        );

        compressedImages.push(compressedFilename);
      }
    }

    // Cria o pet com as imagens comprimidas
    const pet = this.petsRepository.create({
      ...createPetDto,
      images: compressedImages,
    });

    return await this.petsRepository.save(pet);
  }

  findAll() {
    return this.petsRepository.find();
  }

  async findOne(id: string) {
    const pet = await this.petsRepository.findOne({ where: { id } });
    if (!pet) throw new NotFoundException('Pet not found');
    return pet;
  }

  async update(id: string, updatePetDto: UpdatePetDto, images?: Express.Multer.File[]): Promise<Pet> {
    const pet = await this.findOne(id);

    // Se novas imagens foram enviadas
    if (images && images.length > 0) {
      // Remove imagens antigas do sistema de arquivos
      if (pet.images && pet.images.length > 0) {
        for (const oldImage of pet.images) {
          const oldImagePath = path.join('uploads/pets', oldImage);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
      }

      // Comprime as novas imagens
      const compressedImages: string[] = [];
      for (const image of images) {
        const compressedFilename = `compressed-${image.filename}`;
        const compressedPath = path.join('uploads/pets', compressedFilename);

        await ImageCompressor.compressImage(
          image.path,
          compressedPath,
          70,
          800
        );

        compressedImages.push(compressedFilename);
      }

      // Atualiza as imagens do pet
      pet.images = compressedImages;
    }

    // Atualiza os outros campos
    Object.assign(pet, updatePetDto);
    return await this.petsRepository.save(pet);
  }

  async remove(id: string) {
    const pet = await this.findOne(id);

    // Remove as imagens do sistema de arquivos
    if (pet.images && pet.images.length > 0) {
      for (const image of pet.images) {
        const imagePath = path.join('uploads/pets', image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    }

    return await this.petsRepository.remove(pet);
  }

  // Método auxiliar para servir imagens
  getImagePath(filename: string): string {
    return path.join('uploads/pets', filename);
  }
}