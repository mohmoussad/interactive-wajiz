export type EntityType =
  | "caliphate"
  | "dynasty"
  | "empire"
  | "kingdom"
  | "alliance"
  | "sultanate"
  | "scholarly";

export type Region =
  | "Arabian Peninsula"
  | "Levant"
  | "North Africa"
  | "Al-Andalus"
  | "Persia"
  | "Anatolia"
  | "Central Asia";

export interface HistoricalEntity {
  id: string;
  name: string;
  region: Region;
  type: EntityType;
  startYear: number;
  hijriStartYear: number;
  endYear: number;
  hijriEndYear: number;
  peakYear: number;
  hijriPeakYear: number;
  summary: string;
  accent: "emerald" | "amber" | "rose" | "indigo" | "teal" | "orange";
}

export interface TimelineMilestone {
  id: string;
  title: string;
  year: number;
  hijriYear: number;
  hijriEra?: "AH" | "BH";
  description: string;
  accent: "rose" | "orange" | "teal";
}
