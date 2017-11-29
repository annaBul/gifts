import {  Input, Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit  {
  @Input() person;
  

  constructor() {
   }

  ngOnInit() { 
  }
}
