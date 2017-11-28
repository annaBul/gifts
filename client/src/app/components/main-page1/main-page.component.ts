import { Component } from '@angular/core';
import {ProjectsService} from '../../services/projects.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  title = 'NFI';

  popularProjects;
  recentProjects;

  constructor(private route: ActivatedRoute,
    private projectsService: ProjectsService){
      this.loadPopularProjects();

  }
  selectTab(currentTab:any){
    switch(currentTab){
      case 1:{
        this.loadRecentProjects()
        break;
      }
    }

  }

  loadPopularProjects(){
    this.projectsService.getPopularProjects()
    .subscribe(res => {
      if(!res.error){
        this.popularProjects = res.popularProjects;
      }
    });
  }

  loadRecentProjects(){
    this.projectsService.getRecentProjects()
    .subscribe(res => {
      if(!res.error){
        this.recentProjects = res.recentProjects;
      }
    });
  }
}

