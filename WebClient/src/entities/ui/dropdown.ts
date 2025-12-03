export interface DropdownProps {
  label: string;
  items: DropdownItem[];
  onSelect: (value: string) => void;
  width?: string;
}

export type DropdownItem = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};
