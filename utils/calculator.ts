import { PanelModel, Dimensions, AnchorKit, AdditionalItem, CalculationResult, PriceConfig, ThicknessOption } from '../types/measurements';

export function calculatePrice(
  panel: PanelModel,
  dimensions: Dimensions,
  thickness: ThicknessOption,
  config: PriceConfig,
  anchorKit: AnchorKit | null,
  additionalItems: AdditionalItem[] = []
): CalculationResult {
  const basePrice = panel.basePrice;
  
  // Ajuste por dimensiones
  const widthAdjustment = Math.max(0, Math.floor((dimensions.width - panel.baseWidth) / config.dimensionIncrementSize)) * config.dimensionPriceIncrement;
  const heightAdjustment = Math.max(0, Math.floor((dimensions.height - panel.baseHeight) / config.dimensionIncrementSize)) * config.dimensionPriceIncrement;

  // Precio por grosor
  const thicknessPrice = thickness.thickness > 10 ? thickness.pricePerUnit : 0;

  // Precio del kit de anclaje
  const anchorKitPrice = anchorKit ? anchorKit.price : 0;

  // Total de items adicionales
  const additionalItemsTotal = additionalItems.reduce((sum, item) => sum + item.price, 0);

  // Subtotal
  const subtotal = basePrice + widthAdjustment + heightAdjustment + thicknessPrice + anchorKitPrice + additionalItemsTotal;

  // Cálculo de IVA
  const ivaAmount = config.ivaRate > 0 ? subtotal * (config.ivaRate / 100) : 0;

  // Precio total
  const totalPrice = subtotal + ivaAmount;

  return {
    totalPrice,
    priceBreakdown: {
      basePrice,
      widthAdjustment,
      heightAdjustment,
      thicknessPrice,
      anchorKitPrice,
      additionalItemsTotal,
      subtotal,
      ivaAmount
    },
    dimensions,
    thickness: thickness.thickness,
    anchorKit,
    additionalItems
  };
}

