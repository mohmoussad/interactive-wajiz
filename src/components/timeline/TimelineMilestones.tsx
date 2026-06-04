import Tooltip from "@mui/material/Tooltip";
import type { TimelineMilestone } from "../../types/timeline";
import { milestoneClassMap } from "./timelineConfig";
import { formatYear } from "./timelineDates";
import StarIcon from '@mui/icons-material/Star';
import { TimelineMilestoneTooltipContent } from "./TimelineMilestoneTooltipContent";

interface TimelineMilestonesProps {
  milestones: TimelineMilestone[];
  boundsMinYear: number;
  pixelsPerYear: number;
}

export function TimelineMilestones({
  milestones,
  boundsMinYear,
  pixelsPerYear,
}: TimelineMilestonesProps) {
  return (
    <>
      {milestones.map((milestone) => (
        <div
          key={milestone.id}
          className={`timeline-milestone ${milestoneClassMap[milestone.accent]}`}
          style={{
            insetInlineStart: (milestone.year - boundsMinYear) * pixelsPerYear,
          }}
        >
          <Tooltip
            title={<TimelineMilestoneTooltipContent milestone={milestone} />}
            placement="top"
            slotProps={{
              tooltip: {
                sx: {
                  bgcolor: "rgba(255, 250, 241, 0.98)",
                  color: "inherit",
                  border: "1px solid var(--line)",
                  boxShadow: "0 24px 50px rgba(28, 16, 68, 0.16)",
                },
              },
            }}
          >
            <div className="timeline-milestone__badge">
              <StarIcon fontSize="small" />
            </div>
          </Tooltip>
          <div className="timeline-milestone__card">
            <strong>{milestone.title}</strong>
            <p>{milestone.description}</p>
            <small>{formatYear(milestone.year, milestone.hijriYear, milestone.hijriEra)}</small>
          </div>
        </div>
      ))}
    </>
  );
}
