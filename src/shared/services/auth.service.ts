import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service'
import { CommonService } from './common.service';
import { PopoverController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loggedIn = false;
  isAdmin = false;

  constructor(
    private router: Router, private http: HttpClient, private userService: UserService,public pc:PopoverController) {
  }

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('curent-user');
    this.loggedIn = false;
    this.isAdmin = false;
    localStorage.clear();
    this.router.navigateByUrl('login');
    await this.pc.dismiss()
  }

  setCurrentUser(res) {
    this.loggedIn = true;
    localStorage.setItem('token', JSON.stringify(res.token));
    delete res.token
    localStorage.setItem('current-user', JSON.stringify(res));
  }

  getCurrentUser() {
    return localStorage.getItem('current-user');
  }

  getLoggedUser() {
    return localStorage.getItem('token');
  }
}

