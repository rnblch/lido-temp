import { Component, OnInit } from '@angular/core';

import { TemperatureService } from '../../services/temperature.service';

@Component({
  selector: 'app-temperature-display',
  templateUrl: './temperature-display.component.html',
  styleUrls: ['./temperature-display.component.css']
})
export class TemperatureDisplayComponent implements OnInit {
  selectedLido: string;
  latestWaterTemperature: number;
  temperatureLabel: boolean;
  sorryLabel: boolean;
  latestAreaTemperature: number;
  lastUpdated: Date;
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
      } else {
        this.temperatureLabel = false;
        this.sorryLabel = true;
      }
    });
  }
}
