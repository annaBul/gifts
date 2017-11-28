import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import { ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../services/project.service';
import {TabsModule} from "ng2-tabs";


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  title;
  project;
  comments;
  supporters;
  newComment = {
    content: ""
  }
  currentUser = null;
  nowDate = Date.now();
  completionDate;

  private routeSubscription: Subscription;
  constructor(private route: ActivatedRoute,
    private projectService: ProjectService){
      if(localStorage.getItem('currentUser')){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      }

      this.routeSubscription = route.params.subscribe(params=>this.title=params['title']);

      this.projectService.getProject(this.title)
      .subscribe(res => {
        if(!res.error){
          this.project = res.project;
          this.project.authorName = res.authorName;

          if(this.project.totalBudget === 0){
            this.project.progress = 0;
          } else {
            this.project.progress =  Math.round(this.project.totalBudget * 100/this.project.budget);            
          }
          var completionDate = new Date(this.project.completionDate);
          var createdDate = new Date(this.project.createdDate);
          this.project.daysLeft = Math.round((completionDate.getTime()- createdDate.getTime()) / (1000*60*60*24));
          this.project.daysOver =  Math.round(( this.nowDate - completionDate.getTime()) / (1000*60*60*24)); ;
          
          this.completionDate = completionDate.getTime();
          this.project.createdDateFormat = this.formatDate(createdDate);
        }
       }
      );
  }

  selectTab(currentTab:any){
    switch(currentTab){
      case 1:{
        this.loadSupporters();
        break;
      }
      case 2:{
        this.loadComments();
        break;
      }
    }

  }

  loadComments(){
    this.projectService.getComments(this.project.title)
    .subscribe(res => {
      if(!res.error){
        this.project.comments = res.comments;
        this.comments = res.comments;
      }
    });
  }

  loadSupporters(){
    this.projectService.getSupporters(this.project.title)
    .subscribe(res => {
      if(!res.error){
        this.project.supporters = res.supporters;
        this.supporters = res.supporters;
        console.log(this.supporters);
      }
    });
  }
  addComment(){
    this.projectService.addComment(this.project, this.newComment)
    .subscribe(res => {
      if(!res.error){
        this.comments.push(res.comment);
        this.newComment.content = '';
      }
    });
  }

  formatDate(date) {    
    var dd = date.getDate();
    if (dd < 10) 
      dd = '0' + dd;    
    var mm = date.getMonth() + 1;
    if (mm < 10) 
      mm = '0' + mm;    
    var yy = date.getFullYear();   
    return dd + '-' + mm + '-' + yy;
  }






  ngOnInit() {
    
  }

}
