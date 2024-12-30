export interface PriceConfig {
  regularPricePerUnit: number;
  thickPricePerUnit: number;
  regularUnitSize: number;
  thickUnitSize: number;
  currency: string;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface AdditionalItem {
  name: string;
  price: number;
}

export interface CalculationResult {
  totalPrice: number;
  priceBreakdown: {
    width: number;
    height: number;
    totalLength: number;
    unitCount: number;
    pricePerUnit: number;
    materialTotal: number;
  };
  kitPrice: number;
  additionalItems: AdditionalItem[];
}

