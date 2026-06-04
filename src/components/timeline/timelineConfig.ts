import type { EntityType, Region } from "../../types/timeline";

export const ROW_HEIGHT = 64;
export const BASE_PIXELS_PER_YEAR = 2.2;

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
