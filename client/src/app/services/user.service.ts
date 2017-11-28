import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class UserService{
    constructor(private http:Http,
        private localStorageService: LocalStorageService,){
        
    }
    
    getUser(id){        
        return this.http.get('http://localhost:3000/user/' + id)
            .map(res => res.json());
    }    

    getUserSettings(id){
        if(localStorage.getItem('currentUser')){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            let headers = new Headers();
            headers.append('Authorization', currentUser.token); 
            return this.http.get('http://localhost:3000/user/' + id+'/settings', {headers: headers})
                .map(res => res.json());
        }
    }   

    getUserProjects(id){
        let headers = new Headers();
        return this.http.get('http://localhost:3000/user/' + id+'/projects', {headers: headers})
            .map(res => res.json());
    }  

    saveSettingChanges(user){
        if(localStorage.getItem('currentUser')){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', currentUser.token); 
            return this.http.post('http://localhost:3000/user/'+user.id+'/settings', JSON.stringify(user), {headers: headers})
                .map(res => res.json());
        }
    }
}