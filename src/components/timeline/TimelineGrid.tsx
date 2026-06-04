import { getVisibleYearOffset } from "./timelineGeometry";

interface TimelineGridProps {
  axisYears: number[];
  boundsMinYear: number;
  pixelsPerYear: number;
  timelineWidth: number;
}

export function TimelineGrid({
  axisYears,
  boundsMinYear,
  pixelsPerYear,
  timelineWidth,
}: TimelineGridProps) {
  return (
    <div className="timeline-grid" style={{ width: timelineWidth }}>
      {axisYears.map((year) => (
        <span
          key={year}
          className="timeline-grid__line"
          style={{
            insetInlineStart: getVisibleYearOffset(
              year,
              boundsMinYear,
              pixelsPerYear,
              timelineWidth,
            ),
          }}
        />
      ))}
    </div>
  );
}

