import type { HistoricalEntity } from "../../types/timeline";

export interface TimelineTooltipState {
  entity: HistoricalEntity;
  x: number;
  y: number;
}
