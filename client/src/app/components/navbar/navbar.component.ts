import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import {LoginService} from '../../services/login.service';
import { Router} from '@angular/router';
import {DropdownModule} from "ng2-dropdown";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string = '';
  id: number;
  currentUser = null;
 // currentUser;

  constructor(private localStorageService: LocalStorageService,
    private loginService:LoginService,
    private router: Router,
    
  ) {
    
   }

  ngOnInit() {   
    if(localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
       this.id = this.currentUser.id;
       this.username = this.currentUser.username;
    }
  }

  logout($event): void{
    event.preventDefault();
    if(localStorage.getItem('currentUser')){
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.loginService.logout(currentUser)
          .subscribe(res => {
            if(!res.error){
              this.username = '';
              this.id = null;
              localStorage.removeItem('currentUser');
              currentUser =null;
              this.router.navigate(['/login']);            
          }
      });
    };
  }

}
