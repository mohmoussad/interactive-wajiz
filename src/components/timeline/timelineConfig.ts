import type { EntityType, Region } from "../../types/timeline";

export const ROW_HEIGHT = 64;
export const BASE_PIXELS_PER_YEAR = 2.2;
export const TIMELINE_START_YEAR = 630;
export const TIMELINE_END_YEAR = 1930;
export const ZOOM_MIN = 0.75;
export const ZOOM_MAX = 3;
export const ZOOM_STEP = 0.05;

export function getAxisInterval(zoomLevel: number): number {
  if (zoomLevel >= 2.4) {
    return 10;
  }

  if (zoomLevel >= 1.8) {
    return 25;
  }

  if (zoomLevel >= 1.1) {
    return 50;
  }

  return 100;
}

export const regionLabels: Record<Region, string> = {
  "Arabian Peninsula": "شبه الجزيرة العربية",
  Levant: "بلاد الشام",
  "North Africa": "شمال أفريقيا",
  "Al-Andalus": "الأندلس",
  Persia: "فارس",
  Anatolia: "الأناضول",
  "Central Asia": "آسيا الوسطى",
};

export const entityTypeLabels: Record<EntityType, string> = {
  caliphate: "خلافة",
  dynasty: "سلالة",
  empire: "إمبراطورية",
  kingdom: "مملكة",
  alliance: "تحالف",
  sultanate: "سلطنة",
  scholarly: "علمي",
};
