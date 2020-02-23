import { TestBed, inject } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [LoggerService]
  }));

  it('should be created', () => {
    const service: LoggerService = TestBed.get(LoggerService);
    expect(service).toBeTruthy();
  });

  it('should be write log', inject([LoggerService] , (service: LoggerService) => {
    expect(service.log('Test log')).toBe();
  }));

  it('should be write warn', inject([LoggerService] , (service: LoggerService) => {
    expect(service.warn('Test warn')).toBe();
  }));

});
