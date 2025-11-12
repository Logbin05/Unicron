import type { ReactNode } from "react";

export enum typeButton {
  button = "button",
  reset = "reset",
  submit = "submit",
}

export interface buttonProps {
  children?: string | ReactNode;
  type?: typeButton;
  className?: string;
  onClick?: () => void;
}
