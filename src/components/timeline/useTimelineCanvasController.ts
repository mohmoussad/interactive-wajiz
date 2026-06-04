import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { HistoricalEntity } from "../../types/timeline";
import {
  BASE_PIXELS_PER_YEAR,
  getAxisInterval,
  ROW_HEIGHT,
  TIMELINE_END_YEAR,
  TIMELINE_START_YEAR,
  ZOOM_MAX,
  ZOOM_MIN,
} from "./timelineConfig";

interface UseTimelineCanvasControllerProps {
  entities: HistoricalEntity[];
  zoomLevel: number;
  selectedEntityId: string | null;
  onZoomChange: (value: number) => void;
}

export function useTimelineCanvasController({
  entities,
  zoomLevel,
  selectedEntityId,
  onZoomChange,
}: UseTimelineCanvasControllerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<{ x: number; y: number; left: number; top: number } | null>(
    null,
  );
  const zoomAnchorRef = useRef<{ offsetX: number; ratio: number } | null>(null);
  const touchStateRef = useRef<{
    distance: number;
    zoom: number;
    left: number;
    midpointX: number;
  } | null>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  const pixelsPerYear = BASE_PIXELS_PER_YEAR * zoomLevel;

  const bounds = useMemo(
    () => ({
      minYear: TIMELINE_START_YEAR,
      maxYear: TIMELINE_END_YEAR,
    }),
    [],
  );

  const totalYears = bounds.maxYear - bounds.minYear;
  const timelineWidth = Math.max(totalYears * pixelsPerYear, viewportWidth);

  const axisYears = useMemo(() => {
    const interval = getAxisInterval(zoomLevel);
    const years: number[] = [];

    for (let year = bounds.minYear; year <= bounds.maxYear; year += interval) {
      years.push(year);
    }

    if (years[years.length - 1] !== bounds.maxYear) {
      years.push(bounds.maxYear);
    }

    return years;
  }, [bounds.maxYear, bounds.minYear, zoomLevel]);

  useLayoutEffect(() => {
    const updateSize = () => setViewportWidth(containerRef.current?.clientWidth ?? 0);

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current || !zoomAnchorRef.current) {
      return;
    }

    const nextPointerX = zoomAnchorRef.current.ratio * timelineWidth;
    containerRef.current.scrollLeft = Math.max(
      nextPointerX - zoomAnchorRef.current.offsetX,
      0,
    );
    zoomAnchorRef.current = null;
  }, [timelineWidth, zoomLevel]);

  useEffect(() => {
    const selectedIndex = entities.findIndex((entity) => entity.id === selectedEntityId);
    if (selectedIndex < 0 || !containerRef.current) {
      return;
    }

    containerRef.current.scrollTo({
      top: Math.max(selectedIndex * ROW_HEIGHT - ROW_HEIGHT, 0),
      behavior: "smooth",
    });
  }, [entities, selectedEntityId]);

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      if (!containerRef.current || event.touches.length !== 2) {
        return;
      }

      const [touchA, touchB] = event.touches;
      touchStateRef.current = {
        distance: Math.hypot(touchB.clientX - touchA.clientX, touchB.clientY - touchA.clientY),
        zoom: zoomLevel,
        left: containerRef.current.scrollLeft,
        midpointX: (touchA.clientX + touchB.clientX) / 2,
      };
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!containerRef.current || event.touches.length !== 2 || !touchStateRef.current) {
        return;
      }

      event.preventDefault();

      const [touchA, touchB] = event.touches;
      const nextDistance = Math.hypot(
        touchB.clientX - touchA.clientX,
        touchB.clientY - touchA.clientY,
      );
      const nextZoom = clampZoom(
        touchStateRef.current.zoom * (nextDistance / touchStateRef.current.distance),
      );
      const currentWidth = totalYears * BASE_PIXELS_PER_YEAR * touchStateRef.current.zoom;
      const anchorRatio =
        currentWidth <= 0
          ? 0
          : (touchStateRef.current.left + touchStateRef.current.midpointX) / currentWidth;

      zoomAnchorRef.current = {
        offsetX: touchStateRef.current.midpointX,
        ratio: Math.max(anchorRatio, 0),
      };
      onZoomChange(nextZoom);
    };

    const handleTouchEnd = () => {
      touchStateRef.current = null;
    };

    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onZoomChange, totalYears, zoomLevel]);

  const clampZoom = (value: number) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, value));

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) {
      return;
    }

    dragStateRef.current = {
      x: event.clientX,
      y: event.clientY,
      left: containerRef.current.scrollLeft,
      top: containerRef.current.scrollTop,
    };

    containerRef.current.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || !dragStateRef.current) {
      return;
    }

    containerRef.current.scrollLeft = dragStateRef.current.left - (event.clientX - dragStateRef.current.x);
    containerRef.current.scrollTop = dragStateRef.current.top - (event.clientY - dragStateRef.current.y);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragStateRef.current = null;
    containerRef.current?.releasePointerCapture(event.pointerId);
  };

  return {
    axisYears,
    bounds,
    containerRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    pixelsPerYear,
    timelineWidth,
  };
}
