import type { FocusEvent as ReactFocusEvent, MouseEvent as ReactMouseEvent } from "react";
import type { HistoricalEntity } from "../../types/timeline";
import { accentClassMap, ROW_HEIGHT } from "./timelineConfig";

interface TimelineRowsProps {
  entities: HistoricalEntity[];
  boundsMinYear: number;
  pixelsPerYear: number;
  timelineWidth: number;
  selectedEntityId: string | null;
  onSelectEntity: (entityId: string) => void;
  onShowTooltip: (entity: HistoricalEntity, event: ReactMouseEvent<HTMLButtonElement>) => void;
  onHideTooltip: () => void;
  onFocusTooltip: (entity: HistoricalEntity, event: ReactFocusEvent<HTMLButtonElement>) => void;
}

export function TimelineRows({
  entities,
  boundsMinYear,
  pixelsPerYear,
  timelineWidth,
  selectedEntityId,
  onSelectEntity,
  onShowTooltip,
  onHideTooltip,
  onFocusTooltip,
}: TimelineRowsProps) {
  return (
    <>
      {entities.map((entity, index) => {
        const left = (entity.startYear - boundsMinYear) * pixelsPerYear;
        const width = Math.max((entity.endYear - entity.startYear) * pixelsPerYear, 12);
        const isSelected = entity.id === selectedEntityId;

        return (
          <div key={entity.id} className="timeline-row" style={{ height: ROW_HEIGHT }}>
            <div className="timeline-row__track" style={{ width: timelineWidth }}>
              <button
                type="button"
                className={[
                  "timeline-bar",
                  accentClassMap[entity.accent],
                  isSelected ? "is-selected" : "",
                ].join(" ")}
                style={{
                  insetInlineStart: left,
                  width,
                  top: 14 + (index % 2 === 0 ? 0 : 2),
                }}
                onMouseEnter={(event) => onShowTooltip(entity, event)}
                onMouseMove={(event) => onShowTooltip(entity, event)}
                onMouseLeave={onHideTooltip}
                onFocus={(event) => onFocusTooltip(entity, event)}
                onBlur={onHideTooltip}
                onClick={() => {
                  console.log("Timeline entity clicked:", entity.id);
                  onSelectEntity(entity.id);
                }}
              >
                <span>{entity.name}</span>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
