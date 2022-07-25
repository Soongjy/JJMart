import { Router,ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, takeUntil } from "rxjs";
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{

    constructor() { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(sessionStorage.getItem('isAdmin')=='true'){
            const admindetails = JSON.parse(sessionStorage.getItem('admindetails')!);
            if(admindetails){
                return true;
            }
        }
        return false;
    }
}