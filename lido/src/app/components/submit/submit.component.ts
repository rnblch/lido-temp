import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {
  form: FormGroup;
  lidoName: string;
  temperature: number;
  thanksLabel: boolean;
  errorLabel: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {
    this.createForm();
  }
  ngOnInit() {
    window.scroll(0, 0);
  }

  createForm() {
    this.form = this.formBuilder.group({
      lidoName: ['', Validators.required],
      temperature: ['', Validators.required]
    });
  }

  onSubmit() {
    /*
    const { lidoName, temperature } = this.form.value;
    const date = Date();
    const formRequest = { lidoName, temperature, date };
    this.form.reset();
    */
  }
}
