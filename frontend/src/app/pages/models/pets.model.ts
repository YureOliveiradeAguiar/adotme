export enum Species {
	Dog = 'DOG',
	Cat = 'CAT',
	Bird = 'BIRD',
	Other = 'OTHER'
}
export enum Breed {
	Labrador = 'LABRADOR',
	Poodle = 'POODLE',
	Persian = 'PERSIAN',
	Mixed = 'MIXED'
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
	name: string;
	species: Species;
	breed: Breed;
	age: number;
	size: Size;
	gender: Gender;
}