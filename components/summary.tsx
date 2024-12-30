import React from 'react';
import { CalculationResult, PriceConfig } from '../types/measurements';
import '../styles/pdf.css';

interface SummaryProps {
  result: CalculationResult;
  config: PriceConfig;
}

export const Summary: React.FC<SummaryProps> = ({ result, config }) => {
  return (
    <div className="summary-container">
      <h1>Resumen de Cálculo</h1>
      
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
        <p>Precio del kit: {result.kitPrice}{config.currency}</p>
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
        <h2>Precio Total</h2>
        <p>{result.totalPrice}{config.currency}</p>
      </div>
    </div>
  );
};

