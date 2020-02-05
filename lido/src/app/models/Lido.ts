// tslint:disable: ban-types
export interface Lido {
  id?: string;
  name: string;
  lat: Number;
  long: Number;
  lastTemperature?: number;
  lastUpdated?: Date;
  infoWindow?: string;
}

export interface OpenClose {
  open: string;
  close: string;
}
