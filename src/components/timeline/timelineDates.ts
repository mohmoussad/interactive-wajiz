export function gregorianYearToHijriYear(year: number): number {
  const formatter = new Intl.DateTimeFormat("en-u-ca-islamic", {
    year: "numeric",
    timeZone: "UTC",
  });

  const hijriYear = formatter.formatToParts(new Date(Date.UTC(year, 0, 1))).find(
    (part) => part.type === "year",
  )?.value;

  return hijriYear ? Number(hijriYear) : year;
}

export function formatHijriYear(year: number, era?: "AH" | "BH"): string {
  return era === "BH" ? `${year} ق.هـ` : `${year} هـ`;
}

export function formatYear(year: number, hijriYear: number, era?: "AH" | "BH"): string {
  return `${year} م / ${formatHijriYear(hijriYear, era)}`;
}
