import type { DateSystem } from "../../types/timeline";
import { formatYear, gregorianYearToHijriYear } from "./timelineDates";

interface TimelineAxisProps {
  axisYears: number[];
  boundsMinYear: number;
  pixelsPerYear: number;
  timelineWidth: number;
  dateSystem: DateSystem;
}

export function TimelineAxis({
  axisYears,
  boundsMinYear,
  pixelsPerYear,
  timelineWidth,
  dateSystem,
}: TimelineAxisProps) {
  return (
    <div className="timeline-axis" style={{ minHeight: 72 }}>
      <div className="timeline-axis__ticks" style={{ width: timelineWidth }}>
        {axisYears.map((year) => (
          <div
            key={year}
            className="timeline-axis__tick"
            style={{ insetInlineStart: (year - boundsMinYear) * pixelsPerYear }}
          >
            {formatYear(year, gregorianYearToHijriYear(year), dateSystem)}
          </div>
        ))}
      </div>
    </div>
  );
}
