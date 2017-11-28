import {  Input, Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, AfterViewInit  {
  @Input() project;
  

  constructor() {
   }

  ngOnInit() { 
  }
  @ViewChild('progress') progress_bar: ElementRef
  
    ngAfterViewInit() {
      if(this.project.totalBudget === 0){
        this.project.progress = 0;
        this.progress_bar.nativeElement.style.width = "0%";
      } else {
        this.project.progress = this.project.totalBudget * 100/this.project.budget;
        this.progress_bar.nativeElement.style.width = this.project.progress + "%";
      }
    }

}
