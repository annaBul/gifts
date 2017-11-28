import { Component } from '@angular/core';
import {LoginService} from '../../services/login.service';
import { Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class  RegistrationComponent{
  username: string ="";
  email: string ="";
  password: string = "";
  error: string = "";
  
  constructor(private loginService:LoginService,
    private router: Router) { 
    var newUser = {
      username: this.username,
      email: this.email,
      password: this.password,
  }
  
  }

  registerNewUser(): void{
    if(this.username && this.email && this.password){
      this.error = "";
      event.preventDefault();
      
      var newUser = {
          username: this.username,
          email: this.email,
          password: this.password,
      }
      

      this.loginService.registerNewUser(newUser)
          .subscribe(res => {
            if(res.error){
              this.error = res.error;
            } else {
              console.log("asdf");
              this.username = "";
              this.email ="";
              this.password = "";
              this.router.navigate(['/login']);
              
            }
      });
    }
  }

}
