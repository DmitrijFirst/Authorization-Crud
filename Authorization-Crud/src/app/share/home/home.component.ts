import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/features/models';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/authentication/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
