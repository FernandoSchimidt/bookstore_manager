import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { User } from '../register/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  readonly url = environment.apiURL + 'users'


  constructor(
    private http: HttpClient
  ) { }

  save(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
}
