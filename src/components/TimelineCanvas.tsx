import type { HistoricalEntity, TimelineMilestone } from "../types/timeline";
import { TimelineAxis } from "./timeline/TimelineAxis";
import { TimelineEmptyState } from "./timeline/TimelineEmptyState";
import { TimelineMilestones } from "./timeline/TimelineMilestones";
import { TimelineRows } from "./timeline/TimelineRows";
import { useTimelineCanvasController } from "./timeline/useTimelineCanvasController";

interface TimelineCanvasProps {
  entities: HistoricalEntity[];
  milestones: TimelineMilestone[];
  zoomLevel: number;
  selectedEntityId: string | null;
  onSelectEntity: (entityId: string) => void;
  onZoomChange: (value: number) => void;
}

export function TimelineCanvas({
  entities,
  milestones,
  zoomLevel,
  selectedEntityId,
  onSelectEntity,
  onZoomChange,
}: TimelineCanvasProps) {
  const {
    axisYears,
    bounds,
    containerRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    pixelsPerYear,
    timelineWidth,
  } = useTimelineCanvasController({
    entities,
    zoomLevel,
    selectedEntityId,
    onZoomChange,
  });

  if (entities.length === 0) {
    return <TimelineEmptyState />;
  }

  return (
    <main
      ref={containerRef}
      className="timeline-canvas"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="timeline-surface" style={{ width: timelineWidth }}>
        <TimelineAxis
          axisYears={axisYears}
          boundsMinYear={bounds.minYear}
          pixelsPerYear={pixelsPerYear}
          timelineWidth={timelineWidth}
          zoomLevel={zoomLevel}
        />

        <div className="timeline-body">
          <div className="timeline-grid" style={{ width: timelineWidth }}>
            {axisYears.map((year) => (
              <span
                key={year}
                className="timeline-grid__line"
                style={{ insetInlineStart: (year - bounds.minYear) * pixelsPerYear }}
              />
            ))}

            <TimelineMilestones
              milestones={milestones}
              boundsMinYear={bounds.minYear}
              pixelsPerYear={pixelsPerYear}
            />
          </div>

          <div className="timeline-rows">
            <TimelineRows
              entities={entities}
              boundsMinYear={bounds.minYear}
              pixelsPerYear={pixelsPerYear}
              timelineWidth={timelineWidth}
              selectedEntityId={selectedEntityId}
              onSelectEntity={onSelectEntity}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
