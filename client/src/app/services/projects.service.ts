import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectsService{
    constructor(private http:Http){
        
    }
    getPopularProjects(){
        return this.http.get('http://localhost:3000/projects/popular')
            .map(res => res.json());
    }

    getRecentProjects(){
        return this.http.get('http://localhost:3000/projects/recent')
            .map(res => res.json());
    }

}