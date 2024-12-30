'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { TableVisualization } from './table-visualization'
import { Summary } from './summary'
import type { Dimensions, PriceConfig, CalculationResult, AdditionalItem } from '../types/measurements'
import { calculatePrice } from '../utils/calculator'
import { usePDF } from 'react-to-pdf';

interface CalculatorProps {
  config: PriceConfig;
}

export function Calculator({ config }: CalculatorProps) {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 60,
    height: 120
  });
  const [isThick, setIsThick] = useState(false);
  const [kitPrice, setKitPrice] = useState(0);
  const [additionalItems, setAdditionalItems] = useState<AdditionalItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const { toPDF, targetRef } = usePDF({filename: 'calculo-medidas-madera.pdf'});

  useEffect(() => {
    const calculationResult = calculatePrice(dimensions, isThick, config, kitPrice, additionalItems);
    setResult(calculationResult);
  }, [dimensions, isThick, config, kitPrice, additionalItems]);

  const addItem = () => {
    if (newItemName && newItemPrice) {
      setAdditionalItems([...additionalItems, { name: newItemName, price: parseFloat(newItemPrice) }]);
      setNewItemName('');
      setNewItemPrice('');
    }
  };

  const removeItem = (index: number) => {
    setAdditionalItems(additionalItems.filter((_, i) => i !== index));
  };

  const handleExportPDF = () => {
    if (result) {
      toPDF();
    }
  };

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="flex justify-center mb-6">
          <TableVisualization width={dimensions.width} height={dimensions.height} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Ancho (cm)</Label>
            <Input
              id="width"
              type="number"
              value={dimensions.width}
              onChange={(e) => setDimensions({...dimensions, width: parseFloat(e.target.value) || 0})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Alto (cm)</Label>
            <Input
              id="height"
              type="number"
              value={dimensions.height}
              onChange={(e) => setDimensions({...dimensions, height: parseFloat(e.target.value) || 0})}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="thick-mode"
            checked={isThick}
            onCheckedChange={setIsThick}
          />
          <Label htmlFor="thick-mode">
            Material Grueso ({config.thickUnitSize}cm = {config.thickPricePerUnit}{config.currency})
          </Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="kit-price">Precio del Kit de Anclaje</Label>
          <Input
            id="kit-price"
            type="number"
            value={kitPrice}
            onChange={(e) => setKitPrice(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Elementos Adicionales</h3>
          <div className="grid grid-cols-3 gap-2">
            <Input
              placeholder="Nombre del item"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Precio"
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
            />
            <Button onClick={addItem}>Agregar</Button>
          </div>
          {additionalItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>{item.name}: {item.price}{config.currency}</span>
              <Button variant="destructive" size="sm" onClick={() => removeItem(index)}>Eliminar</Button>
            </div>
          ))}
        </div>

        {result && (
          <>
            <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
              <p className="font-semibold">Detalles del cálculo:</p>
              <p>Dimensiones: {result.priceBreakdown.width}cm x {result.priceBreakdown.height}cm</p>
              <p>Perímetro total: {result.priceBreakdown.totalLength}cm</p>
              <p>Unidades necesarias: {result.priceBreakdown.unitCount} ({isThick ? config.thickUnitSize : config.regularUnitSize}cm cada una)</p>
              <p>Precio por unidad: {result.priceBreakdown.pricePerUnit}{config.currency}</p>
              <p>Subtotal material: {result.priceBreakdown.materialTotal}{config.currency}</p>
              <p>Precio del kit: {result.kitPrice}{config.currency}</p>
              {result.additionalItems.length > 0 && (
                <div>
                  <p>Elementos adicionales:</p>
                  <ul>
                    {result.additionalItems.map((item, index) => (
                      <li key={index}>{item.name}: {item.price}{config.currency}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="text-lg font-bold mt-4 border-t pt-2">
                Precio Total: {result.totalPrice}{config.currency}
              </p>
            </div>
            <Button onClick={handleExportPDF} className="w-full">
              Exportar a PDF
            </Button>
          </>
        )}

        {/* Componente para generar el PDF */}
        <div className="hidden">
          <div ref={targetRef}>
            {result && <Summary result={result} config={config} />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

