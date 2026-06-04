import { useState } from "react";
import { historicalEntities, timelineMilestones } from "../data/historicalData";
import { TimelineCanvas } from "./TimelineCanvas";
import { useSelectedTimelineEntity } from "./timeline/useSelectedTimelineEntity";
import { Toolbox } from "./Toolbox";

export function TimelineDashboard() {
  const [zoomLevel, setZoomLevel] = useState(1.35);
  const { selectedEntity, selectEntity } = useSelectedTimelineEntity(historicalEntities);

  return (
    <section className="timeline-dashboard" dir="rtl">
      <Toolbox
        zoomLevel={zoomLevel}
        onZoomChange={setZoomLevel}
      />

      <TimelineCanvas
        entities={historicalEntities}
        milestones={timelineMilestones}
        zoomLevel={zoomLevel}
        selectedEntityId={selectedEntity?.id ?? null}
        onSelectEntity={selectEntity}
        onZoomChange={setZoomLevel}
      />
    </section>
  );
}
