import type { buttonProps } from "@entities/ui/button";

export function Button({ children, onClick, className, type }: buttonProps) {
  return (
    <>
      <button type={type} onClick={onClick} className={className}>
        {children}
      </button>
    </>
  );
}
