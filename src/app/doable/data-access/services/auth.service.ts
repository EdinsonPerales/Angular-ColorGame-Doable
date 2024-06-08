import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthUser } from '../../interfaces/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #baseUrl = 'https://doable-api-production.up.railway.app';
  #http    = inject(HttpClient);

  login(user : AuthUser) : Observable<string>{
    return this.#http.post<string>(`${this.#baseUrl}/`)
  }
}
