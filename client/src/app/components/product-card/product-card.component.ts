import {Input, Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() gift;
  constructor() { }

  ngOnInit() {
  }

}
