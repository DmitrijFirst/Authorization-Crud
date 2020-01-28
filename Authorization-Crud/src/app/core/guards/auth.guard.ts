import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
    ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.authService.currentUserValue;
      if (currentUser) {   
          // проверяем, ограничен ли маршрут ролью
          if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
              // роль не авторизована,  перенаправляем на about
              this.router.navigate(['/']);
              return false;
          }
          return true;
      }

      // не вошли в систему, перенаправляем на страницу входа
      this.router.navigate(['/about'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}
