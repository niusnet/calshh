'use client'

import { useState } from 'react'
import { PriceConfigComponent } from '../components/price-config'
import { Calculator } from '../components/calculator'
import type { PriceConfig } from '../types/measurements'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [config, setConfig] = useState<PriceConfig>({
    regularPricePerUnit: 5,
    thickPricePerUnit: 10,
    regularUnitSize: 10,
    thickUnitSize: 5,
    currency: '$',
    thicknessOptions: [
      { thickness: 10, pricePerUnit: 5 },
      { thickness: 15, pricePerUnit: 6 },
      { thickness: 20, pricePerUnit: 7 },
      { thickness: 25, pricePerUnit: 8 },
      { thickness: 30, pricePerUnit: 10 },
    ],
    panelModels: [
      { id: 1, name: 'Hosh', baseWidth: 60, baseHeight: 120, basePrice: 110, baseThickness: 10 },
      { id: 2, name: 'Cloud', baseWidth: 100, baseHeight: 100, basePrice: 110, baseThickness: 10 },
      { id: 3, name: 'Square', baseWidth: 60, baseHeight: 60, basePrice: 90, baseThickness: 10 },
      { id: 4, name: 'Omni', baseWidth: 60, baseHeight: 120, basePrice: 110, baseThickness: 10 },
      { id: 5, name: 'Skin', baseWidth: 60, baseHeight: 120, basePrice: 130, baseThickness: 10 }
    ],
    anchorKits: [
      { id: 1, name: 'Kit Básico', price: 10 },
      { id: 2, name: 'Kit Estándar', price: 20 },
      { id: 3, name: 'Kit Premium', price: 30 }
    ],
    dimensionPriceIncrement: 10,
    dimensionIncrementSize: 10,
    ivaRate: 0,
  });

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
      Calculadora de Medidas SHH...
      </h1>
      
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">Calculadora</TabsTrigger>
          <TabsTrigger value="config">Configuración</TabsTrigger>
        </TabsList>
        <TabsContent value="calculator">
          <Calculator config={config} />
        </TabsContent>
        <TabsContent value="config">
          <PriceConfigComponent 
            config={config} 
            onUpdate={setConfig} 
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}

