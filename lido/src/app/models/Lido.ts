export interface Lido {
  id: string;
  name: string;
  lastTemperature?: number;
  lastUpdated?: Date;
  openingHours?: Hours;
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
