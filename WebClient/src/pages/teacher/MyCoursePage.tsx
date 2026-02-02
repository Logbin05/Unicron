import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { BiPlus, BiEdit } from "react-icons/bi";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import {
  mockUser,
  mockTeachers,
  mockCourses,
  mockCategories,
} from "@mock/data";
import { Button } from "@components/button/button";
import { useState } from "react";
import { ModalPortal } from "@components/portal/portal";
import { CreateCoursePopUp } from "./features/course/CreateCourse";

export function MyCoursePage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const teacher = mockTeachers.find(
    (t) => t.teacher_user_id === mockUser.user_id,
  );

  const myCourses = mockCourses.filter(
    (c) => c.author_id === teacher?.teacher_user_id,
  );

  function toggleOpen() {
    setIsOpen(prev => !prev);
  }

  return (
    <section className="max-w-[1200px] mx-auto mt-6 sm:mt-10 px-4 font-Jura">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-25 sm:text-28 text-sixth font-Tektur">
            My courses
          </h1>
          <p className="text-12 sm:text-14 text-fifth">
            Courses you created and manage
          </p>
        </div>

        <Button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg
        bg-fifth text-primary hover:bg-sixth transition"
        onClick={toggleOpen}>
          <BiPlus className="text-xl" />
          Create course
        </Button>
      </div>

      <ModalPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50"
            >
              <CreateCoursePopUp close={toggleOpen} />
            </motion.div>
          )}
        </AnimatePresence>
      </ModalPortal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map((course) => {
          const category = mockCategories.find(
            (c) => c.category_id === course.category_id,
          );

          return (
            <motion.div
              key={course.course_id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-secondary border border-fourth rounded-xl overflow-hidden flex flex-col"
            >
              <div className="relative h-40">
                <img
                  src={course.course_image}
                  alt={course.course_name}
                  className="w-full h-full object-cover"
                />

                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-10 border backdrop-blur
                    ${
                      course.is_published
                        ? "border-green-400 text-green-400 bg-green-400/10"
                        : "border-yellow-400 text-yellow-400 bg-yellow-400/10"
                    }`}
                >
                  {course.is_published ? "Published" : "Draft"}
                </span>
              </div>

              <div className="p-4 flex flex-col gap-3 flex-1">
                <h3 className="text-sixth text-16">{course.course_name}</h3>

                <p className="text-12 text-fifth line-clamp-2">
                  {course.course_desc}
                </p>

                <div className="flex justify-between items-center text-12 text-fifth mt-auto">
                  <span>{category?.category_name}</span>
                  <span>
                    {course.price === 0 ? "Free" : `$${course.price}`}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 p-4 border-t border-fourth">
                <Link
                  to={`/teacher/courses/${course.course_id}/edit`}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-primary border border-fourth hover:border-fifth transition text-sixth"
                >
                  <BiEdit />
                  Edit
                </Link>

                <button
                  className={`px-3 py-2 rounded-md border transition
                    ${
                      course.is_published
                        ? "border-red-400/40 text-red-400 hover:border-red-400"
                        : "border-green-400/40 text-green-400 hover:border-green-400"
                    }`}
                >
                  {course.is_published ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {myCourses.length === 0 && (
        <div className="mt-20 text-center text-fifth">
          You haven’t created any courses yet
        </div>
      )}
    </section>
  );
}
