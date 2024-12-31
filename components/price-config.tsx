'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { PriceConfig, ThicknessOption, PanelModel, AnchorKit } from '../types/measurements'

interface PriceConfigProps {
  config: PriceConfig;
  onUpdate: (config: PriceConfig) => void;
}

export function PriceConfigComponent({ config, onUpdate }: PriceConfigProps) {
  const handleUpdate = (field: keyof PriceConfig, value: any) => {
    const updatedConfig = { ...config, [field]: value };
    onUpdate(updatedConfig);
  };

  const addThicknessOption = () => {
    const newThickness: ThicknessOption = {
      thickness: 10,
      pricePerUnit: 5
    };
    handleUpdate('thicknessOptions', [...config.thicknessOptions, newThickness]);
  };

  const updateThicknessOption = (index: number, field: keyof ThicknessOption, value: any) => {
    const updatedOptions = [...config.thicknessOptions];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    handleUpdate('thicknessOptions', updatedOptions);
  };

  const addPanelModel = () => {
    const newPanel: PanelModel = {
      id: config.panelModels.length + 1,
      name: "Nuevo Panel",
      baseWidth: 60,
      baseHeight: 120,
      basePrice: 110,
      baseThickness: 10
    };
    handleUpdate('panelModels', [...config.panelModels, newPanel]);
  };

  const updatePanelModel = (index: number, field: keyof PanelModel, value: any) => {
    const updatedPanels = [...config.panelModels];
    updatedPanels[index] = { ...updatedPanels[index], [field]: value };
    handleUpdate('panelModels', updatedPanels);
  };

  const addAnchorKit = () => {
    const newKit: AnchorKit = {
      id: config.anchorKits.length + 1,
      name: "Nuevo Kit",
      price: 10
    };
    handleUpdate('anchorKits', [...config.anchorKits, newKit]);
  };

  const updateAnchorKit = (index: number, field: keyof AnchorKit, value: any) => {
    const updatedKits = [...config.anchorKits];
    updatedKits[index] = { ...updatedKits[index], [field]: value };
    handleUpdate('anchorKits', updatedKits);
  };

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-semibold">Opciones de Grosor</Label>
            <Button onClick={addThicknessOption} variant="outline" size="sm">Agregar Opción</Button>
          </div>
          {config.thicknessOptions.map((option, index) => (
            <div key={index} className="grid gap-2 p-4 border rounded">
              <div className="flex items-center space-x-2">
                <Label>Grosor (cm):</Label>
                <Input
                  type="number"
                  value={option.thickness}
                  onChange={(e) => updateThicknessOption(index, 'thickness', parseFloat(e.target.value))}
                  className="w-24"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label>Precio por unidad:</Label>
                <Input
                  type="number"
                  value={option.pricePerUnit}
                  onChange={(e) => updateThicknessOption(index, 'pricePerUnit', parseFloat(e.target.value))}
                  className="w-24"
                />
                <span>{config.currency}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-semibold">Modelos de Panel</Label>
            <Button onClick={addPanelModel} variant="outline" size="sm">Agregar Modelo</Button>
          </div>
          {config.panelModels.map((panel, index) => (
            <div key={panel.id} className="grid gap-2 p-4 border rounded">
              <div className="flex items-center space-x-2">
                <Label>Nombre:</Label>
                <Input
                  value={panel.name}
                  onChange={(e) => updatePanelModel(index, 'name', e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label>Ancho base (cm):</Label>
                <Input
                  type="number"
                  value={panel.baseWidth}
                  onChange={(e) => updatePanelModel(index, 'baseWidth', parseFloat(e.target.value))}
                  className="w-24"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label>Alto base (cm):</Label>
                <Input
                  type="number"
                  value={panel.baseHeight}
                  onChange={(e) => updatePanelModel(index, 'baseHeight', parseFloat(e.target.value))}
                  className="w-24"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label>Precio base:</Label>
                <Input
                  type="number"
                  value={panel.basePrice}
                  onChange={(e) => updatePanelModel(index, 'basePrice', parseFloat(e.target.value))}
                  className="w-24"
                />
                <span>{config.currency}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Label>Grosor base (cm):</Label>
                <Select
                  value={panel.baseThickness.toString()}
                  onValueChange={(value) => updatePanelModel(index, 'baseThickness', parseInt(value))}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Grosor" />
                  </SelectTrigger>
                  <SelectContent>
                    {config.thicknessOptions.map((option) => (
                      <SelectItem key={option.thickness} value={option.thickness.toString()}>
                        {option.thickness}cm
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-semibold">Kits de Anclaje</Label>
            <Button onClick={addAnchorKit} variant="outline" size="sm">Agregar Kit</Button>
          </div>
          {config.anchorKits.map((kit, index) => (
            <div key={kit.id} className="grid gap-2 p-4 border rounded">
              <div className="flex items-center space-x-2">
                <Label>Nombre:</Label>
                <Input
                  value={kit.name}
                  onChange={(e) => updateAnchorKit(index, 'name', e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label>Precio:</Label>
                <Input
                  type="number"
                  value={kit.price}
                  onChange={(e) => updateAnchorKit(index, 'price', parseFloat(e.target.value))}
                  className="w-24"
                />
                <span>{config.currency}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dimensionPriceIncrement" className="text-lg font-semibold">Incremento de Precio por Dimensión</Label>
          <Input
            id="dimensionPriceIncrement"
            type="number"
            value={config.dimensionPriceIncrement}
            onChange={(e) => handleUpdate('dimensionPriceIncrement', parseFloat(e.target.value))}
            className="w-24"
          />
          <span>{config.currency} por cada {config.dimensionIncrementSize}cm</span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dimensionIncrementSize" className="text-lg font-semibold">Tamaño de Incremento de Dimensión</Label>
          <Input
            id="dimensionIncrementSize"
            type="number"
            value={config.dimensionIncrementSize}
            onChange={(e) => handleUpdate('dimensionIncrementSize', parseFloat(e.target.value))}
            className="w-24"
          />
          <span>cm</span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ivaRate" className="text-lg font-semibold">Tasa de IVA (%)</Label>
          <Input
            id="ivaRate"
            type="number"
            value={config.ivaRate}
            onChange={(e) => handleUpdate('ivaRate', parseFloat(e.target.value))}
            className="w-24"
          />
          <span>%</span>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency" className="text-lg font-semibold">Moneda</Label>
          <Input
            id="currency"
            type="text"
            value={config.currency}
            onChange={(e) => handleUpdate('currency', e.target.value)}
            className="w-24"
          />
        </div>
      </CardContent>
    </Card>
  );
}

