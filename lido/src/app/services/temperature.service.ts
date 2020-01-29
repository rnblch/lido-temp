import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lido } from '../models/Lido';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  constructor(private http: HttpClient) {}

  getTemperature(lido: string): Observable<Lido> {
    return this.http.get<Lido>(`localhost:8080/${lido}`);
  }
}
