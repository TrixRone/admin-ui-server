import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
         private auth: AuthService
    ) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> | Promise <boolean> | boolean {
      if (this.auth.getAuthenticated()) {
            return true;
        }
        return this.auth.isLoggedIn().pipe(map(res => {
          if (res.status) {
            this.auth.setAuthenticated(true);
            return true;
          } else {
            this.router.navigate(['login']);
            return false;
          }
        }));
    }
}
