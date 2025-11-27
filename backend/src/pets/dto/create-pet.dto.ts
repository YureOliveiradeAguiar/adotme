import { IsEnum, IsString, IsUUID, MaxLength, IsBoolean, IsOptional, IsArray } from 'class-validator';
import { Species, Size, Gender, AgeCategory } from '../enums/pet.enums';

export class CreatePetDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsEnum(Species)
  species: Species;

  @IsString()
  @MaxLength(50)
  breed: string;

  @IsEnum(AgeCategory)
  ageCategory: AgeCategory;

  @IsEnum(Size)
  size: Size;

  @IsEnum(Gender)
  gender: Gender;

  @IsBoolean()
  vaccinated: boolean;

  @IsBoolean()
  neutered: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}