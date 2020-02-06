import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';

import { Temperature } from '../models/Temperature';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  constructor(
    private http: HttpClient,
    private db: AngularFirestore,
    private snackbar: MatSnackBar
  ) {}

  getTemperatureByLidoName(lidoName: string): Observable<Temperature[]> {
    const temperatureCollection = this.db.collection('/temperatures', ref =>
      ref
        .where('lidoName', '==', lidoName)
        .orderBy('date', 'desc')
        .limit(1)
    );

    return (temperatureCollection.valueChanges() as unknown) as Observable<
      Temperature[]
    >;
  }

  async submitTemperature(temperature: Temperature) {
    try {
      return this.db.collection('temperatures').add(temperature);
    } catch (error) {
      this.snackbar.open(`${error}`, 'Ok', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        politeness: 'polite',
        panelClass: 'snackbar'
      });
    }
  }
}
