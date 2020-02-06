import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('1s', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('1s', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  name: string;
  email: string;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private snackbar: MatSnackBar
  ) {
    this.createForm();
    this.setSnackbarConfig();
  }
  ngOnInit() {}

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    const { name, email, message } = this.form.value;
    const date = Date();
    const html = `
      <div>From: ${name}</div>
      <div>Email: <a href="mailto:${email}">${email}</a></div>
      <div>Date: ${date}</div>
      <div>Message: ${message}</div>
    `;
    const formRequest = { name, email, date, html };
    this.contactService.submitMessage(formRequest).then(res => {
      if (res.id) {
        this.snackbar.open(`Thanks, we'll be in touch soon.`, 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'left',
          politeness: 'polite',
          panelClass: 'snackbar'
        });
        this.form.reset();
        this.removeValidators(this.form);
      } else {
        this.snackbar.open(
          `Oops. Something went wrong. Please try again later.`,
          'Ok',
          {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'left',
            politeness: 'polite',
            panelClass: 'snackbar'
          }
        );
      }
    });
  }

  private removeValidators(form: FormGroup) {
    for (const key in this.form.controls) {
      if (key) {
        form.get(key).clearValidators();
        form.get(key).updateValueAndValidity();
      }
    }
  }

  setSnackbarConfig() {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.verticalPosition = 'top';
    config.horizontalPosition = 'left';
    config.politeness = 'polite';
    config.panelClass = ['snackbar'];
  }
}
