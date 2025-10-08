import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class Api {
	private baseUrl = 'http://localhost:3000'; // NestJS backend, modify here later

	constructor(private http: HttpClient) { }

	getUsers(): Observable<any> {
		return this.http.get(`${this.baseUrl}/users`);
	}

	addUser(userData: any): Observable<any> {
		return this.http.post(`${this.baseUrl}/users`, userData);
	}
}