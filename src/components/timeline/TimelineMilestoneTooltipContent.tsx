import { Box, Typography } from "@mui/material";
import type { TimelineMilestone } from "../../types/timeline";
import { formatYear } from "./timelineDates";

interface TimelineMilestoneTooltipContentProps {
  milestone: TimelineMilestone;
}

export function TimelineMilestoneTooltipContent({
  milestone,
}: TimelineMilestoneTooltipContentProps) {
  return (
    <Box sx={{ maxWidth: 260, p: 1.5 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.4 }}>
        {milestone.title}
      </Typography>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {formatYear(milestone.year, milestone.hijriYear, milestone.hijriEra)}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1, color: "text.secondary", lineHeight: 1.6 }}>
        {milestone.description}
      </Typography>
    </Box>
  );
}
