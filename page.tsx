// @ts-nocheck
'use client'

import { useState } from 'react'
import { PriceConfigComponent } from './components/price-config'
import { Calculator } from './components/calculator'
import type { PriceConfig } from './types/measurements'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [config, setConfig] = useState<PriceConfig>({
    regularPricePerUnit: 5,
    thickPricePerUnit: 10,
    regularUnitSize: 10,
    thickUnitSize: 5,
    currency: '$'
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
          <div className="space-y-8">
            <PriceConfigComponent 
              config={config} 
              onUpdate={setConfig} 
            />
            <div className="p-4 bg-muted rounded-lg">
              <h2 className="font-semibold mb-2">Notas Importantes:</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Cada {config.regularUnitSize}cm = {config.regularPricePerUnit}{config.currency} (material regular)</li>
                <li>Cada {config.thickUnitSize}cm = {config.thickPricePerUnit}{config.currency} (material grueso)</li>
                <li>No olvides colocar renglón de kit anclaje pared y techo</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

