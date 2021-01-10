import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/loginRequest.model';

const BASEURL = 'http://localhost:3000/api/chatapp';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<LoginRequest> {
    return this.http.post<LoginRequest>(`${BASEURL}/register`, user);
  }

  loginUser(user: User): Observable<LoginRequest> {
    return this.http.post<LoginRequest>(`${BASEURL}/login`, user);
  }
}
