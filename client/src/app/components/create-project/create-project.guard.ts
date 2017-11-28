import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";
 
export class CreateProjectGuard implements CanActivate{
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
        if(localStorage.getItem('currentUser')){
            console.log('asdf');
            return true;
        }         
        return false;
    }
}