import {
  HiChevronDoubleLeft,
  HiHome,
  HiUser,
  HiCog6Tooth,
  HiInboxStack,
  HiBookOpen,
  HiOutlineViewfinderCircle,
  HiMiniCurrencyDollar,
  HiUserGroup,
  HiSquare3Stack3D,
} from "react-icons/hi2";
import { motion } from "motion/react";
import avatar from "@assets/image/avatar.jpeg";
import { useLanguage } from "@hooks/useLanguage";
import { MESSAGES } from "@lang/teacher/messages";
import type { SidebarType } from "@store/sidebar";
import { useEffect, useRef, useState } from "react";
import { HiLogout, HiSupport } from "react-icons/hi";
import { Link } from "react-router";

export function SidebarTeacher() {
  const { lang } = useLanguage();
  const t = MESSAGES[lang].sidebar;

  const [pinned, setPinned] = useState(false);
  const [sidebar, setSidebar] = useState<SidebarType>({ isOpen: false });
  const innerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!innerRef.current) return;
      if (isMobile) return;
      if (
        sidebar.isOpen &&
        !innerRef.current.contains(e.target as Node) &&
        !pinned
      ) {
        setSidebar({ isOpen: false });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebar.isOpen, pinned, isMobile]);

  const sections = [
    {
      title: t.label_1,
      items: [
        {
          label: t.home,
          icon: <HiHome className="text-2xl" />,
          link: "/t/home",
        },
        {
          label: t.profile,
          icon: <HiUser className="text-2xl" />,
          link: "/t/card",
        },
        {
          label: t.message,
          icon: <HiInboxStack className="text-2xl" />,
          link: "/t/message",
        },
      ],
    },
    {
      title: t.label_2,
      items: [
        {
          label: t.myCourse,
          icon: <HiBookOpen className="text-2xl" />,
          link: "/t/my-course",
        },
        {
          label: t.favorite,
          icon: <HiMiniCurrencyDollar className="text-2xl" />,
          link: "/t/income",
        },
      ],
    },
    {
      title: t.label_3,
      items: [
        {
          label: t.dashboard,
          icon: <HiUserGroup className="text-2xl" />,
          link: "/t/students",
        },
        {
          label: t.services,
          icon: <HiSquare3Stack3D className="text-2xl" />,
          link: "/t/services",
        },
        {
          label: t.settings,
          icon: <HiCog6Tooth className="text-2xl" />,
          link: "/t/settings",
        },
      ],
    },
    {
      title: t.label_4,
      items: [
        {
          label: t.contact,
          icon: <HiSupport className="text-2xl" />,
          link: "/t/support",
        },
        { label: t.logout, icon: <HiLogout className="text-2xl" />, link: "/" },
      ],
    },
  ];

  function togglePin() {
    setPinned((v) => !v);
  }

  function renderMenuSection(
    title: string,
    items: (typeof sections)[0]["items"],
  ) {
    return (
      <div>
        <p
          className={`text-white/40 text-xs font-Jura mb-2 px-1 transition-all duration-200 ${
            sidebar.isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {title}
        </p>
        <div className="flex flex-col">
          {items.map((item, i) => (
            <Link key={i} to={item.link}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className="flex items-center px-3 py-3 rounded-xl hover:bg-white/10 text-white/80 transition-all"
              >
                <div className="w-7 flex justify-center">{item.icon}</div>
                <span
                  className={`font-Jura text-base whitespace-nowrap transition-all duration-300 ${
                    sidebar.isOpen
                      ? "opacity-100 ml-3"
                      : "opacity-0 ml-0 pointer-events-none"
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
        <div className="my-3 border-t border-white/10" />
      </div>
    );
  }

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
          transition-[width] duration-300 ease-in-out ${
            sidebar.isOpen ? "w-64" : "w-20"
          }`}
        onMouseEnter={() => !isMobile && setSidebar({ isOpen: true })}
        onMouseLeave={() =>
          !isMobile && !pinned && setSidebar({ isOpen: false })
        }
      >
        <div ref={innerRef} className="h-full flex flex-col">
          <div className="flex items-center justify-between px-4 py-5 border-b border-fifth/30">
            <div
              className={`flex items-center gap-3 transition-all duration-300 ${
                sidebar.isOpen
                  ? "opacity-100 max-w-[200px]"
                  : "opacity-0 max-w-0"
              }`}
            >
              <img
                src={avatar}
                className="w-10 h-10 rounded-full shadow-md object-cover shrink-0"
              />
              <div className="font-Jura">
                <p className="text-white/90 font-semibold">Alexey</p>
                <p className="text-white/50 text-sm">Developer</p>
              </div>
            </div>
            <div className="flex items-center gap-2 -mx-4">
              <button
                onClick={togglePin}
                className={`p-2 rounded-lg hover:bg-white/10 transition ${
                  pinned ? "bg-white/10" : ""
                }`}
              >
                <HiOutlineViewfinderCircle
                  className={`text-lg ${
                    pinned ? "text-emerald-300" : "text-white"
                  }`}
                />
              </button>
              <button
                onClick={() => setSidebar({ isOpen: !sidebar.isOpen })}
                className="p-2 rounded-lg hover:bg-white/10 transition"
              >
                <HiChevronDoubleLeft
                  className={`text-xl transition-transform fill-white ${
                    !sidebar.isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="mt-5 px-3 overflow-y-hidden flex-1">
            {sections.map((section) =>
              renderMenuSection(section.title, section.items),
            )}
          </div>
        </div>
      </motion.aside>
      {isMobile && (
        <button
          className="lg:hidden fixed top-6 left-6 z-50 p-3 rounded-xl bg-primary text-white shadow-xl"
          onClick={() => setSidebar({ isOpen: true })}
        >
          ☰
        </button>
      )}
    </>
  );
}
