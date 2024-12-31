import { AnchorKit } from '../types/measurements'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const anchorKits: AnchorKit[] = [
  { id: 1, name: 'Kit Básico', price: 10 },
  { id: 2, name: 'Kit Estándar', price: 20 },
  { id: 3, name: 'Kit Premium', price: 30 },
]

interface AnchorKitSelectorProps {
  onSelect: (kit: AnchorKit) => void;
}

export function AnchorKitSelector({ onSelect }: AnchorKitSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>Kit de Anclaje</Label>
      <Select onValueChange={(value) => onSelect(anchorKits[parseInt(value)])}>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona un kit de anclaje" />
        </SelectTrigger>
        <SelectContent>
          {anchorKits.map((kit, index) => (
            <SelectItem key={kit.id} value={index.toString()}>
              {kit.name} (${kit.price})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

