import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../shared/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, private router: Router) { }

  canActivate() {
    if (this.auth.getLoggedUser()) {
      return true;
    } else {
      this.router.navigateByUrl('login');
    }
  }

}
