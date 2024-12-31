import { PanelModel } from '../types/measurements'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const panelModels: PanelModel[] = [
  { id: 1, name: 'Hosh', baseWidth: 60, baseHeight: 120, basePrice: 110, baseThickness:0 },
  { id: 2, name: 'Cloud', baseWidth: 100, baseHeight: 100, basePrice: 110, baseThickness:0 },
  { id: 3, name: 'Square', baseWidth: 60, baseHeight: 60, basePrice: 90, baseThickness:0 },
  { id: 4, name: 'Omni', baseWidth: 60, baseHeight: 120, basePrice: 110, baseThickness:0 },
  { id: 5, name: 'Skin', baseWidth: 60, baseHeight: 120, basePrice: 130, baseThickness:0 },
]

interface PanelSelectorProps {
  onSelect: (panel: PanelModel) => void;
}

export function PanelSelector({ onSelect }: PanelSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>Modelo de Panel</Label>
      <Select onValueChange={(value) => onSelect(panelModels[parseInt(value)])}>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona un modelo" />
        </SelectTrigger>
        <SelectContent>
          {panelModels.map((panel, index) => (
            <SelectItem key={panel.id} value={index.toString()}>
              {panel.name} ({panel.baseWidth}x{panel.baseHeight}cm)
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

