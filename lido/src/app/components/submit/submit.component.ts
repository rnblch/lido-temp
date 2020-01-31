import { ContactService } from 'src/app/services/contact.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: [
    './submit.component.css',
    '../lido-searchbar/lido-searchbar.component.css'
  ]
})
export class SubmitComponent implements OnInit {
  form: FormGroup;
  lidoName: string;
  temperature: number;
  thanksLabel: boolean;
  errorLabel: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }
  ngOnInit() {}

  createForm() {
    this.form = this.formBuilder.group({
      lidoName: ['', Validators.required],
      temperature: ['', Validators.required]
    });
  }

  onSubmit() {
    const { lidoName, temperature } = this.form.value;
    const date = Date();
    const formRequest = { lidoName, temperature, date };
    this.form.reset();
  }
}
