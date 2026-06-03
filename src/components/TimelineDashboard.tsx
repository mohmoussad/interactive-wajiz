import { useEffect, useState } from "react";
import { historicalEntities, timelineMilestones } from "../data/historicalData";
import { TimelineCanvas } from "./TimelineCanvas";
import { Toolbox } from "./Toolbox";

export function TimelineDashboard() {
  const [zoomLevel, setZoomLevel] = useState(1.35);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(
    historicalEntities[0]?.id ?? null,
  );

  useEffect(() => {
    if (historicalEntities.some((entity) => entity.id === selectedEntityId)) {
      return;
    }

    setSelectedEntityId(historicalEntities[0]?.id ?? null);
  }, [selectedEntityId]);

  const selectedEntity =
    historicalEntities.find((entity) => entity.id === selectedEntityId) ??
    historicalEntities[0] ??
    null;

  return (
    <div className="timeline-dashboard" dir="rtl">
      <header className="timeline-header">
        <div>
          <p className="timeline-header__eyebrow">التاريخ الإسلامي الوجيز</p>
        </div>
      </header>

      <Toolbox
        zoomLevel={zoomLevel}
        onZoomChange={setZoomLevel}
      />

      <TimelineCanvas
        entities={historicalEntities}
        milestones={timelineMilestones}
        zoomLevel={zoomLevel}
        selectedEntityId={selectedEntity?.id ?? null}
        onSelectEntity={(entityId) => setSelectedEntityId(entityId || null)}
        onZoomChange={setZoomLevel}
      />
    </div>
  );
}
