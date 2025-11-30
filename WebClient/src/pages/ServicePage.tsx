import { useState } from "react";
import { PopUp } from "@components/popup/popup";
import { mockCourses, mockTariffs } from "@mock/data";
import type { Course } from "@entities/data/course";

export function ServicePage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<"courses" | "tariffs">("courses");

  function openPopup(course: Course) {
    setActiveCourse(course);
    setIsOpen(true);
  }

  function closePopup() {
    setIsOpen(false);
    setActiveCourse(null);
  }

  return (
    <section className="bg-third w-[85vw] mx-auto min-h-screen py-10">
      <div className="flex justify-center mb-12">
        <div className="flex bg-fourth/40 backdrop-blur-xl p-2 rounded-2xl shadow-lg">
          <button
            onClick={() => setActiveTab("courses")}
            className={`
              px-8 py-3 rounded-xl font-Jura text-xl transition-all duration-300
              ${
                activeTab === "courses"
                  ? "bg-primary text-sixth shadow-xl scale-105"
                  : "text-sixth/60 hover:text-sixth"
              }
            `}
          >
            Courses
          </button>

          <button
            onClick={() => setActiveTab("tariffs")}
            className={`
              px-8 py-3 rounded-xl font-Jura text-xl transition-all duration-300
              ${
                activeTab === "tariffs"
                  ? "bg-primary text-sixth shadow-xl scale-105"
                  : "text-sixth/60 hover:text-sixth"
              }
            `}
          >
            Tariffs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10 justify-items-center">
        {activeTab === "courses" &&
          mockCourses.map((c, index) => (
            <div
              key={c.course_id}
              style={{ animationDelay: `${index * 0.08}s` }}
              className="animate-fadeIn bg-fourth/60 backdrop-blur-xl border border-white/10
                         rounded-3xl p-5 max-w-sm w-full shadow-xl
                         hover:shadow-2xl hover:-translate-y-2 hover:border-white/20
                         transition-all duration-500"
            >
              <div className="flex gap-4">
                <img
                  src={c.course_image}
                  alt={c.course_name}
                  className="w-44 h-44 object-cover rounded-2xl shadow-md"
                />
                <div className="flex flex-col justify-between">
                  <h2 className="text-sixth text-xl font-Jura font-bold">
                    {c.course_name}
                  </h2>
                  <p className="text-sixth/70 text-sm mt-2 leading-relaxed">
                    {c.course_desc}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 text-sixth font-medium">
                <span className="text-xl font-bold">${c.price}</span>
                <span className="text-sm opacity-60">
                  {c.visibility === "public" ? "Public" : "Private"}
                </span>

                <button
                  onClick={() => openPopup(c)}
                  className="bg-primary py-2 px-5 rounded-xl font-semibold cursor-pointer
                             transition-all hover:bg-third hover:text-fourth hover:scale-105"
                >
                  More
                </button>
              </div>
            </div>
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
                  Pay
                </button>
              </div>
            </div>
          ))}
      </div>

      {isOpen && activeCourse && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-primary p-6 rounded-2xl w-11/12 max-w-md relative">
            <PopUp
              id={activeCourse.course_id}
              title={activeCourse.course_name}
              description={activeCourse.course_desc}
              image={activeCourse.course_image}
              price={activeCourse.price}
              onClose={closePopup}
            />
          </div>
        </div>
      )}
    </section>
  );
}
