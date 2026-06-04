import {
  formatHijriYear,
  formatYear,
  gregorianYearToHijriYear,
} from "./timelineDates";
import { getAxisInterval, TIMELINE_START_YEAR } from "./timelineConfig";

interface TimelineAxisProps {
  axisYears: number[];
  boundsMinYear: number;
  pixelsPerYear: number;
  timelineWidth: number;
  zoomLevel: number;
}

export function TimelineAxis({
  axisYears,
  boundsMinYear,
  pixelsPerYear,
  timelineWidth,
  zoomLevel,
}: TimelineAxisProps) {
  const axisInterval = getAxisInterval(zoomLevel);
  const isTenYearMode = axisInterval === 10;

  return (
    <div className="timeline-axis">
      <div className="timeline-axis__ticks" style={{ width: timelineWidth }}>
        {axisYears.map((year) => (
          <div
            key={year}
            className={[
              "timeline-axis__tick",
              (year - TIMELINE_START_YEAR) % 100 === 0 ? "timeline-axis__tick--major" : "",
            ].join(" ")}
            style={{ insetInlineStart: (year - boundsMinYear) * pixelsPerYear }}
          >
            <span
              className={[
                "timeline-axis__label",
                isTenYearMode ? "timeline-axis__label--compact" : "",
              ].join(" ")}
            >
              {isTenYearMode ? (
                <>
                  <span className="timeline-axis__label-primary">{year} م</span>
                  <span className="timeline-axis__label-primary">
                    {formatHijriYear(gregorianYearToHijriYear(year))}
                  </span>
                </>
              ) : (
                formatYear(year, gregorianYearToHijriYear(year))
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
