export const reverseTranslator = {
    species: (v: string): string => {
        return v === 'Cachorro' ? 'DOG' : 'CAT';
    },

    gender: (v: string): string => {
        return v === 'Macho' ? 'MALE' : 'FEMALE';
    },

    size: (v: string): string => {
        if (v === 'Pequeno') return 'SMALL';
        if (v === 'Médio') return 'MEDIUM';
        return 'LARGE';
    },

    age: (v: string): string => {
        if (v === 'Filhote') return 'FILHOTE';
        if (v === 'Adulto') return 'ADULTO';
        return 'IDOSO';
    }
};