import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSidenav } from '@angular/material';
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
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {}

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      height: 'auto',
      width: '80vw',
      disableClose: false,
      hasBackdrop: true
    });
  }

  openSignupDialog(): void {
    this.dialog.open(SignupComponent, {
      height: 'auto',
      width: '80vw',
      disableClose: false,
      hasBackdrop: true
    });
  }

  scrollTo(sectionID: string) {
    this.sidenav.close();
    document.getElementById(sectionID).scrollIntoView({ behavior: 'smooth' });
  }

  shouldShowNav() {
    return (
      !this.router.url.includes('verify-email') &&
      !this.router.url.includes('forgot-password')
    );
  }

  goTo(sectionID: string) {
    if (this.authService.isLoggedIn) {
      this.router.navigate([sectionID]);
    } else {
      this.scrollTo(sectionID);
    }
    this.sidenav.close();
  }
}
