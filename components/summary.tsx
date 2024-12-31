import React from 'react';
import { CalculationResult, PriceConfig, PanelModel, AnchorKit } from '../types/measurements';

interface SummaryProps {
  result: CalculationResult;
  config: PriceConfig;
  panel: PanelModel;
  anchorKit: AnchorKit;
}

export const Summary: React.FC<SummaryProps> = ({ result, config, panel, anchorKit }) => {
  return (
    <div className="summary-container">
      <h1>Resumen de Cálculo</h1>
      
      <div className="section">
        <h2>Modelo de Panel</h2>
        <p>{panel.name}</p>
      </div>

      <div className="section">
        <h2>Dimensiones</h2>
        <p>Ancho: {result.priceBreakdown.width}cm</p>
        <p>Alto: {result.priceBreakdown.height}cm</p>
        <p>Perímetro total: {result.priceBreakdown.totalLength}cm</p>
      </div>

      <div className="section">
        <h2>Detalles del Material</h2>
        <p>Tipo de material: {result.priceBreakdown.pricePerUnit === config.thickPricePerUnit ? 'Grueso' : 'Regular'}</p>
        <p>Unidades necesarias: {result.priceBreakdown.unitCount}</p>
        <p>Precio por unidad: {result.priceBreakdown.pricePerUnit}{config.currency}</p>
        <p>Subtotal material: {result.priceBreakdown.materialTotal}{config.currency}</p>
      </div>

      <div className="section">
        <h2>Kit de Anclaje</h2>
        <p>{anchorKit.name}: {anchorKit.price}{config.currency}</p>
      </div>

      {result.additionalItems.length > 0 && (
        <div className="section">
          <h2>Elementos Adicionales</h2>
          <ul>
            {result.additionalItems.map((item, index) => (
              <li key={index}>{item.name}: {item.price}{config.currency}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="total-price">
        <h2>Precio Total (IVA incluido)</h2>
        <p>{result.totalPrice.toFixed(2)}{config.currency}</p>
      </div>
    </div>
  );
};

