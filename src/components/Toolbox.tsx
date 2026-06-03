import type { ChangeEvent } from "react";

interface ToolboxProps {
  zoomLevel: number;
  onZoomChange: (value: number) => void;
}

export function Toolbox({
  zoomLevel,
  onZoomChange,
}: ToolboxProps) {
  return (
    <section className="toolbox">
      <div className="toolbox__left">
        <label className="zoom-control">
          <span>التكبير</span>
          <input
            type="range"
            min={0.75}
            max={3}
            step={0.05}
            value={zoomLevel}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onZoomChange(Number(event.target.value))
            }
          />
          <strong>{zoomLevel < 1.1 ? "قرون" : zoomLevel < 1.8 ? "عقود" : "سنوات"}</strong>
        </label>
      </div>
    </section>
  );
}
