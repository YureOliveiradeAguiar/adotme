export class CreateAnimalDto {
  name: string;
  type: string;
  breed: string;
  ageCategory: 'filhote' | 'adulto' | 'idoso';
  size: string;
  gender: string;
  vaccinated: boolean;
  neutered: boolean;
  description: string;
}
