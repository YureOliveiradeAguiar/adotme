import { IsEnum, IsString, IsBoolean, IsOptional, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { Species, Size, Gender, AgeCategory } from '../enums/pet.enums';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsEnum(Species)
  species: Species;

  @IsString()
  breed: string;

  @IsEnum(AgeCategory)
  ageCategory: AgeCategory;

  @IsEnum(Size)
  size: Size;

  @IsEnum(Gender)
  gender: Gender;

  @IsBoolean()
  @Transform(({ value }) => {
    // Converte string para boolean
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  vaccinated: boolean;

  @IsBoolean()
  @Transform(({ value }) => {
    // Converte string para boolean
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  neutered: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}