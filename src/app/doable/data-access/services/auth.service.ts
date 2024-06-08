import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse, AuthUser } from '../../interfaces/auth.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #baseUrl = 'https://doable-api-production.up.railway.app';
  #http    = inject(HttpClient);

  login(user : AuthUser) : Observable<string>{
    return this.#http.post<AuthResponse>(`${this.#baseUrl}/login`,user)
                     .pipe(map((resp)=>resp.token));
  }

  signup(user : AuthUser) : Observable<string>{
    return this.#http.post<AuthResponse>(`${this.#baseUrl}/signup`,user)
                     .pipe(map((resp)=>resp.token));;
  }

  logout(token : string) : Observable<void>{
    return this.#http.delete<void>(`${this.#baseUrl}/logout`,{
      headers : {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  deleteUser(token : string) : Observable<void>{
    return this.#http.delete<void>(`${this.#baseUrl}/profile`,{
      headers : {
        Authorization: `Bearer ${token}`,
      }
    })
  }
}
