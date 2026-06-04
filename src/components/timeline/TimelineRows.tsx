import type { HistoricalEntity } from "../../types/timeline";
import { TimelineEntityRow } from "./TimelineEntityRow";

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
      {entities.map((entity, index) => (
        <TimelineEntityRow
          key={entity.id}
          entity={entity}
          index={index}
          boundsMinYear={boundsMinYear}
          pixelsPerYear={pixelsPerYear}
          timelineWidth={timelineWidth}
          isSelected={entity.id === selectedEntityId}
          onSelectEntity={onSelectEntity}
        />
      ))}
    </>
  );
}
