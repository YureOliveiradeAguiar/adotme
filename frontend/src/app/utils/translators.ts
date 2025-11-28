export const translator = {
    species: (v: string) => v === 'DOG' ? 'Cachorro' : 'Gato',
    gender: (v: string) => v === 'MALE' ? 'Macho' : 'Fêmea',
    size: (v: string) => v === 'SMALL' ? 'Pequeno' : v === 'MEDIUM' ? 'Médio' : 'Grande',
    age: (v: string) => v === 'FILHOTE' ? 'Filhote' : v === 'ADULTO' ? 'Adulto' : 'Idoso'
};