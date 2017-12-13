import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { LocalStorageService } from 'angular-2-local-storage';

var baseUrl = "http://localhost:3000";

@Injectable()
export class PeopleService{
    constructor(private http:Http,
        private localStorageService: LocalStorageService,){
        
    } 

    getUserSettings(id){
        if(localStorage.getItem('currentUser')){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            let headers = new Headers();
            headers.append('Authorization', currentUser.token); 
            return this.http.get(baseUrl+'/user/' + id+'/settings', {headers: headers})
                .map(res => res.json());
        }
    }   

    getUserPeople(){
        if(localStorage.getItem('currentUser')){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            let headers = new Headers();
            headers.append('Authorization', currentUser.token); 
            return this.http.get(baseUrl+'/user/people', {headers: headers})
            .map(res => res.json());
        }
    }  

    getPerson(person){
        if(localStorage.getItem('currentUser')){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            let headers = new Headers();
            headers.append('Authorization', currentUser.token); 
            return this.http.get(baseUrl+'/person/'+person._id, {headers: headers})
            .map(res => res.json());
        }
    }  

    addNewPerson(newPerson){
        if(localStorage.getItem('currentUser')){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', currentUser.token); 
            return this.http.post(baseUrl+'/add_person', JSON.stringify(newPerson), {headers: headers})
                .map(res => res.json());
        }
    }

    addHolidayToPerson(newHoliday, personName){
        if(localStorage.getItem('currentUser')){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', currentUser.token); 
            return this.http.post(baseUrl+'/create_holiday', JSON.stringify({holiday: newHoliday,personName: personName}), {headers: headers})
                .map(res => res.json());
        }
    }
    
    DeleteHolidayFromPerson(holiday, person){
        if(localStorage.getItem('currentUser')){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', currentUser.token); 
            return this.http.post(baseUrl+'/delete_holiday/'+ holiday._id, JSON.stringify({personId: person._id}), {headers: headers})
                .map(res => res.json());
        }
    }

    DeletePerson(person){
        if(localStorage.getItem('currentUser')){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            var headers = new Headers();
            headers.append('Authorization', currentUser.token); 
            return this.http.delete(baseUrl+'/delete_person/'+ person._id, {headers: headers})
                .map(res => res.json());
        }
    }

    getGiftsOfHolidays(holiday){
        if(localStorage.getItem('currentUser')){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            let headers = new Headers();
            headers.append('Authorization', currentUser.token); 
            return this.http.get(baseUrl+'/get_holiday/'+holiday._id, {headers: headers})
            .map(res => res.json());
        }
    }  
}