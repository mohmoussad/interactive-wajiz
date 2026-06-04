import type { TimelineMilestone } from "../../types/timeline";
import { milestoneClassMap } from "./timelineConfig";
import { formatYear } from "./timelineDates";
import StarIcon from '@mui/icons-material/Star';

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
          <div className="timeline-milestone__badge" title={milestone.title}>
            <StarIcon fontSize="small" />
          </div>
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
