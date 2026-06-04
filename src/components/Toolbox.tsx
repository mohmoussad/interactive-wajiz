import { useState } from "react";
import { TimelineSourceModal } from "./timeline/TimelineSourceModal";
import { getAxisInterval, ZOOM_MAX, ZOOM_MIN, ZOOM_STEP } from "./timeline/timelineConfig";

interface ToolboxProps {
  zoomLevel: number;
  onZoomChange: (value: number) => void;
}

export function Toolbox({
  zoomLevel,
  onZoomChange,
}: ToolboxProps) {
  const axisInterval = getAxisInterval(zoomLevel);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);

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
          <strong>
            {axisInterval === 100
              ? "قرن"
              : axisInterval === 50
                ? "50 سنة"
                : axisInterval === 25
                  ? "25 سنة"
                  : "10 سنوات"}
          </strong>
        </label>
      </div>

      <div className="toolbox__left">
        <button
          type="button"
          className="source-button"
          onClick={() => setIsSourceModalOpen(true)}
        >
          المصدر
        </button>
      </div>

      <TimelineSourceModal
        isOpen={isSourceModalOpen}
        onClose={() => setIsSourceModalOpen(false)}
      />
    </section>
  );
}
