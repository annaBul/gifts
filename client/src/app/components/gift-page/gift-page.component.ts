import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { GiftsService } from '../../services/gifts.service';
import { UserService } from '../../services/user.service';
import { PeopleService } from '../../services/people.service';
import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-gift-page',
  templateUrl: './gift-page.component.html',
  styleUrls: ['./gift-page.component.css']
})
export class GiftPageComponent implements OnInit {

  @ViewChild('popup1') popup1: Popup;

  private gift = {
    name: '',
    imageUrl: '',
    price:'',
    href: ""
  };
  private querySubscription: Subscription;
  constructor(private route: ActivatedRoute,
    private giftsService: GiftsService,
    private userService: UserService,
    private peopleService: PeopleService,
    private popup:Popup){
       
      this.querySubscription = route.queryParams.subscribe(
          (queryParam: any) => {
              this.gift.href = queryParam['gift'];
              this.loadGift();
          }
      );
  }

  loadGift(){
    this.giftsService.getGift(this.gift)
    .subscribe(res => {
      if(!res.error){
        this.gift = res.gift;
      }
    });
  }

  addGiftToFavorites(){
    this.giftsService.addGiftToFavorites(this.gift)
    .subscribe(res => {
      if(!res.error){
        
      }
    });
  }

  addGiftToHoliday(holidayName){
    this.giftsService.addGiftToHoliday(this.gift, holidayName)
    .subscribe(res => {
      if(!res.error){
        
      }
    });
  }
  ngOnInit() {
  }


  private people;
  private selectedPersonName;

  showAddGiftToPersonPopup(){

    this.userService.getUserPeople()
    .subscribe(res => {
      if(res.people){          
        this.people = res.people;
        if(this.people.length != 0){
          this.selectedPersonName = this.people[0].name;
        }
      }
    });
    this.popup.options = {
      header: "Добавление подарка другу",
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

  addGiftToPersonEvent(){
   
    this.giftsService.addGiftToPerson(this.gift, this.selectedPersonName)
    .subscribe(res => {
      if(res.person){          
        this.people.push(res.person);
      }
      this.popup.hide();
    });
  }

  changeSelectedPerson($event){
    this.selectedPersonName = $event.target.value;
  }




}
