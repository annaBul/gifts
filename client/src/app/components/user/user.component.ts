import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { ActivatedRoute} from '@angular/router';
import {TabsModule} from "ng2-tabs";
import {UserService} from '../../services/user.service';
import {PeopleService} from '../../services/people.service';
import {Popup} from 'ng2-opd-popup';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

const CLOUDYNARY_URL = 'https://api.cloudinary.com/v1_1/dyzdll94h/image/upload';
const CLOUDYNARY_UPLOAD_PRESET = 'xmqxl2si';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css',
  './ng2-datepicker/src/ng2-datepicker/ng2-datepicker.component.sass']
})
export class UserComponent implements OnInit, OnDestroy {

  @ViewChild('popup1') popup1: Popup;

  id: number;
  user;
  people = [];
  favorites = [];
  error: string;
  currentUser = {
    username: ''
  }; 

  private routeSubscription: Subscription;
  constructor(private route: ActivatedRoute,
    private userService:UserService,
    private peopleService:PeopleService,
    private popup:Popup){
      if(localStorage.getItem('currentUser') !== null){        
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      } 

      this.routeSubscription = route.params.subscribe(params=>this.id=params['id']);
      /*
      this.userService.getUser(this.id)
      .subscribe(res => {
        if(res.error){
          this.error = res.error;
       } else {
        if(res.user){
          this.user = res.user;
        }
       }
      });*/

      this.userService.getUserPeople()
      .subscribe(res => {
        if(res.error){
          this.error = res.error;
       } else {
        if(res.people){          
          this.people = res.people;
        }
       }
      });
  }

  ngOnInit(){
  }

  ngOnDestroy(){
      this.routeSubscription.unsubscribe();
  }



  date: DateModel;
  options: DatePickerOptions = {
    format: 'DD-MM-YYYY',
    todayText: 'Oggi',
    style: 'big'
  };
  nowDate = Date.now();
  newPerson = {
    name: "",
    birthDay: null,
    imageUrl: "http://res.cloudinary.com/dyzdll94h/image/upload/v1504852358/img_qm8t9t.jpg"
  };
   
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

  addNewPersonEvent(){
    this.newPerson.birthDay = new Date( +this.date.year, +this.date.month - 1,+this.date.day);
    this.peopleService.addNewPerson(this.newPerson)
    .subscribe(res => {
      if(res.error){
        this.error = res.error;
     } else {
      if(res.person){          
        this.people.push(res.person);
      }
      this.popup.hide();
      this.newPerson = {
        name: "",
        birthDay: null,
        imageUrl: "http://res.cloudinary.com/dyzdll94h/image/upload/v1504852358/img_qm8t9t.jpg"
      };
      this.date = null;
     }
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
          if (img.id === 'user-image') { 
            this.newPerson.imageUrl = response.secure_url; 
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
