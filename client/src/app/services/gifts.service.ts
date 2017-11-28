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
}
