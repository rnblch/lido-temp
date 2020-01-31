import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav: any;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      height: '48vh',
      width: '24em',
      disableClose: false,
      hasBackdrop: true
    });
  }

  openSignupDialog(): void {
    this.dialog.open(SignupComponent, {
      height: '65vh',
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
