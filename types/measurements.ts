export interface PriceConfig {
  regularPricePerUnit: number;
  thickPricePerUnit: number;
  regularUnitSize: number;
  thickUnitSize: number;
  currency: string;
}

export interface PresetMeasurement {
  name: string;
  width: number;
  height: number;
}

