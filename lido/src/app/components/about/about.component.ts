/// <reference types="@types/googlemaps" />
import { LidoList } from '../lido-list';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

declare let google: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  markers = LidoList;
  map: google.maps.Map;
  coordinates = new google.maps.LatLng(
    this.markers[8].lat,
    this.markers[8].long
  );
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 10
  };
  bounds = new google.maps.LatLngBounds();
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.markers.forEach(marker => {
      const position = new google.maps.LatLng(marker.lat, marker.long);
      this.bounds.extend(position);
      const googleMarker = new google.maps.Marker({
        position,
        map: this.map,
        title: marker.name
      });
      const infowindow = new google.maps.InfoWindow({
        content: marker.infoWindow
      });
      google.maps.event.addListener(googleMarker, 'click', () => {
        this.map.setZoom(14);
        this.map.setCenter(googleMarker.getPosition());
        infowindow.open(this.map, googleMarker);
      });
      google.maps.event.addListener(googleMarker, 'mouseover', () => {
        infowindow.open(this.map, googleMarker);
      });
      google.maps.event.addListener(googleMarker, 'mouseout', () => {
        infowindow.close();
      });
    });
  }
}
