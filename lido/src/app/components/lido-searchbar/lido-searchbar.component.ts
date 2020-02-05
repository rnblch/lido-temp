import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Lido } from '../../models/Lido';
import { TemperatureService } from '../../services/temperature.service';
import { LidoList } from '../lido-list';

@Component({
  selector: 'app-lido-searchbar',
  templateUrl: './lido-searchbar.component.html',
  styleUrls: ['./lido-searchbar.component.css']
})
export class LidoSearchbarComponent implements OnInit {
  @Output() lidoNameEmitter = new EventEmitter<string>();
  lidoSearch: FormGroup;
  lidos = LidoList;

  filteredOptions: Observable<Lido[]>;
  selectedLido: string;
  lastTemperature: number;
  openingHours: string;

  constructor() {}

  ngOnInit() {
    this.createForm();
    this.initalizeFilter();
  }

  createForm() {
    this.lidoSearch = new FormGroup({
      lidoName: new FormControl('')
    });
  }

  initalizeFilter() {
    this.filteredOptions = this.lidoSearch.controls.lidoName.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): Lido[] {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.lidos.filter(option =>
        option.name.toLowerCase().includes(filterValue)
      );
    }
  }

  onSelect(option: string) {
    this.lidoNameEmitter.emit(option);
  }
}
