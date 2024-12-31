export interface PriceConfig {
  currency: string;
  thicknessOptions: ThicknessOption[];
  panelModels: PanelModel[];
  anchorKits: AnchorKit[];
  dimensionPriceIncrement: number;
  dimensionIncrementSize: number;
  ivaRate: number;
}

export interface ThicknessOption {
  thickness: number;
  pricePerUnit: number;
}

export interface PanelModel {
  id: number;
  name: string;
  baseWidth: number;
  baseHeight: number;
  basePrice: number;
  baseThickness: number; // Nuevo campo para el grosor base
}

export interface AnchorKit {
  id: number;
  name: string;
  price: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface CalculationResult {
  totalPrice: number;
  priceBreakdown: {
    basePrice: number;
    widthAdjustment: number;
    heightAdjustment: number;
    thicknessPrice: number;
    anchorKitPrice: number;
    additionalItemsTotal: number;
    subtotal: number;
    ivaAmount: number;
  };
  dimensions: Dimensions;
  thickness: number;
  anchorKit: AnchorKit | null;
  additionalItems: AdditionalItem[];
}

export interface AdditionalItem {
  name: string;
  price: number;
}

