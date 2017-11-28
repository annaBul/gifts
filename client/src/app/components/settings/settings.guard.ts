import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";
 
export class SettingsGuard implements CanActivate{
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
        if(localStorage.getItem('currentUser')){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if(currentUser.id === route.params['id']){
                return true;
            }
          }         
        return false;
    }
}