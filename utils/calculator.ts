// @ts-nocheck

import { PriceConfig, Dimensions, CalculationResult, AdditionalItem } from '../types/measurements';

export function calculatePrice(
  dimensions: Dimensions, 
  isThick: boolean, 
  config: PriceConfig,
  kitPrice: number,
  additionalItems: AdditionalItem[]
): CalculationResult {
  const unitSize = isThick ? config.thickUnitSize : config.regularUnitSize;
  const pricePerUnit = isThick ? config.thickPricePerUnit : config.regularPricePerUnit;
  
  const totalLength = (dimensions.width * 2) + (dimensions.height * 2);
  const unitCount = Math.ceil(totalLength / unitSize);
  const materialTotal = unitCount * pricePerUnit;

  const additionalTotal = additionalItems.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = materialTotal + kitPrice + additionalTotal;

  return {
    totalPrice,
    priceBreakdown: {
      width: dimensions.width,
      height: dimensions.height,
      totalLength,
      unitCount,
      pricePerUnit,
      materialTotal
    },
    kitPrice,
    additionalItems
  };
}

