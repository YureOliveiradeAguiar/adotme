import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Res,
  StreamableFile,
  Header
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { multerConfig } from '../config/multer.config';

@Controller('pets')
export class PetsController {

  constructor(private readonly petsService: PetsService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 5, multerConfig))
  create(
    @Body() createPetDto: CreatePetDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.petsService.create(createPetDto, images);
  }

  @Get()
  findAll() {
    return this.petsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images', 5, multerConfig))
  update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.petsService.update(id, updatePetDto, images);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(id);
  }
}