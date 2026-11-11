"use client";

import { PHONE_REGIONS, PhoneRegion } from "@/lib/phone";
import { useState } from "react";

type PhoneFieldProps = {
  id: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
};

export default function PhoneField({ id, error, required = false, optional = false }: PhoneFieldProps) {
  const [region, setRegion] = useState<PhoneRegion>("usa");
  const selectedRegion = PHONE_REGIONS.find((item) => item.value === region) ?? PHONE_REGIONS[0];

  return (
    <div className="af-field phone-field">
      <label htmlFor={id}>
        Phone {optional && <span className="af-hint">(optional)</span>}
      </label>
      <div className="phone-field-control">
        <select
          name="phoneRegion"
          aria-label="Phone region"
          value={region}
          onChange={(event) => setRegion(event.target.value as PhoneRegion)}
        >
          {PHONE_REGIONS.map((region) => (
            <option key={region.value} value={region.value}>{region.label}</option>
          ))}
        </select>
        <input
          id={id}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={selectedRegion.placeholder}
          required={required}
        />
      </div>
      <span className="phone-field-help">Accepted formats update for your selected region.</span>
      {error && <span className="af-error">{error}</span>}
    </div>
  );
}
