import { formatYear, gregorianYearToHijriYear } from "./timelineDates";

interface TimelineAxisProps {
  axisYears: number[];
  boundsMinYear: number;
  pixelsPerYear: number;
  timelineWidth: number;
}

export function TimelineAxis({
  axisYears,
  boundsMinYear,
  pixelsPerYear,
  timelineWidth,
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
            {formatYear(year, gregorianYearToHijriYear(year))}
          </div>
        ))}
      </div>
    </div>
  );
}
