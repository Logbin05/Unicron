import { useRef, useState, useLayoutEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { LuCheck } from "react-icons/lu";
import { motion, AnimatePresence } from "motion/react";
import type { DropdownProps, DropdownItem } from "@entities/ui/dropdown";

export function DropDown({
  label,
  items,
  onSelect,
  value,
}: DropdownProps & { value?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selected = items.find((i) => i.value === value) || null;

  useLayoutEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(item: DropdownItem) {
    onSelect(item.value);
    setIsOpen(false);
  }

  return (
    <div ref={ref} className="relative w-[240px] select-none">
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex justify-between items-center w-full bg-fourth/40
        backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl
        text-fifth text-lg font-medium transition hover:bg-fourth/60 z-50"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {selected?.icon}
          <span className="truncate">{selected?.label || label}</span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <BiChevronDown size={24} />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-2 w-full bg-fourth/70
            backdrop-blur-xl border border-white/10 rounded-xl shadow-xl
            overflow-y-auto max-h-80 z-9999"
          >
            {items.map((item) => (
              <motion.li
                key={item.value}
                onClick={() => handleSelect(item)}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center justify-between px-4 py-3 text-sixth text-lg cursor-pointer
                  border-b border-white/5 last:border-none transition-colors ${
                    selected?.value === item.value
                      ? "bg-white/10 font-semibold"
                      : ""
                  }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </div>
                {selected?.value === item.value && <LuCheck />}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
