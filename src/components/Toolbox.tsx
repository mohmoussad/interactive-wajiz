import Slider from "@mui/material/Slider";

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
          <Slider
            min={0.75}
            max={3}
            step={0.05}
            value={zoomLevel}
            onChange={(_, value) => onZoomChange(value as number)}
            aria-label="التكبير"
            sx={{
              width: 160,
              color: "var(--accent)",
              "& .MuiSlider-rail": {
                backgroundColor: "var(--surface-strong)",
                opacity: 1,
              },
              "& .MuiSlider-track": {
                border: 0,
                background: "linear-gradient(90deg, var(--accent), #b99f72)",
              },
              "& .MuiSlider-thumb": {
                width: 16,
                height: 16,
                backgroundColor: "var(--panel-strong)",
                border: "2px solid var(--accent)",
                boxShadow: "0 4px 12px rgba(61, 42, 18, 0.16)",
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  boxShadow: "0 6px 16px rgba(61, 42, 18, 0.22)",
                },
              },
            }}
          />
          <strong>{zoomLevel < 1.1 ? "قرون" : zoomLevel < 1.8 ? "عقود" : "سنوات"}</strong>
        </label>
      </div>
    </section>
  );
}
