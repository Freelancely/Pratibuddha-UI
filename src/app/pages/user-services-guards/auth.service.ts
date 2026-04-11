import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  public token$ = this.tokenSubject.asObservable();

  private logoutSubject = new Subject<void>();
  public onLogout$ = this.logoutSubject.asObservable();

  constructor(private http: HttpClient) {} // ✅ FIXED: HttpClient

  register(userData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/register`, userData)
      .pipe(
        tap((response: any) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.tokenSubject.next(response.token);
          }
        })
      );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/login`, credentials)
      .pipe(
        tap((response: any) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.tokenSubject.next(response.token);
            localStorage.setItem('role', response.role || 'Customer');
            localStorage.setItem('email', response.email || credentials.email);
            localStorage.setItem('userId', response.userId || '');
          }
        })
      );
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/profile`, { headers: this.getAuthHeaders() });
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    this.tokenSubject.next(null);
    this.logoutSubject.next();
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'SuperAdmin' || localStorage.getItem('role') === 'Admin';
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }
}
