import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root' // torna o serviço disponível globalmente
})
export class AnimalService {
	private apiUrl = 'http://localhost:3000/animals';

	constructor(private http: HttpClient) { }

	getAnimals(): Observable<any[]> {
		return this.http.get<any[]>(this.apiUrl);
	}
}
/*
getAnimals() {
		return [
			{ id: 1, name: 'Fido', type: 'Dog', age: 3 },
			{ id: 2, name: 'Mittens', type: 'Cat', age: 4 },
			{ id: 3, name: 'Maquiavel', type: 'Dragon', age: 1687},
		];
	}
*/