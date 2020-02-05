import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, QuerySnapshot } from '@angular/fire/firestore';

import { Temperature } from '../models/Temperature';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  constructor(private http: HttpClient, private db: AngularFirestore) {}

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
      window.alert('Something went wrong. Please try again later.');
    }
  }
}
