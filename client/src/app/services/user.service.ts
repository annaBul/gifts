import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { LocalStorageService } from 'angular-2-local-storage';

var baseUrl = "http://localhost:3000";

@Injectable()
export class UserService{
    constructor(private http:Http,
        private localStorageService: LocalStorageService,){
        
    }
    
    getUser(id){        
        return this.http.get(baseUrl+'/user/' + id)
            .map(res => res.json());
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

    getUserFavorites(){
        if(localStorage.getItem('currentUser')){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            let headers = new Headers();
            headers.append('Authorization', currentUser.token); 
            return this.http.get(baseUrl+'/user/favorites', {headers: headers})
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

    saveSettingChanges(user){
        if(localStorage.getItem('currentUser')){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', currentUser.token); 
            return this.http.post(baseUrl+'/user/'+user.id+'/settings', JSON.stringify(user), {headers: headers})
                .map(res => res.json());
        }
    }

    
}