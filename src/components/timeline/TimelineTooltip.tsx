import type { DateSystem } from "../../types/timeline";
import { entityTypeLabels, regionLabels } from "./timelineConfig";
import { formatYear } from "./timelineDates";
import type { TimelineTooltipState } from "./timelineTypes";

interface TimelineTooltipProps {
  tooltip: TimelineTooltipState;
  dateSystem: DateSystem;
}

export function TimelineTooltip({ tooltip, dateSystem }: TimelineTooltipProps) {
  return (
    <div className="timeline-tooltip" style={{ left: tooltip.x + 16, top: tooltip.y - 18 }}>
      <div className="timeline-tooltip__header">
        <div>
          <strong>{tooltip.entity.name}</strong>
          <small>
            {formatYear(tooltip.entity.startYear, tooltip.entity.hijriStartYear, dateSystem)} -{" "}
            {formatYear(tooltip.entity.endYear, tooltip.entity.hijriEndYear, dateSystem)}
          </small>
        </div>
        <span>{entityTypeLabels[tooltip.entity.type]}</span>
      </div>
      <p>{tooltip.entity.summary}</p>
      <div className="timeline-tooltip__meta">
        <span>
          الذروة: {formatYear(tooltip.entity.peakYear, tooltip.entity.hijriPeakYear, dateSystem)}
        </span>
        <span>المنطقة: {regionLabels[tooltip.entity.region]}</span>
      </div>
    </div>
  );
}
