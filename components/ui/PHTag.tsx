import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  onDark?: boolean;
  inline?: boolean;
}

export default function PHTag({ children = "placeholder", onDark = false, inline = false }: Props) {
  return (
    <span className={`ph-tag${onDark ? " on-dark" : ""}${inline ? " inline" : ""}`}>
      {children}
    </span>
  );
}
