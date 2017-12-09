import { Component, OnInit, ViewChild } from '@angular/core';
import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'add-person-modal',
  templateUrl: './add-person-modal.component.html',
  styleUrls: ['./add-person-modal.component.css']
})
export class AddPersonModalComponent implements OnInit {
  newPerson ={};

  constructor(private popup:Popup) {
    this.popup.show();
   }

   showAddNewPersonPopup(){
    this.popup.options = {
      header: "Добавление человека",
      color: "rgb(92, 32, 64)",  
      widthProsentage: 40, 
      animationDuration: 0.5, 
      showButtons: true, 
      confirmBtnContent: "Добавить", 
      cancleBtnContent: "Отмена", 
      confirmBtnClass: "btn btn-info", 
      cancleBtnClass: "btn btn-info", 
      animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
  };
   
    this.popup.show(this.popup.options);
  }
  ngOnInit() {
    
  }

}
