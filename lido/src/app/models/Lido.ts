// tslint:disable: ban-types
export interface Lido {
  id?: string;
  name: string;
  lat: Number;
  long: Number;
  lastTemperature?: number;
  lastUpdated?: Date;
  openingHours?: Hours;
  infoWindow?: string;
}

export interface Hours {
  monday: OpenClose;
  tuesday: OpenClose;
  wednesday: OpenClose;
  thursday: OpenClose;
  friday: OpenClose;
  saturday: OpenClose;
  sunday: OpenClose;
}

export interface OpenClose {
  open: string;
  close: string;
}
