import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { TemperatureService } from '../../services/temperature.service';

@Component({
  selector: 'app-lido-searchbar',
  templateUrl: './lido-searchbar.component.html',
  styleUrls: ['./lido-searchbar.component.css']
})
export class LidoSearchbarComponent implements OnInit {
  lidoName = new FormControl();
  lidos: string[] = [
    'Beckenham Place',
    'Brockwell',
    'Charlton',
    'Finchley',
    'Hampstead Heath - Men',
    'Hampstead Heath - Women',
    'Hampstead Heath - Mixed',
    'London Fields',
    'Oasis',
    'Park Road',
    'Parliament Hill',
    'Royal Docks',
    'Serpentine',
    'Tooting Bec',
    'Uxbridge'
  ];

  filteredOptions: Observable<string[]>;
  selectedLido: string;
  lastTemperature: number;

  constructor(private readonly temperatureService: TemperatureService) {}

  ngOnInit() {
    this.filteredOptions = this.lidoName.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.lidos.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  getTemperature(option: string) {
    this.temperatureService.getTemperature(option).subscribe(lido => {
      this.selectedLido = lido.name;
      this.lastTemperature = lido.lastTemperature;
    });
  }
}
