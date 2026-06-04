import { Box, Typography } from "@mui/material";
import type { HistoricalEntity } from "../../types/timeline";
import { entityTypeLabels, regionLabels } from "./timelineConfig";
import { formatYear } from "./timelineDates";

interface TimelineEntityTooltipContentProps {
  entity: HistoricalEntity;
}

export function TimelineEntityTooltipContent({ entity }: TimelineEntityTooltipContentProps) {
  return (
    <Box sx={{ maxWidth: 300, p: 1.75 }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1.5 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.4 }}>
            {entity.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {formatYear(entity.startYear, entity.hijriStartYear)} -{" "}
            {formatYear(entity.endYear, entity.hijriEndYear)}
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: "text.secondary", whiteSpace: "nowrap" }}>
          {entityTypeLabels[entity.type]}
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ mt: 1, color: "text.secondary", lineHeight: 1.6 }}>
        {entity.summary}
      </Typography>

      <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          المنطقة: {regionLabels[entity.region]}
        </Typography>
      </Box>
    </Box>
  );
}
