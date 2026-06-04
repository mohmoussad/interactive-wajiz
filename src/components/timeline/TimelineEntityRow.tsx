import Tooltip from "@mui/material/Tooltip";
import type { HistoricalEntity } from "../../types/timeline";
import { TimelineEntityTooltipContent } from "./TimelineEntityTooltipContent";
import { getYearOffset } from "./timelineGeometry";
import { ROW_HEIGHT } from "./timelineConfig";

interface TimelineEntityRowProps {
  entity: HistoricalEntity;
  index: number;
  boundsMinYear: number;
  pixelsPerYear: number;
  timelineWidth: number;
  isSelected: boolean;
  onSelectEntity: (entityId: string) => void;
}

function getEntityBarLayout(
  entity: HistoricalEntity,
  boundsMinYear: number,
  pixelsPerYear: number,
  index: number,
) {
  return {
    insetInlineStart: getYearOffset(entity.startYear, boundsMinYear, pixelsPerYear),
    top: 14 + (index % 2 === 0 ? 0 : 2),
    width: Math.max((entity.endYear - entity.startYear) * pixelsPerYear, 12),
  };
}

export function TimelineEntityRow({
  entity,
  index,
  boundsMinYear,
  pixelsPerYear,
  timelineWidth,
  isSelected,
  onSelectEntity,
}: TimelineEntityRowProps) {
  const barLayout = getEntityBarLayout(entity, boundsMinYear, pixelsPerYear, index);

  return (
    <div className="timeline-row" style={{ height: ROW_HEIGHT, width: timelineWidth }}>
      <div className="timeline-row__track">
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
              insetInlineStart: barLayout.insetInlineStart,
              width: barLayout.width,
              top: barLayout.top,
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
}

