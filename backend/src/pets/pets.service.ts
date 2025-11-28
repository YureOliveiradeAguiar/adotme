import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
    private configService: ConfigService,
  ) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async create(createPetDto: CreatePetDto, images?: Express.Multer.File[]): Promise<Pet> {
    const uploadedImages: string[] = [];

    if (images && images.length > 0) {
      for (const file of images) {
        const url = await this.uploadToCloudinary(file);
        uploadedImages.push(url);
      }
    }

    const pet = this.petsRepository.create({
      ...createPetDto,
      images: uploadedImages,
    });

    return await this.petsRepository.save(pet);
  }

  async update(id: string, updatePetDto: UpdatePetDto, images?: Express.Multer.File[]): Promise<Pet> {
    const pet = await this.findOne(id);

    if (images && images.length > 0) {
      const uploadedImages: string[] = [];
      for (const file of images) {
        const url = await this.uploadToCloudinary(file);
        uploadedImages.push(url);
      }
      pet.images = uploadedImages;
    }

    Object.assign(pet, updatePetDto);
    return await this.petsRepository.save(pet);
  }

  async remove(id: string): Promise<Pet> {
    const pet = await this.findOne(id);
    return await this.petsRepository.remove(pet);
  }

  async findOne(id: string): Promise<Pet> {
    const pet = await this.petsRepository.findOne({ where: { id } });
    if (!pet) throw new NotFoundException('Pet not found');
    return pet;
  }

  findAll(): Promise<Pet[]> {
    return this.petsRepository.find();
  }

  private uploadToCloudinary(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'pets' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result?.secure_url!);
        }
      );
      Readable.from(file.buffer).pipe(stream);
    });
  }
}
