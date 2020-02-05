import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  thanksLabel: boolean;
  errorLabel: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) {
    this.createForm();
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
    const formRequest = { name, email, message, date };
    this.contactService.submitMessage(formRequest).then(res => {
      if (res.id) {
        this.thanksLabel = true;
        this.errorLabel = false;
        this.form.reset();
      } else {
        this.thanksLabel = false;
        this.errorLabel = true;
      }
    });
  }
}
