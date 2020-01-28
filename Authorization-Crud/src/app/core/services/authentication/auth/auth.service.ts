import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../features/models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
}

public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

login(username: string, password: string) {
    return this.http.post<any>(`/users/authenticate`, { username, password })
        .pipe(map(user => {
            // вход выполнен успешно, если в ответе есть токен jwt
            if (user && user.token) {
                // сохраняем данные пользователя и токен в локальном хранилище,
                // для входа в систему между обновлениями страниц
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }

            return user;
        }));
}

logout() {
    // удалить пользователя из локального хранилища, при выходе из системы
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
