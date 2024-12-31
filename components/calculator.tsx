'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TableVisualization } from './table-visualization'
import type { 
  Dimensions, 
  PriceConfig, 
  CalculationResult, 
  AdditionalItem, 
  PanelModel, 
  AnchorKit,
  ThicknessOption
} from '../types/measurements'
import { calculatePrice } from '../utils/calculator'
import { Switch } from "@/components/ui/switch"

interface CalculatorProps {
  config: PriceConfig;
}

export function Calculator({ config }: CalculatorProps) {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 60,
    height: 120
  });
  const [selectedThickness, setSelectedThickness] = useState<ThicknessOption | null>(null);
  const [additionalItems, setAdditionalItems] = useState<AdditionalItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [selectedPanel, setSelectedPanel] = useState<PanelModel | null>(null);
  const [anchorKit, setAnchorKit] = useState<AnchorKit | null>(null);
  const [useAnchorKit, setUseAnchorKit] = useState(false);

  useEffect(() => {
    if (selectedPanel && selectedThickness) {
      calculateResult();
    }
  }, [selectedPanel, dimensions, selectedThickness, config, anchorKit, additionalItems, useAnchorKit]);

  const calculateResult = () => {
    if (selectedPanel && selectedThickness) {
      const calculationResult = calculatePrice(
        selectedPanel,
        dimensions,
        selectedThickness,
        config,
        useAnchorKit ? anchorKit : null,
        additionalItems
      );
      setResult(calculationResult);
    }
  };

  const handlePanelSelect = (panel: PanelModel) => {
    setSelectedPanel(panel);
    setDimensions({
      width: panel.baseWidth,
      height: panel.baseHeight
    });
    const baseThickness = config.thicknessOptions.find(t => t.thickness === panel.baseThickness);
    if (baseThickness) {
      setSelectedThickness(baseThickness);
    }
  };

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

  const formatPrice = (price: number) => price.toFixed(2);

  return (
    <Card className="border-black">
      <CardContent className="space-y-6 pt-6">
        <div className="flex justify-center mb-6">
          <TableVisualization width={dimensions.width} height={dimensions.height} />
        </div>

        <div className="space-y-4">
          <Label>Modelo de Panel</Label>
          <Select onValueChange={(value) => {
            const panel = config.panelModels?.find(p => p.id.toString() === value);
            if (panel) handlePanelSelect(panel);
          }}>
            <SelectTrigger className="border-black">
              <SelectValue placeholder="Selecciona un modelo" />
            </SelectTrigger>
            <SelectContent>
              {config.panelModels?.map((panel) => (
                <SelectItem key={panel.id} value={panel.id.toString()}>
                  {panel.name} ({panel.baseWidth}x{panel.baseHeight}cm, {panel.baseThickness}cm)
                </SelectItem>
              )) || <SelectItem value="">No hay modelos disponibles</SelectItem>}
            </SelectContent>
          </Select>
        </div>

        {selectedPanel && (
          <>
            <div className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="width">Ancho: {dimensions.width}cm</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="width"
                    min={selectedPanel.baseWidth}
                    max={300}
                    step={config.dimensionIncrementSize}
                    value={[dimensions.width]}
                    onValueChange={(value) => setDimensions({ ...dimensions, width: value[0] })}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => setDimensions({ ...dimensions, width: parseFloat(e.target.value) || 0 })}
                    className="w-20 border-black"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="height">Alto: {dimensions.height}cm</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="height"
                    min={selectedPanel.baseHeight}
                    max={300}
                    step={config.dimensionIncrementSize}
                    value={[dimensions.height]}
                    onValueChange={(value) => setDimensions({ ...dimensions, height: value[0] })}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={dimensions.height}
                    onChange={(e) => setDimensions({ ...dimensions, height: parseFloat(e.target.value) || 0 })}
                    className="w-20 border-black"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Grosor del Panel</Label>
              <Select 
                value={selectedThickness ? selectedThickness.thickness.toString() : ''}
                onValueChange={(value) => {
                  const thickness = config.thicknessOptions.find(t => t.thickness.toString() === value);
                  if (thickness) setSelectedThickness(thickness);
                }}
              >
                <SelectTrigger className="border-black">
                  <SelectValue placeholder="Selecciona el grosor" />
                </SelectTrigger>
                <SelectContent>
                  {config.thicknessOptions.map((option) => (
                    <SelectItem key={option.thickness} value={option.thickness.toString()}>
                      {option.thickness}cm {option.thickness === 10 ? '(Incluido)' : `(${formatPrice(option.pricePerUnit)}${config.currency})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="use-anchor-kit"
                  checked={useAnchorKit}
                  onCheckedChange={setUseAnchorKit}
                />
                <Label htmlFor="use-anchor-kit">Usar Kit de Anclaje</Label>
              </div>
              {useAnchorKit && (
                <Select onValueChange={(value) => {
                  const kit = config.anchorKits.find(k => k.id.toString() === value);
                  if (kit) setAnchorKit(kit);
                }}>
                  <SelectTrigger className="border-black">
                    <SelectValue placeholder="Selecciona un kit de anclaje" />
                  </SelectTrigger>
                  <SelectContent>
                    {config.anchorKits.map((kit) => (
                      <SelectItem key={kit.id} value={kit.id.toString()}>
                        {kit.name} ({formatPrice(kit.price)}{config.currency})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Elementos Adicionales</h3>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  placeholder="Nombre del item"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="border-black"
                />
                <Input
                  type="number"
                  placeholder="Precio"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                  className="border-black"
                />
                <Button onClick={addItem} variant="outline" className="border-black">Agregar</Button>
              </div>
              {additionalItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{item.name}: {formatPrice(item.price)}{config.currency}</span>
                  <Button variant="destructive" size="sm" onClick={() => removeItem(index)}>Eliminar</Button>
                </div>
              ))}
            </div>

            {result && (
              <div className="mt-4 p-4 bg-secondary rounded-lg space-y-2">
                <p className="font-semibold">Detalles del cálculo:</p>
                <p>Dimensiones: {result.dimensions.width}cm x {result.dimensions.height}cm</p>
                <p>Grosor: {result.thickness}cm</p>
                <p>Precio base: {formatPrice(result.priceBreakdown.basePrice)}{config.currency}</p>
                <p>Ajuste por ancho: {formatPrice(result.priceBreakdown.widthAdjustment)}{config.currency}</p>
                <p>Ajuste por alto: {formatPrice(result.priceBreakdown.heightAdjustment)}{config.currency}</p>
                <p>Precio por grosor: {result.thickness > 10 ? `${formatPrice(result.priceBreakdown.thicknessPrice)}${config.currency}` : 'Incluido'}</p>
                {useAnchorKit && anchorKit && (
                  <p>Kit de anclaje ({anchorKit.name}): {formatPrice(result.priceBreakdown.anchorKitPrice)}{config.currency}</p>
                )}
                {result.additionalItems.length > 0 && (
                  <div>
                    <p>Elementos adicionales: {formatPrice(result.priceBreakdown.additionalItemsTotal)}{config.currency}</p>
                    <ul>
                      {result.additionalItems.map((item, index) => (
                        <li key={index}>{item.name}: {formatPrice(item.price)}{config.currency}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <p>Subtotal: {formatPrice(result.priceBreakdown.subtotal)}{config.currency}</p>
                {config.ivaRate > 0 && (
                  <p>IVA ({config.ivaRate}%): {formatPrice(result.priceBreakdown.ivaAmount)}{config.currency}</p>
                )}
                <p className="text-lg font-bold mt-4 border-t border-black pt-2">
                  Precio Total: {formatPrice(result.totalPrice)}{config.currency}
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

