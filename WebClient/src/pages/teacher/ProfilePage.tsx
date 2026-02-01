import { useState } from "react";
import { motion } from "framer-motion";
import { HiUser } from "react-icons/hi2";
import { HiMail } from "react-icons/hi";
import {
  BiCheckShield,
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoTwitter,
} from "react-icons/bi";
import { IoWarningOutline } from "react-icons/io5";
import { RiStarFill } from "react-icons/ri";
import avatar from "@assets/image/avatar.jpeg";
import { mockTeacherProfiles, mockCourses } from "@mock/data";
import { Link } from "react-router";

// Дополнительно моки для отзывов, активности и сертификатов
const mockReviews = [
  {
    student: "John Doe",
    rating: 5,
    comment: "Excellent explanations and engaging lessons!",
  },
  { student: "Jane Smith", rating: 4, comment: "Very helpful and clear." },
  {
    student: "Alex Johnson",
    rating: 5,
    comment: "Learned a lot from this teacher!",
  },
];

const mockActivities = [
  "Added new course: Advanced React Patterns",
  "Updated course: JavaScript Zero to Hero",
  "Published article on teaching tips",
];

const mockCertificates = [
  "Certified React Instructor",
  "Top Rated Teacher 2025",
  "Best UX/UI Mentor Award",
];

export function TProfilePage() {
  const [teacherProfile] = useState(mockTeacherProfiles[0]);
  const teacherCourses = mockCourses.filter(
    (c) => c.author_id === teacherProfile.teacher.teacher_id + 2,
  );

  return (
    <section className="lg:w-screen m-auto flex justify-center rounded-tl-2xl rounded-bl-2xl bg-fourth py-16 px-6 lg:px-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="grid w-full max-w-[1600px] grid-cols-1 lg:grid-cols-3 gap-12"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center lg:items-start gap-8
          bg-fifth/40 p-8 rounded-3xl shadow-xl max-h-2/5
          backdrop-blur-md border border-white/10"
        >
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <div className="rounded-full overflow-hidden shadow-2xl border-4 border-fifth w-44 h-44">
              <img
                src={avatar}
                alt={teacherProfile.user.full_name}
                className="w-full h-full object-cover"
              />
            </div>
            {!teacherProfile.teacher.teacher_is_verified && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute -bottom-3 -right-3 bg-red-500 p-3 rounded-full shadow-xl"
              >
                <IoWarningOutline className="text-white text-2xl" />
              </motion.div>
            )}
          </motion.div>

          <h2 className="font-Tektur text-4xl text-sixth text-center lg:text-left drop-shadow-lg">
            {teacherProfile.user.full_name}
          </h2>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`flex items-center gap-3 font-Jura px-6 py-3 rounded-2xl text-xl shadow-lg backdrop-blur-lg border
            ${
              teacherProfile.teacher.teacher_is_verified
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                : "bg-red-500/20 text-red-400 border-red-500/40"
            }`}
          >
            {teacherProfile.teacher.teacher_is_verified ? (
              <BiCheckShield className="text-3xl" />
            ) : (
              <IoWarningOutline className="text-3xl" />
            )}
            <span>
              {teacherProfile.teacher.teacher_is_verified
                ? "Verified Teacher"
                : "Not Verified"}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sixth/80 text-center lg:text-left font-Jura text-lg mt-4"
          >
            {teacherProfile.teacher.teacher_bio ||
              "This teacher has not added a bio yet."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-4 mt-4 items-center"
          >
            <Link
              to="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-sixth bg-fourth p-1 rounded-2xl
              hover:scale-110 transition-transform"
            >
              <BiLogoFacebook className="text-2xl" />
            </Link>

            <Link
              to="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-sixth bg-fourth p-1 rounded-2xl
              hover:scale-110 transition-transform"
            >
              <BiLogoTwitter className="text-2xl" />
            </Link>

            <Link
              to="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-sixth bg-fourth p-1 rounded-2xl
              hover:scale-110 transition-transform"
            >
              <BiLogoLinkedin className="text-2xl" />
            </Link>

            <Link
              to="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-sixth bg-fourth p-1 rounded-2xl
              hover:scale-110 transition-transform"
            >
              <BiLogoInstagram className="text-2xl" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-2 flex flex-col gap-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                label: "Email",
                value: teacherProfile.user.email,
                icon: <HiMail />,
              },
              {
                label: "Specialization",
                value: teacherProfile.teacher.teacher_specialization,
                icon: <HiUser />,
              },
              {
                label: "Experience (years)",
                value: teacherProfile.teacher.teacher_experience_years,
                icon: <RiStarFill />,
              },
              {
                label: "Rating",
                value: teacherProfile.teacher.teacher_rating,
                icon: <RiStarFill />,
              },
              {
                label: "Reviews",
                value: teacherProfile.teacher.teacher_reviews_count,
                icon: <RiStarFill />,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.04 }}
                className="bg-fifth/60 rounded-2xl p-5 shadow-xl text-sixth font-Jura backdrop-blur-lg border
                 border-white/10"
              >
                <span className="font-semibold mb-1 flex flex-row items-center text-lg opacity-70 gap-1">
                  {item.icon} {item.label}:
                </span>
                <span className="text-xl font-light">{item.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="font-Tektur text-3xl text-sixth drop-shadow-lg tracking-wide">
              My Courses
            </h3>
            {teacherCourses.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-fifth/40 border border-white/10 p-4 rounded-xl shadow-lg backdrop-blur-lg"
              >
                <span className="text-sixth font-Jura text-lg">
                  {course.course_name}
                </span>
                <span className="text-sixth/70 text-sm block mt-1">
                  {course.course_desc}
                </span>
                <span className="text-sixth font-semibold mt-2 block">
                  Price: ${course.price}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="font-Tektur text-3xl text-sixth drop-shadow-lg tracking-wide">
              Activity
            </h3>
            {mockActivities.map((act, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-fifth/40 border border-white/10 p-4 rounded-xl shadow-lg backdrop-blur-lg"
              >
                <span className="text-sixth font-Jura text-lg">{act}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="font-Tektur text-3xl text-sixth drop-shadow-lg tracking-wide">
              Student Reviews
            </h3>
            {mockReviews.map((rev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-fifth/40 border border-white/10 p-4 rounded-xl shadow-lg backdrop-blur-lg"
              >
                <div className="flex justify-between items-center">
                  <span className="font-Jura text-sixth font-semibold">
                    {rev.student}
                  </span>
                  <span className="flex items-center gap-1">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <RiStarFill key={i} className="text-yellow-400" />
                    ))}
                  </span>
                </div>
                <p className="text-sixth font-light mt-1">{rev.comment}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="font-Tektur text-3xl text-sixth drop-shadow-lg tracking-wide">
              Certificates & Achievements
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {mockCertificates.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-fifth/60 rounded-2xl p-4 shadow-xl text-sixth font-Jura backdrop-blur-lg border border-white/10"
                >
                  {cert}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
