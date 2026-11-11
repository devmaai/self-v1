export type PhoneRegion = "usa" | "canada" | "latam";

export const PHONE_REGIONS: Array<{ value: PhoneRegion; label: string; placeholder: string }> = [
  { value: "usa", label: "United States (+1)", placeholder: "(555) 123-4567" },
  { value: "canada", label: "Canada (+1)", placeholder: "(416) 555-0123" },
  { value: "latam", label: "Latin America", placeholder: "+52 55 1234 5678" },
];

export function normalizePhone(raw: string, region: PhoneRegion): string | null {
  const digits = raw.replace(/\D/g, "");

  if (region === "usa" || region === "canada") {
    const ten = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
    if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(ten)) return null;
    return `+1 ${ten.slice(0, 3)}-${ten.slice(3, 6)}-${ten.slice(6)}`;
  }

  const latamDigits = digits.startsWith("00") ? digits.slice(2) : digits;
  if (latamDigits.length < 8 || latamDigits.length > 12) return null;
  if (/^(\d)\1+$/.test(latamDigits)) return null;
  return raw.trim().startsWith("+") || digits.startsWith("00") ? `+${latamDigits}` : latamDigits;
}

export function isPhoneRegion(value: unknown): value is PhoneRegion {
  return value === "usa" || value === "canada" || value === "latam";
}
