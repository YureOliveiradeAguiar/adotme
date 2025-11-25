export enum Species {
	Dog = 'DOG',
	Cat = 'CAT',
}
export enum Breed {
	Labrador = 'LABRADOR',
	Poodle = 'POODLE',
	Persian = 'PERSIAN',
	CDR = 'CDR'
}
export enum Size {
	Small = 'SMALL',
	Medium = 'MEDIUM',
	Large = 'LARGE'
}
export enum Gender {
	Male = 'MALE',
	Female = 'FEMALE'
}
export interface Pet {
	id: string,
	name: string,
	species: Species,
	breed: Breed,
	age: number,
	size: Size,
	gender: Gender
}