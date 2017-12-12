import { Component, OnInit, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import { ActivatedRoute} from '@angular/router';
import {PeopleService} from '../../services/people.service';
import {GiftsService} from '../../services/gifts.service';
import {Popup} from 'ng2-opd-popup';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import {DropdownModule} from "ng2-dropdown";
import {TabsModule} from "ng2-tabs";

const CLOUDYNARY_URL = 'https://api.cloudinary.com/v1_1/dyzdll94h/image/upload';
const CLOUDYNARY_UPLOAD_PRESET = 'xmqxl2si';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.css',
  './ng2-datepicker/src/ng2-datepicker/ng2-datepicker.component.sass']
})
export class PersonPageComponent implements OnInit {

  @ViewChild('popup3') popup3: Popup;
  @ViewChild('popup4') popup4: Popup;

  private person = {
    _id: null,
    name: "",
    holidays: [],
    gifts: []

  }
  
  private routeSubscription: Subscription;
  constructor(private route: ActivatedRoute,
    private peopleService: PeopleService,
    private giftsService: GiftsService,
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



  private newGift = {
    name: "",
    href: "",
    imageUrl: "http://res.cloudinary.com/dyzdll94h/image/upload/v1505994851/bngp74njkqpynfmcn1dx.jpg",
    price: ""
  }
   
  showAddNewGiftPopup(){
    this.popup4.options = {
      header: "Добавление подарка",
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
   
    this.popup4.show(this.popup4.options);
  }

  addNewGiftEvent(){    
    this.giftsService.addGiftToPerson(this.newGift, this.person.name)
    .subscribe(res => {
      if(res.gift){          
        this.person.gifts.push(res.gift);
      }
      this.popup4.hide();
      this.newGift = {
        name: "",
        href: "",
        imageUrl: "http://res.cloudinary.com/dyzdll94h/image/upload/v1505994851/bngp74njkqpynfmcn1dx.jpg",
        price: ""
      };     
    });
  }
  public uploadFile(event: any) { 
    
    const file = event.target.files[0]; 
    const xhr = new XMLHttpRequest(); 
    const fd = new FormData(); 
    
    //fd.append('upload_preset', 'xmqxl2si');
    xhr.open('POST', CLOUDYNARY_URL, true); 
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
    
    xhr.onreadystatechange = (e) => { 
      if (xhr.readyState === 4 && xhr.status === 200) { 
        console.log(JSON.parse(xhr.responseText)); 
        const response = JSON.parse(xhr.responseText); 
        const imgs = document.getElementsByTagName('img'); 
        for (let i = 0; i < imgs.length; i++) { 
          const img = imgs[i]; 
          if (img.id === 'image') { 
            this.newGift.imageUrl = response.secure_url; 
            img.src = response.secure_url; 
            img.alt = response.public_id; 
          } 
        } 
      } 
    };
    fd.append('upload_preset', CLOUDYNARY_UPLOAD_PRESET ); 
    fd.append('file', file); 
    xhr.send(fd);  
  }


}
