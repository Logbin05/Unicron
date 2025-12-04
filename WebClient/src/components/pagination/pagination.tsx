import type { PaginationProps } from "@entities/ui/pagination";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export function Pagination(props: PaginationProps) {
  const {
    nav = null,
    disable,
    onNextPaginationClick,
    onPrevPaginationClick,
  } = props;

  function handleNextPageClick() {
    if (!disable.right) onNextPaginationClick();
  }

  function handlePrevPageClick() {
    if (!disable.left) onPrevPaginationClick();
  }

  return (
    <>
      <div className="flex items-center gap-4 py-6 select-none">
        <button
          onClick={handlePrevPageClick}
          disabled={disable.left}
          className={`p-3 rounded-xl border border-white/10 bg-fourth/50
            backdrop-blur-md transition-all
            flex items-center gap-2 font-medium text-sixth ${
              disable.left
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-third hover:-translate-x-1"
            }`}
        >
          <BiChevronLeft size={20} />
          Prev
        </button>
        {nav && (
          <div
            className="text-sixth font-Jura text-lg bg-fourth/50 px-4 py-2
          rounded-xl border border-white/10 backdrop-blur-md shadow"
          >
            {nav.current} / {nav.total}
          </div>
        )}
        <button
          onClick={handleNextPageClick}
          disabled={disable.right}
          className={`p-3 rounded-xl border border-white/10 bg-fourth/50
            backdrop-blur-md transition-all
            flex items-center gap-2 font-medium text-sixth ${
              disable.right
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-third hover:-translate-x-1"
            }`}
        >
          <BiChevronRight size={20} />
          Next
        </button>
      </div>
    </>
  );
}
