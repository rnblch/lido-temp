import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { TemperatureService } from '../../services/temperature.service';
import { LidoList } from '../lido-list';
import { Lido } from '../../models/Lido';

@Component({
  selector: 'app-lido-searchbar',
  templateUrl: './lido-searchbar.component.html',
  styleUrls: ['./lido-searchbar.component.css']
})
export class LidoSearchbarComponent implements OnInit {
  lidoName = new FormControl();
  lidos = LidoList;

  filteredOptions: Observable<Lido[]>;
  selectedLido: string;
  lastTemperature: number;
  openingHours: string;

  constructor(private readonly temperatureService: TemperatureService) {}

  ngOnInit() {
    this.filteredOptions = this.lidoName.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): Lido[] {
    const filterValue = value.toLowerCase();
    return this.lidos.filter(option =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  getTemperature(option: string) {
    this.temperatureService.getTemperature(option).subscribe(lido => {
      this.selectedLido = lido.name;
      this.lastTemperature = lido.lastTemperature;
    });
  }
}
