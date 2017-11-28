import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';
import { Router} from '@angular/router';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  
  projectTitle;
  supporter = {
    contribution: ""
  }

  private routeSubscription: Subscription;
  private querySubscription: Subscription;
  constructor(private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router) { 
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
          this.projectTitle = queryParam['project_title'];
      }
    );
  }

  ngOnInit() {

  }

  support($event){
    if(+this.supporter.contribution > 0)
    {
      this.projectService.addSupporter(this.projectTitle, this.supporter)
      .subscribe(res => {
        if(!res.error){
          this.supporter.contribution = '';
          this.router.navigate(['/project/'+ this.projectTitle]);
        }
      });
    }
  }

}
