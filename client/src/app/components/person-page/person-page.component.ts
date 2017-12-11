import { Component, OnInit, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import { ActivatedRoute} from '@angular/router';
import {PeopleService} from '../../services/people.service';
import {Popup} from 'ng2-opd-popup';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import {DropdownModule} from "ng2-dropdown";
import {TabsModule} from "ng2-tabs";

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.css',
  './ng2-datepicker/src/ng2-datepicker/ng2-datepicker.component.sass']
})
export class PersonPageComponent implements OnInit {

  @ViewChild('popup3') popup3: Popup;

  private person = {
    _id: null,
    name: "",
    holidays: [],
    gifts: []

  }
  
  private routeSubscription: Subscription;
  constructor(private route: ActivatedRoute,
    private peopleService: PeopleService,
    private popup:Popup){

      this.routeSubscription = route.params.subscribe(params=>this.person._id=params['id']);

      this.peopleService.getPerson(this.person)
      .subscribe(res => {
        this.person = res.person;
        this.person.holidays.forEach(function(holiday){
          holiday.gifts = [];
        })
      });
  }
  

  ngOnInit() {
  }



  DeleteHoliday(holiday){
    this.peopleService.DeleteHolidayFromPerson(holiday, this.person)
    .subscribe(res => {
      if(res.person){        
        this.person.holidays.splice(this.person.holidays.map(day => day._id).indexOf(holiday._id),1);
      }  
    });
  }

  showOrHideGiftsOfHoliday(holiday){
    if(holiday.gifts.length == 0){
      this.peopleService.getGiftsOfHolidays(holiday)
      .subscribe(res => {
        if(res.holiday){      
          this.person.holidays[this.person.holidays.map(day => day._id).indexOf(holiday._id)] = res.holiday;
          console.log(this.person.holidays);
        }  
      });
    } else {
      this.person.holidays[this.person.holidays.map(day => day._id).indexOf(holiday._id)].gifts = [];
    }
  }







  private newHoliday = {
    name: ""
  }
  date: DateModel;
  options: DatePickerOptions = {
    format: 'DD-MM-YYYY',
    todayText: 'Oggi',
    style: 'big'
  };
  nowDate = Date.now();
   
  showAddNewHolidayPopup(){
    this.popup3.options = {
      header: "Добавление события",
      color: "rgb(92, 32, 64)",  
      widthProsentage: 40, 
      animationDuration: 0.5, 
      showButtons: true, 
      confirmBtnContent: "Добавить", 
      cancleBtnContent: "Отмена", 
      confirmBtnClass: "btn btn-info", 
      cancleBtnClass: "btn btn-info", 
      animation: "fadeInDown" 
  };
   
    this.popup3.show(this.popup3.options);
  }

  addNewHolidayEvent(){    
    this.peopleService.addHolidayToPerson(this.newHoliday, this.person.name)
    .subscribe(res => {
      if(res.holiday){          
        this.person.holidays.push(res.holiday);
      }
      this.popup.hide();
      this.newHoliday = {
        name: ""
      };
      this.date = null;     
    });
  }

}
