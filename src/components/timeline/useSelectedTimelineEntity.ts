import { useEffect, useState } from "react";
import type { HistoricalEntity } from "../../types/timeline";

export function useSelectedTimelineEntity(entities: HistoricalEntity[]) {
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(
    entities[0]?.id ?? null,
  );

  useEffect(() => {
    if (entities.some((entity) => entity.id === selectedEntityId)) {
      return;
    }

    setSelectedEntityId(entities[0]?.id ?? null);
  }, [entities, selectedEntityId]);

  const selectedEntity =
    entities.find((entity) => entity.id === selectedEntityId) ??
    entities[0] ??
    null;

  const selectEntity = (entityId: string) => {
    setSelectedEntityId(entityId || null);
  };

  return {
    selectedEntity,
    selectEntity,
  };
}

