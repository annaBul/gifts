import {Input, Component, OnInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent implements OnInit {
  @Input() gift;

  constructor() { 
  
  }

  ngOnInit() {
  }

}
