import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { Temperature } from '../../models/Temperature';
import { AuthService } from '../../services/auth.service';
import { TemperatureService } from '../../services/temperature.service';
import { LidoList } from '../lido-list';
import { LidoSearchbarComponent } from '../lido-searchbar/lido-searchbar.component';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('0.25s', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('0.25s', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class SubmitComponent implements OnInit {
  @ViewChild('searchbar', { static: false }) searchbar: LidoSearchbarComponent;
  submitForm: FormGroup;
  filteredOptions: any;
  lidos = LidoList;
  lidoName: any;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private temperatureService: TemperatureService,
    private snackbar: MatSnackBar
  ) {
    this.createForm();
  }

  ngOnInit() {
    window.scroll(0, 0);
  }

  createForm() {
    this.submitForm = this.formBuilder.group({
      waterTemperature: [
        '',
        [Validators.required, Validators.min(-10), Validators.max(50)]
      ],
      areaTemperature: ['', [Validators.min(-10), Validators.max(50)]]
    });
  }

  setLidoName(event: Event) {
    this.lidoName = event;
  }

  onSubmit() {
    const temperatureSubmission: Temperature = {
      lidoName: this.lidoName,
      waterTemperature: this.submitForm.controls.waterTemperature.value,
      areaTemperature: this.submitForm.controls.areaTemperature.value,
      submittedBy: this.authService.userData.email,
      date: new Date()
    };
    this.temperatureService
      .submitTemperature(temperatureSubmission)
      .then(doc => {
        if (doc.id) {
          this.submitForm.reset();
          this.searchbar.lidoSearch.reset();
          this.snackbar.open(
            `Thanks for taking the time to help out today!`,
            'Ok',
            {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              politeness: 'polite',
              panelClass: 'snackbar'
            }
          );
        } else {
          this.snackbar.open(
            `Oops. Something went wrong. Please try again later.`,
            'Ok',
            {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              politeness: 'polite',
              panelClass: 'snackbar'
            }
          );
        }
      });
  }
}
