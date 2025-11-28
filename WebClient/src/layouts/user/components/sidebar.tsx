import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { SidebarType } from "@store/sidebar";
import {
  HiChevronDoubleLeft,
  HiHome,
  HiUser,
  HiCog6Tooth,
  HiInboxStack,
  HiBookOpen,
  HiBookmark,
  HiSquares2X2,
  HiOutlineViewfinderCircle,
} from "react-icons/hi2";
import { HiLogout, HiSupport } from "react-icons/hi";

export function SidebarUser() {
  const [pinned, setPinned] = useState<boolean>(false);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [sidebar, setSidebar] = useState<SidebarType>({ isOpen: false });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (!innerRef.current) return;
      if (isMobile) return;
      if (sidebar.isOpen && !innerRef.current.contains(target) && !pinned) {
        setSidebar({ isOpen: false });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebar.isOpen, pinned, isMobile]);

  const accountMenu = [
    { label: "Home", icon: <HiHome className="text-2xl" /> },
    { label: "Profile", icon: <HiUser className="text-2xl" /> },
    { label: "Message", icon: <HiInboxStack className="text-2xl" /> },
  ];

  const coursesMenu = [
    { label: "My course", icon: <HiBookOpen className="text-2xl" /> },
    { label: "Favorite", icon: <HiBookmark className="text-2xl" /> },
  ];

  const otherMenu = [
    { label: "Dashboard", icon: <HiSquares2X2 className="text-2xl" /> },
    { label: "Settings", icon: <HiCog6Tooth className="text-2xl" /> },
  ];

  const footerMenu = [
    { label: "Contact IT", icon: <HiSupport className="text-2xl" /> },
    { label: "LogOut", icon: <HiLogout className="text-2xl" /> },
  ];

  const openSidebar = () => setSidebar({ isOpen: true });
  const closeSidebar = () => !pinned && setSidebar({ isOpen: false });
  const togglePin = () => setPinned((v) => !v);

  const renderMenuSection = (title: string, items: typeof accountMenu) => (
    <div>
      {sidebar.isOpen && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: sidebar.isOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white/40 text-xs font-Jura mb-2 px-1"
        >
          {title}
        </motion.p>
      )}

      <div className="flex flex-col gap-1">
        {items.map((item, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.03 }}
            className={`flex items-center gap-4 px-3 py-3 rounded-xl
                        hover:bg-white/10 text-white/80 transition-all
                        ${!sidebar.isOpen ? "justify-center px-0" : ""}`}
          >
            {item.icon}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: sidebar.isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className={`font-Jura text-base whitespace-nowrap ${
                sidebar.isOpen ? "block" : "hidden"
              }`}
            >
              {item.label}
            </motion.span>
          </motion.button>
        ))}
      </div>

      <div className="my-3 border-t border-white/10" />
    </div>
  );

  return (
    <>
      <div
        onClick={() => isMobile && setSidebar({ isOpen: false })}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity lg:hidden ${
          sidebar.isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <motion.aside
        initial={{ x: isMobile ? -260 : 0 }}
        animate={{ x: sidebar.isOpen ? 0 : isMobile ? -260 : 0 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className={`fixed top-0 left-0 h-full z-40 bg-fourth/70 dark:bg-neutral-900/70
              backdrop-blur-xl border-r border-fifth/30 shadow-2xl
              transition-[width] duration-300 ease-in-out
              ${sidebar.isOpen ? "w-64" : "w-20"}`}
        onMouseEnter={() => !isMobile && openSidebar()}
        onMouseLeave={() => !isMobile && closeSidebar()}
      >
        <div ref={innerRef} className="h-full flex flex-col">
          <div className="flex items-center justify-between px-4 py-5 border-b border-fifth/30">
            {sidebar.isOpen && (
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pinimg.com/736x/49/80/1b/49801b4e50af5338c113bc79c6c30ceb.jpg"
                  className="w-10 h-10 rounded-full shadow-md object-cover"
                />
                <div className="font-Jura">
                  <p className="text-white/90 font-semibold">Alexey</p>
                  <p className="text-white/50 text-sm">Developer</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 -mx-4">
              <button
                onClick={togglePin}
                className={`p-2 rounded-lg hover:bg-white/10 transition ${
                  pinned ? "bg-white/10" : ""
                }`}
                aria-pressed={pinned}
                title={pinned ? "Unpin sidebar" : "Pin sidebar"}
              >
                <HiOutlineViewfinderCircle
                  className={`text-lg ${pinned ? "text-emerald-300" : "text-white"}`}
                />
              </button>

              <button
                onClick={() => setSidebar({ isOpen: !sidebar.isOpen })}
                className="p-2 rounded-lg hover:bg-white/10 transition"
                title="Toggle"
              >
                <HiChevronDoubleLeft
                  className={`text-xl transition-transform fill-white ${
                    !sidebar.isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="mt-5 px-3 overflow-auto flex-1">
            {renderMenuSection("Account", accountMenu)}
            {renderMenuSection("Courses", coursesMenu)}
            {renderMenuSection("Other", otherMenu)}
            {renderMenuSection("Action", footerMenu)}
          </div>
        </div>
      </motion.aside>

      {isMobile && (
        <button
          className="lg:hidden fixed top-6 left-6 z-50 p-3 rounded-xl bg-primary text-white shadow-xl"
          onClick={() => setSidebar({ isOpen: true })}
          aria-label="Open menu"
        >
          ☰
        </button>
      )}
    </>
  );
}
