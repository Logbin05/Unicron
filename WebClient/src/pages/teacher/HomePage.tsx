import { Link } from "react-router";
import { motion } from "framer-motion";
import { RiBookLine, RiStarFill, RiUserFollowLine } from "react-icons/ri";
import { BiPlus } from "react-icons/bi";

import { mockTeacherProfiles, mockCourses } from "@mock/data";

export function THomePage() {
  const teacherProfile = mockTeacherProfiles[0];

  const teacherCourses = mockCourses.filter(
    (c) => c.author_id === teacherProfile.teacher.teacher_user_id,
  );

  const totalStudents = teacherCourses.length * 42;
  const avgRating = teacherProfile.teacher.teacher_rating;

  return (
    <section className="w-full 2k:px-6 lg:px-30 py-16 flex justify-center">
      <div className="w-full max-w-[1600px] flex flex-col gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-fifth/40 border border-white/10 rounded-3xl p-10 backdrop-blur-lg shadow-xl"
        >
          <h1 className="font-Tektur text-4xl text-sixth mb-3">
            Welcome back, {teacherProfile.user.full_name}
          </h1>
          <p className="font-Jura text-sixth/70 text-lg max-w-2xl">
            Manage your courses, track student activity and grow your teaching
            profile on the platform.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              label: "My Courses",
              value: teacherCourses.length,
              icon: <RiBookLine />,
            },
            {
              label: "Students",
              value: totalStudents,
              icon: <RiUserFollowLine />,
            },
            {
              label: "Rating",
              value: avgRating,
              icon: <RiStarFill />,
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.04 }}
              className="bg-fifth/60 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-md text-sixth"
            >
              <div className="flex items-center gap-3 text-xl font-Jura opacity-70 mb-2">
                {stat.icon}
                {stat.label}
              </div>
              <div className="font-Tektur text-4xl">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="font-Tektur text-3xl text-sixth">My Courses</h2>

            <Link
              to="/teacher/courses/create"
              className="flex items-center gap-2 bg-primary text-sixth font-Jura px-6 py-3 rounded-xl hover:bg-third transition"
            >
              <BiPlus className="text-xl" />
              Create course
            </Link>
          </div>

          {teacherCourses.length === 0 ? (
            <div className="text-sixth/60 font-Jura">
              You don’t have any courses yet.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {teacherCourses.map((course) => (
                <motion.div
                  key={course.course_id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-fifth/40 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-lg flex flex-col gap-3"
                >
                  <h3 className="font-Tektur text-xl text-sixth">
                    {course.course_name}
                  </h3>

                  <p className="font-Jura text-sixth/70 text-sm line-clamp-3">
                    {course.course_desc}
                  </p>

                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-Jura text-sixth font-semibold">
                      ${course.price}
                    </span>

                    <Link
                      to={`/teacher/courses/${course.course_id}`}
                      className="text-fifth font-Jura hover:underline"
                    >
                      Manage →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
