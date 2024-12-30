// @ts-nocheck

import React from 'react';
import { CalculationResult, PriceConfig } from '../types/measurements';

interface SummaryProps {
  result: CalculationResult;
  config: PriceConfig;
}

export const Summary: React.FC<SummaryProps> = ({ result, config }) => {
  return (
    <div className="p-8 bg-white" style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6, color: '#333' }}>
      <h1 style={{ fontSize: '24px', color: '#2c3e50', marginBottom: '20px' }}>Resumen de Cálculo</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', color: '#34495e', marginTop: '15px', marginBottom: '10px' }}>Dimensiones</h2>
        <p>Ancho: {result.priceBreakdown.width}cm</p>
        <p>Alto: {result.priceBreakdown.height}cm</p>
        <p>Perímetro total: {result.priceBreakdown.totalLength}cm</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', color: '#34495e', marginTop: '15px', marginBottom: '10px' }}>Detalles del Material</h2>
        <p>Tipo de material: {result.priceBreakdown.pricePerUnit === config.thickPricePerUnit ? 'Grueso' : 'Regular'}</p>
        <p>Unidades necesarias: {result.priceBreakdown.unitCount}</p>
        <p>Precio por unidad: {result.priceBreakdown.pricePerUnit}{config.currency}</p>
        <p>Subtotal material: {result.priceBreakdown.materialTotal}{config.currency}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', color: '#34495e', marginTop: '15px', marginBottom: '10px' }}>Kit de Anclaje</h2>
        <p>Precio del kit: {result.kitPrice}{config.currency}</p>
      </div>

      {result.additionalItems.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', color: '#34495e', marginTop: '15px', marginBottom: '10px' }}>Elementos Adicionales</h2>
          <ul>
            {result.additionalItems.map((item, index) => (
              <li key={index}>{item.name}: {item.price}{config.currency}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '20px', borderTop: '1px solid #bdc3c7', paddingTop: '10px' }}>
        <h2 style={{ fontSize: '20px', color: '#34495e', marginTop: '15px', marginBottom: '10px' }}>Precio Total</h2>
        <p>{result.totalPrice}{config.currency}</p>
      </div>
    </div>
  );
};

