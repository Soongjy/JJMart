import { Router,ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, takeUntil } from "rxjs";
import { Injectable } from '@angular/core';
import { UserService } from "./user.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{

    constructor(private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const userdetails = JSON.parse(localStorage.getItem('userdetails')||"[]");
        var privilege = userdetails.privilege;
        if(privilege == 1){
            return true;
        }
        return false;
    }
}