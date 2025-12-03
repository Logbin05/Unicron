import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import type { Course } from "@entities/data/course";
import { PopUp } from "@features/course_popup/popup";
import { DropDown } from "@components/dropdown/dropdown";
import type { DropdownItem } from "@entities/ui/dropdown";
import { mockCourses, mockTariffs, mockCategories } from "@mock/data";
import { motion, AnimatePresence, type Variants } from "framer-motion";

export function ServicePage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<"courses" | "tariffs">("courses");
  const [selectedCategory, setSelectedCategory] = useState<DropdownItem | null>(
    null
  );

  function openPopup(course: Course) {
    setActiveCourse(course);
    setIsOpen(true);
  }

  function closePopup() {
    setIsOpen(false);
    setActiveCourse(null);
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: custom * 0.08,
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    }),
    hover: { scale: 1.05, y: -5, boxShadow: "0 20px 30px rgba(0,0,0,0.3)" },
  };

  return (
    <section className="bg-linear-to-b from-fourth/80 via-third to-fourth min-h-screen py-12 px-6">
      <div className="flex justify-center mb-12 gap-5 z-20 relative">
        {activeTab === "courses" && (
          <div
            className="flex bg-fourth/30 backdrop-blur-2xl p-2
          justify-around rounded-3xl shadow-xl items-center"
          >
            <input
              type="text"
              placeholder="Searches courses"
              className="outline-2 outline-fifth rounded-2xl 2k:w-lg font-Tektur
              xl:text-lg xl:px-2 xl:py-2 xl:w-lg
              2k:text-xl 2k:px-3 2k:py-2 text-fifth placeholder:text-fifth transition-all focus-visible:outline-fifth
              focus-visible:shadow-lg focus-visible:shadow-fifth"
            />
            <button
              type="button"
              className="bg-secondary xl:p-2 xl:mx-2 2k:p-3 2k:mx-3 rounded-xl cursor-pointer transition-all active:bg-secondary/70"
            >
              <HiSearch className="text-2xl text-fifth" />
            </button>
          </div>
        )}

        <div className="flex bg-fourth/30 backdrop-blur-2xl p-2 rounded-3xl shadow-xl">
          {["courses", "tariffs"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "courses" | "tariffs")}
              className={`
                px-10 py-3 rounded-xl font-Jura text-xl font-semibold transition-all duration-300
                ${
                  activeTab === tab
                    ? "bg-linear-to-r from-primary to-secondary text-sixth shadow-2xl scale-105"
                    : "text-sixth/60 hover:text-sixth hover:scale-105"
                }
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "courses" && (
          <div className="flex bg-fourth/30 backdrop-blur-2xl p-2 justify-around rounded-3xl shadow-xl items-center relative z-50">
            <DropDown
              label="Select category"
              items={mockCategories.map((c) => ({
                label: c.category_name,
                value: c.category_id.toString(),
              }))}
              value={selectedCategory?.value}
              onSelect={(val) => {
                const item =
                  mockCategories
                    .map((c) => ({
                      label: c.category_name,
                      value: c.category_id.toString(),
                    }))
                    .find((i) => i.value === val) || null;
                setSelectedCategory(item);
              }}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2k:grid-cols-3 gap-5 justify-items-center z-0 relative">
        <AnimatePresence>
          {activeTab === "courses" &&
            mockCourses.map((c, index) => (
              <motion.div
                key={c.course_id}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={cardVariants}
                className="bg-fourth/60 backdrop-blur-xl border border-white/10
                           rounded-3xl p-2 w-full lg:max-w-lg 2k:max-w-2xl 2k:p-5 cursor-pointer transform-gpu relative z-0"
              >
                <div className="flex gap-4">
                  <motion.img
                    src={c.course_image}
                    alt={c.course_name}
                    className="w-44 h-44 2k:size-60 object-cover rounded-2xl shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                  />
                  <div className="flex flex-col justify-between">
                    <h2 className="text-sixth text-xl font-Jura font-bold">
                      {c.course_name}
                    </h2>
                    <p className="text-sixth/70 text-sm mt-2 leading-relaxed line-clamp-5">
                      {c.course_desc}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 text-sixth font-medium">
                  <span className="text-xl font-bold">
                    {c.price !== 0 ? `$${c.price}` : "Free"}
                  </span>
                  <span className="text-sm opacity-60">
                    {c.visibility === "public" ? "Public" : "Private"}
                  </span>
                  <button
                    onClick={() => openPopup(c)}
                    className="bg-linear-to-r from-primary to-secondary py-2 px-5 rounded-xl font-semibold text-sixth shadow-lg
                               transition-all hover:scale-110 hover:shadow-2xl"
                  >
                    More
                  </button>
                </div>
              </motion.div>
            ))}

          {activeTab === "tariffs" &&
            mockTariffs.map((t, index) => (
              <div
                key={t.tariff_id}
                style={{ animationDelay: `${index * 0.08}s` }}
                className="animate-fadeIn bg-fourth/60 backdrop-blur-xl border border-white/10
                         rounded-3xl p-6 max-w-sm w-full shadow-xl
                         hover:shadow-2xl hover:-translate-y-2 hover:border-white/20
                         transition-all duration-500 flex flex-col justify-between"
              >
                <h2 className="text-sixth text-2xl font-Jura font-bold mb-4">
                  {t.tariff_name}
                </h2>

                <p className="text-sixth/70 text-sm mb-8 leading-relaxed">
                  {t.tariff_desc}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-3xl font-extrabold text-sixth">
                    ${t.tariff_price}
                  </span>

                  <button
                    className="bg-primary py-2 px-7 rounded-xl font-semibold cursor-pointer
                             transition-all hover:bg-third hover:text-fourth hover:scale-105"
                  >
                    {t.tariff_price === 0 ? "Free" : "Pay"}
                  </button>
                </div>
              </div>
            ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && activeCourse && (
          <motion.div
            className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-primary p-6 rounded-3xl w-11/12 max-w-md shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { type: "spring", stiffness: 120 },
              }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <PopUp
                id={activeCourse.course_id}
                title={activeCourse.course_name}
                description={activeCourse.course_desc}
                image={activeCourse.course_image}
                price={activeCourse.price}
                onClose={closePopup}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
