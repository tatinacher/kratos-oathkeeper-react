import * as React from "react";

interface KratosLabelProps {
  id: number;
  text: string;
}

export const KratosLabel: React.FC<KratosLabelProps> = ({
  children,
  id,
  text,
}) => (
  <label data-id={id}>
    <span style={{ display: "block" }}>{text}</span>
    {children}
  </label>
);
