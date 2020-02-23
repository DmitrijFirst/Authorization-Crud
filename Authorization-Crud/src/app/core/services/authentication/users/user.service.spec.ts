import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [UserService]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should get users', inject([UserService, HttpTestingController], (service: UserService, beckend: HttpTestingController) => {
    const mockUsers = [];
    expect(service).toBeTruthy();

    service.getAll().subscribe(books =>{
      expect(books).toEqual(mockUsers);
    });

    beckend.expectOne({
      method: 'GET',
      url: `${environment.apiUrl}/users`
    }).flush(mockUsers)
  }));
});
