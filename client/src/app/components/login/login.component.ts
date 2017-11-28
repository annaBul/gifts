import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  email: string ="";
  password: string = "";
  error: string = "";
  
  
  constructor(private loginService:LoginService, 
    private localStorageService: LocalStorageService,
    private router: Router) { 
    this.error ="";
  }

  login($event): void{
    event.preventDefault();
    
    var user = {
      email: this.email,
      password: this.password,
    }

    this.loginService.login(user)
        .subscribe(res => {
          if(res.error){
            this.error = res.error;
         } else {
          if(res.token && res.username && res.id){
            localStorage.setItem('currentUser', JSON.stringify({ token: res.token, username: res.username, id: res.id, role: res.role }));
            this.email ="";
            this.password = "";
            this.router.navigate(['/']);
          }
         }
        });
  }

}
