import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav: any;
  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      height: 'auto',
      width: '24em',
      disableClose: false,
      hasBackdrop: true
    });
  }

  openSignupDialog(): void {
    this.dialog.open(SignupComponent, {
      height: 'auto',
      width: '24em',
      disableClose: false,
      hasBackdrop: true
    });
  }

  scrollTo(sectionID: string) {
    this.sidenav.close();
    document.getElementById(sectionID).scrollIntoView({ behavior: 'smooth' });
  }
}
