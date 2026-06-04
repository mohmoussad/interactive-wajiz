interface ToolboxProps {
  zoomLevel: number;
  onZoomChange: (value: number) => void;
}

const ZOOM_MIN = 0.75;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.05;

export function Toolbox({
  zoomLevel,
  onZoomChange,
}: ToolboxProps) {
  return (
    <section className="toolbox">
      <div className="toolbox__right">
        <label className="zoom-control" dir="rtl">
          <span>التكبير</span>
          <input
            type="range"
            min={ZOOM_MIN}
            max={ZOOM_MAX}
            step={ZOOM_STEP}
            value={zoomLevel}
            onChange={(event) => onZoomChange(Number(event.target.value))}
            aria-label="التكبير"
          />
          <strong>{zoomLevel < 1.1 ? "قرون" : zoomLevel < 1.8 ? "عقود" : "سنوات"}</strong>
        </label>
      </div>
    </section>
  );
}
