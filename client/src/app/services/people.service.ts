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
}