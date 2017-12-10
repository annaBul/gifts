import {Input, Component, OnInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent implements OnInit {
  @Input() gift;

  private active =false;
  constructor() { 
  
  }
  onMouseenter($event){
    this.active = true;
  }

  onMouseleave($event){
    this.active = false;
  }
  ngOnInit() {
  }

}
