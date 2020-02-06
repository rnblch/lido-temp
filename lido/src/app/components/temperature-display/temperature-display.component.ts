import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { TemperatureService } from '../../services/temperature.service';
import { LidoList } from '../lido-list';

@Component({
  selector: 'app-temperature-display',
  templateUrl: './temperature-display.component.html',
  styleUrls: ['./temperature-display.component.css'],
  animations: [
    trigger('inOut', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger('60ms', animate('500ms ease-out', style({ opacity: 1 })))
        ]),
        query(':leave', animate('200ms', style({ opacity: 0 })))
      ])
    ])
  ]
})
export class TemperatureDisplayComponent implements OnInit {
  selectedLido: string;
  latestWaterTemperature: number;
  temperatureLabel: boolean;
  sorryLabel: boolean;
  latestAreaTemperature: number;
  lastUpdated: Date;
  lidos = LidoList;
  openingHours: any;
  constructor(private temperatureService: TemperatureService) {}

  ngOnInit() {}

  getLatestTemperature(event: string) {
    this.selectedLido = event;
    this.temperatureService.getTemperatureByLidoName(event).subscribe(doc => {
      if (doc[0]) {
        this.temperatureLabel = true;
        this.sorryLabel = false;
        this.latestWaterTemperature = doc[0].waterTemperature;
        this.latestAreaTemperature = doc[0].areaTemperature;
        this.lastUpdated = doc[0].date;
        this.openingHours = this.getOpeningHours(doc[0].lidoName);
      } else {
        this.temperatureLabel = false;
        this.sorryLabel = true;
      }
    });
  }

  private getOpeningHours(lidoName: string): string {
    const lidoMapper = this.lidos.filter(lido => {
      return lido.name === lidoName;
    });

    const lidoRegexArray = lidoMapper[0].infoWindow.match(
      /<p class="ub400">.*/g
    );

    return lidoRegexArray.join('\n');
  }
}
