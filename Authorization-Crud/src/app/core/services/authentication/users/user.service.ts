import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../../features/models';
import { LoggerService } from '../../logger/logger.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private logger: LoggerService) { }

    public getAll() {
        this.logger.log('Get users success')
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }
}