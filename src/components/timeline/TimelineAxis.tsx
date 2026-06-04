import {
  formatHijriYear,
  formatYear,
  gregorianYearToHijriYear,
} from "./timelineDates";
import { getAxisInterval, TIMELINE_START_YEAR } from "./timelineConfig";
import { getVisibleYearOffset } from "./timelineGeometry";

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
  const terminalYear = axisYears[axisYears.length - 1];

  return (
    <div className="timeline-axis">
      <div className="timeline-axis__ticks" style={{ width: timelineWidth }}>
        {axisYears.map((year) => {
          const isTerminalTick = year === terminalYear;
          const isCompactLabel = isTenYearMode || isTerminalTick;

          return (
            <div
              key={year}
              className={[
                "timeline-axis__tick",
                (year - TIMELINE_START_YEAR) % 100 === 0 ? "timeline-axis__tick--major" : "",
                isTerminalTick ? "timeline-axis__tick--terminal" : "",
              ].join(" ")}
              style={{
                insetInlineStart: getVisibleYearOffset(
                  year,
                  boundsMinYear,
                  pixelsPerYear,
                  timelineWidth,
                ),
              }}
            >
              <span
                className={[
                  "timeline-axis__label",
                  isCompactLabel ? "timeline-axis__label--compact" : "",
                ].join(" ")}
              >
                {isCompactLabel ? (
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
          );
        })}
      </div>
    </div>
  );
}
