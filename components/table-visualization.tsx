interface TableVisualizationProps {
  width: number;
  height: number;
}

export function TableVisualization({ width, height }: TableVisualizationProps) {
  const maxSize = 300; // Tamaño máximo de la visualización
  const aspectRatio = width / height;

  let displayWidth, displayHeight;

  if (aspectRatio > 1) {
    displayWidth = maxSize;
    displayHeight = maxSize / aspectRatio;
  } else {
    displayHeight = maxSize;
    displayWidth = maxSize * aspectRatio;
  }

  return (
    <div className="relative border-2 border-black rounded-md">
      <div
        className="bg-white"
        style={{
          width: `${displayWidth}px`,
          height: `${displayHeight}px`,
        }}
      >
        {/* Medidas en los bordes */}
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-sm whitespace-nowrap">
          {height}cm
        </div>
        <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-sm whitespace-nowrap">
          {width}cm
        </div>
      </div>
    </div>
  );
}

