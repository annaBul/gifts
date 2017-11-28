import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService{
    constructor(private http:Http){
        
    }
    
    registerNewUser(newUser){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/registration', JSON.stringify(newUser), {headers: headers})
            .map(res => res.json());
    }

    login(user){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/login', JSON.stringify(user), {headers: headers})
            .map(res => res.json());
    }

    logout(currentUser){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/logout', JSON.stringify(currentUser), {headers: headers})
            .map(res => res.json());
    }
    
}