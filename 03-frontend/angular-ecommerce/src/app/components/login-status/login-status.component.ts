import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventBusService } from 'src/app/_shared/event-bus.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent implements OnInit{

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  eventBusSub?: Subscription;

  storage: Storage = sessionStorage;

  constructor(
    private storageService:StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService
  ){}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if(this.isLoggedIn){
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  //待改寫
  getUserDetails(){
    if(this.isLoggedIn){
      // Fetch the logged in user details(user's claims)
      // user full name is exposed as a property name
      
    }
  }

  logout():void{
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
