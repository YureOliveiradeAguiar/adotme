import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiUrl = 'http://localhost:3000/animals';

  constructor(private http: HttpClient) {}

  getAnimals(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAnimalById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
