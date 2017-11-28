import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { ActivatedRoute} from '@angular/router';
import {TabsModule} from "ng2-tabs";
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  id: number;
  user;
  people = [];
  favorites = [];
  error: string;
  currentUser = {
    username: ''
  }; 
   
  private routeSubscription: Subscription;
  constructor(private route: ActivatedRoute,
    private userService:UserService){
      if(localStorage.getItem('currentUser') !== null){        
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      } 

      this.routeSubscription = route.params.subscribe(params=>this.id=params['id']);
      
    /*  this.userService.getUser(this.id)
      .subscribe(res => {
        if(res.error){
          this.error = res.error;
       } else {
        if(res.user){
          this.user = res.user;
        }
       }
      });

      this.userService.getUserProjects(this.id)
      .subscribe(res => {
        if(res.error){
          this.error = res.error;
       } else {
        if(res.projects){          
          this.projects = res.projects;
        }
       }
      });*/
  }

  ngOnInit(){
  }

  ngOnDestroy(){
      this.routeSubscription.unsubscribe();
  }

}
