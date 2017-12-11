import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { LocalStorageService } from 'angular-2-local-storage';

var baseUrl = "http://localhost:3000";

@Injectable()
export class GiftsService {

  constructor(private http:Http,
    private localStorageService: LocalStorageService,) { }

  getGifts(){        
    return this.http.get(baseUrl+"/gifts")
        .map(res => res.json());
  }   
  getGift(gift){    
    var headers = new Headers();
    headers.append('Content-Type', 'application/json'); 
    return this.http.post(baseUrl+"/gift", JSON.stringify(gift), {headers: headers})
        .map(res => res.json());
  }   

  addGiftToFavorites(gift){
    if(localStorage.getItem('currentUser')){
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', currentUser.token); 
        return this.http.post(baseUrl+'/add_gift_to_favorites', JSON.stringify(gift), {headers: headers})
            .map(res => res.json());
    }
  }

  addGiftToPerson(gift, personName){
    if(localStorage.getItem('currentUser')){
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', currentUser.token); 
        return this.http.post(baseUrl+'/add_gift_to_person', JSON.stringify({gift: gift,personName: personName}), {headers: headers})
            .map(res => res.json());
    }
  }

  addGiftToHoliday(gift, holidayName){
    if(localStorage.getItem('currentUser')){
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', currentUser.token); 
        return this.http.post(baseUrl+'/add_gift_to_holiday', JSON.stringify({gift: gift, holidayName: holidayName}), {headers: headers})
            .map(res => res.json());
    }
  }

  DeleteGiftFromFavorites(gift){
    if(localStorage.getItem('currentUser')){
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', currentUser.token); 
        return this.http.delete(baseUrl+'/delete_gift_from_favorite/'+ gift._id, {headers: headers})
            .map(res => res.json());
    }
  }
  
}
