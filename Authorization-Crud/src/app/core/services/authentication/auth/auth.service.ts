import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../../features/models';
import { LoggerService } from '../../logger/logger.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private logger: LoggerService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
        
    }

    public login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // сохраняем инфо о пользователе и учетн. данные для аутенфикации и переходом между обновлениями страницы
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                this.logger.log(user)
                return user;
            }));
    }

    public logout() {
        // удаляем данные с local при выходе
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.logger.log('Delete data localStorage success')
    }
}