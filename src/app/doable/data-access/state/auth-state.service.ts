import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NEVER, Observable, Subject, catchError, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthResponse, AuthState, AuthUser } from '../../interfaces/auth.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  #authService = inject(AuthService);

  //sources
  login$      = new Subject<AuthUser>();
  signup$     = new Subject<AuthUser>();
  logout$     = new Subject<void>();

  //State
  #state = signal<AuthState>({
    token   : null,
    loading : true,
    error   : null,
  })

  //Selectors
  token       = computed(() => this.#state().token);
  loading     = computed(() => this.#state().loading);
  error       = computed(() => this.#state().error);

  //Reducers
  constructor(){
    const initialToken = localStorage.getItem('token');
    if(initialToken){
      this.#resetAuthState();
      this.#setToken(initialToken);
    }

    this.login$.pipe(
      takeUntilDestroyed(),
      tap(() => this.#setLoading(true)),
      switchMap((credentials)=>
        this.#authService.login(credentials).pipe(this.#setCatchError()))
    ).subscribe((token:any)=>{
      this.#setLoading(false);
      this.#setToken(token);
      this.#setError(null);
      localStorage.setItem('token',token);
    })

    this.signup$.pipe(
      takeUntilDestroyed(),
      tap(() => this.#setLoading(true)),
      switchMap((credentials)=>
        this.#authService.signup(credentials).pipe(this.#setCatchError()))
    ).subscribe((token:any)=>{
      this.#setLoading(false);
      this.#setToken(token);
      this.#setError(null);
      localStorage.setItem('token',token);
    })

    this.logout$.pipe(
      takeUntilDestroyed(),
      tap(() => this.#setLoading(true)),
      switchMap((credentials)=>
        this.#authService.logout(this.token()||'').pipe(this.#setCatchError()))
    ).subscribe(()=>{
      this.#resetAuthState();
      localStorage.clear();
    })
  }

  //Utilities
  #setToken(token : AuthState['token']){
    this.#state.update( (prev) => ({
      ...prev,
      token
    }));
  }

  #setLoading(loading : AuthState['loading']){
    this.#state.update( (prev) => ({
      ...prev,
      loading
    }))
  }

  #setError(value : any){
    const errResume = value ? {
      status      : value.status,
      name        : value.name,
      description : value.error.errors[0],
    } : value;

    this.#state.update( (prev) => ({
      ...prev,
      error : errResume
    }));
  }

  #resetAuthState(){
    this.#state.set({
      token   : null,
      loading : false,
      error   : null,
    })
  }

  #setCatchError() {
    return catchError((error: any) => {
      this.#resetAuthState();
      this.#setError(error);
      return NEVER;
    });
  }
}
