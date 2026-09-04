type LocationPinProps = {
  className?: string;
};

export default function LocationPin({ className }: LocationPinProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M19 10.2c0 5.2-7 10.8-7 10.8S5 15.4 5 10.2a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
