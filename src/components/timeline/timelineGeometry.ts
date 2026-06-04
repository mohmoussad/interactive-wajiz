export function getYearOffset(
  year: number,
  boundsMinYear: number,
  pixelsPerYear: number,
): number {
  return (year - boundsMinYear) * pixelsPerYear;
}

export function getVisibleYearOffset(
  year: number,
  boundsMinYear: number,
  pixelsPerYear: number,
  timelineWidth: number,
): number {
  // Keep the terminal RTL tick inside the rendered surface so labels do not create extra scroll width.
  return Math.min(getYearOffset(year, boundsMinYear, pixelsPerYear), timelineWidth - 1);
}
