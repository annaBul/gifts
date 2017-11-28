import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class AdminService{
    constructor(private http:Http,
        private localStorageService: LocalStorageService,){
        
    }

    getUsers(){
        if(localStorage.getItem('currentUser')){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            let headers = new Headers();
            headers.append('Authorization', currentUser.token); 
            return this.http.get('http://localhost:3000/admin/users', {headers: headers})
                .map(res => res.json());
        }
    }   

    changeUserBlocked(userId){
        if(localStorage.getItem('currentUser')){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', currentUser.token); 
            return this.http.post('http://localhost:3000/admin/user/blocked',  JSON.stringify({userId}), {headers: headers})
                .map(res => res.json());
        }
    }   

    changeUserRole(user){
        if(localStorage.getItem('currentUser')){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', currentUser.token); 
            return this.http.post('http://localhost:3000/admin/user/role',  JSON.stringify({user}), {headers: headers})
                .map(res => res.json());
        }
    }  

}