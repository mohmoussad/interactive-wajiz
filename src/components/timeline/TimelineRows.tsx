import Tooltip from "@mui/material/Tooltip";
import type { HistoricalEntity } from "../../types/timeline";
import { ROW_HEIGHT } from "./timelineConfig";
import { TimelineEntityTooltipContent } from "./TimelineEntityTooltipContent";

interface TimelineRowsProps {
  entities: HistoricalEntity[];
  boundsMinYear: number;
  pixelsPerYear: number;
  timelineWidth: number;
  selectedEntityId: string | null;
  onSelectEntity: (entityId: string) => void;
}

export function TimelineRows({
  entities,
  boundsMinYear,
  pixelsPerYear,
  timelineWidth,
  selectedEntityId,
  onSelectEntity,
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
              <Tooltip
                title={<TimelineEntityTooltipContent entity={entity} />}
                placement="top"
                followCursor
                enterDelay={0}
                leaveDelay={0}
                slotProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "rgba(255, 250, 241, 0.98)",
                      color: "inherit",
                      border: "1px solid var(--line)",
                      boxShadow: "0 24px 50px rgba(28, 16, 68, 0.16)",
                      p: 0,
                    },
                  },
                }}
              >
                <button
                  type="button"
                  className={["timeline-bar", isSelected ? "is-selected" : ""].join(" ")}
                  style={{
                    background: entity.color,
                    insetInlineStart: left,
                    width,
                    top: 14 + (index % 2 === 0 ? 0 : 2),
                  }}
                  onClick={() => {
                    console.log("Timeline entity clicked:", entity.id);
                    onSelectEntity(entity.id);
                  }}
                >
                  <span>{entity.name}</span>
                </button>
              </Tooltip>
            </div>
          </div>
        );
      })}
    </>
  );
}
