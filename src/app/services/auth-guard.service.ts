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

export class AdminAuthGuard implements CanActivate{

    constructor() { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(sessionStorage.getItem('isAdmin')=='true'){
            return false;
        }
        return true;
    }
}

@Injectable({ providedIn: 'root' })
export class UserAuthGuard implements CanActivate{

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(sessionStorage.getItem('isUser')=='true'){
            const userdetails = JSON.parse(sessionStorage.getItem('userdetails')!);
            if(userdetails){
                return true;
            }
        }
        this.router.navigate(['/signin']);
        return false;
    }
}