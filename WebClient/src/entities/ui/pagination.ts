export type PaginationProps = {
  onNextPaginationClick: () => void;
  onPrevPaginationClick: () => void;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav?: {
    current: number;
    total: number;
  }
};