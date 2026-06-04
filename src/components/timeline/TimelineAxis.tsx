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
    <div className="timeline-axis">
      <div className="timeline-axis__ticks" style={{ width: timelineWidth }}>
        {axisYears.map((year) => (
          <div
            key={year}
            className="timeline-axis__tick"
            style={{ insetInlineStart: (year - boundsMinYear) * pixelsPerYear }}
          >
            <span className="timeline-axis__label">
              {formatYear(year, gregorianYearToHijriYear(year))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
