import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  public log(msg: any) {
    console.log(new Date() + ": "
      + JSON.stringify(msg));
  }

  public warn(msg: any) {
    console.warn(new Date() + ": "
      + JSON.stringify(msg));
  }
}
