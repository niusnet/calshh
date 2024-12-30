'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { PriceConfig } from '../types/measurements'

interface PriceConfigProps {
  config: PriceConfig;
  onUpdate: (config: PriceConfig) => void;
}

export function PriceConfigComponent({ config, onUpdate }: PriceConfigProps) {
  const handleUpdate = (field: keyof PriceConfig, value: number) => {
    const updatedConfig = { ...config, [field]: value };
    onUpdate(updatedConfig);
  };

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label htmlFor="regularPrice" className="text-lg font-semibold">Precio para Material Regular</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="regularPrice"
              type="number"
              value={config.regularPricePerUnit}
              onChange={(e) => handleUpdate('regularPricePerUnit', parseFloat(e.target.value))}
              className="w-24"
            />
            <span className="text-sm text-muted-foreground">
              {config.currency} por cada {config.regularUnitSize}cm
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="thickPrice" className="text-lg font-semibold">Precio para Material Grueso</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="thickPrice"
              type="number"
              value={config.thickPricePerUnit}
              onChange={(e) => handleUpdate('thickPricePerUnit', parseFloat(e.target.value))}
              className="w-24"
            />
            <span className="text-sm text-muted-foreground">
              {config.currency} por cada {config.thickUnitSize}cm
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="regularUnitSize" className="text-lg font-semibold">Tamaño de Unidad para Material Regular</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="regularUnitSize"
              type="number"
              value={config.regularUnitSize}
              onChange={(e) => handleUpdate('regularUnitSize', parseFloat(e.target.value))}
              className="w-24"
            />
            <span className="text-sm text-muted-foreground">cm</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="thickUnitSize" className="text-lg font-semibold">Tamaño de Unidad para Material Grueso</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="thickUnitSize"
              type="number"
              value={config.thickUnitSize}
              onChange={(e) => handleUpdate('thickUnitSize', parseFloat(e.target.value))}
              className="w-24"
            />
            <span className="text-sm text-muted-foreground">cm</span>
          </div>
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

