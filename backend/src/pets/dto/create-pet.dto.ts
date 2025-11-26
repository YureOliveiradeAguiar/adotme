import { IsEnum, IsInt, IsString, IsUUID, Min, MaxLength } from 'class-validator';
import { Species, Size, Gender } from '../enums/pet.enums';

export class CreatePetDto {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsEnum(Species)
  species: Species;

  @IsString()
  @MaxLength(50)
  breed: string;

  @IsInt()
  @Min(0)
  age: number;

  @IsEnum(Size)
  size: Size;

  @IsEnum(Gender)
  gender: Gender;
}