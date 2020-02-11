import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Lido } from '../../models/Lido';
import { LidoList } from '../lido-list';

@Component({
  selector: 'app-lido-searchbar',
  templateUrl: './lido-searchbar.component.html',
  styleUrls: ['./lido-searchbar.component.css']
})
export class LidoSearchbarComponent implements OnInit, OnDestroy {
  @Output() lidoNameEmitter = new EventEmitter<string>();
  lidoSearch: FormGroup;
  lidos = LidoList;

  filteredOptions: any;
  selectedLido: string;
  lastTemperature: number;
  openingHours: string;
  value: any;
  emptyFunction: (evt: KeyboardEvent) => void;

  constructor(private snackbar: MatSnackBar, public router: Router) {}

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
      map(value => this._filter(value)),
      tap(value => (this.value = value))
    );

    this.emptyFunction = (event: KeyboardEvent) => {
      if (
        event.code === 'ArrowDown' ||
        event.code === 'ArrowUp' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp'
      ) {
        if (
          this.value.length === 1 &&
          this.value[0].name === 'No match found'
        ) {
          event.stopPropagation();
        }
      }
    };

    document.addEventListener('keydown', this.emptyFunction, true);
  }

  private _filter(value: string) {
    if (value) {
      const filterValue = value.toLowerCase();
      const results = this.lidos.filter(option =>
        option.name.toLowerCase().includes(filterValue)
      );
      return results.length ? results : [{ name: 'No match found' }];
    }
  }

  onSelect(option: string) {
    const lidoName = option;
    this.lidoNameEmitter.emit(lidoName);
  }

  goButton() {
    if (this.value[0].name !== 'No match found') {
      this.lidoSearch.get('lidoName').setValue(this.value[0].name);
      this.onSelect(this.value[0].name);
    } else {
      this.snackbar.open(`No match found. Please try a different name.`, 'Ok', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        politeness: 'polite',
        panelClass: 'snackbar'
      });
    }
  }

  _allowSelection(option: Lido): { [className: string]: boolean } {
    return {
      'no-data': option.name === 'No match found'
    };
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.emptyFunction);
  }
}
