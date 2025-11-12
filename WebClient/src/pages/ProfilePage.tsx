import { useEffect, useState } from "react";
import type { User } from "@entities/data/user";
import type { UsersFinances } from "@entities/data/user";
import type { Subscriptions } from "@entities/data/subscriptions";
import type { Enrollments } from "@entities/data/course";
import avatar from "@assets/image/logo.png";
import { BiCheckShield } from "react-icons/bi";
import { IoWarningOutline } from "react-icons/io5";
import { motion } from "motion/react";
import { EnrollmentStatus, SubscriptionStatus } from "@entities/data/enums";

const mockUser: User = {
  user_id: 1,
  full_name: "Joen Doe",
  email: "joendue@gmail.com",
  login: "joendue",
  avatar: "../assets/image/logo.png",
  is_verified: false,
  role_id: 3,
  uf_id: 1,
  created_at: "2024-02-15",
  updated_at: "2025-05-01",
};

const mockRole = { role_id: 3, role_name: "Student" };
const mockFinance: UsersFinances = {
  uf_id: 1,
  card_id: 1234,
  currency: "USD",
  balance: 120.5,
  created_at: "2024-02-15",
  updated_at: "2025-05-01",
};
const mockSubscription: Subscriptions = {
  sub_id: 1,
  user_id: 1,
  sub_item: 1,
  start_date: "2025-01-01",
  end_date: "2025-12-31",
  status: SubscriptionStatus.ACTIVE,
  created_at: "2025-01-01",
  updated_at: "2025-01-01",
};
const mockEnrollments: Enrollments[] = [
  {
    enrollments_id: 1,
    user_id: 1,
    course_id: 1,
    progress: 75,
    status: EnrollmentStatus.ENROLLED,
    started_at: "2025-02-01",
    complected_at: "",
  },
  {
    enrollments_id: 2,
    user_id: 1,
    course_id: 2,
    progress: 100,
    status: EnrollmentStatus.COMPLETED,
    started_at: "2025-01-01",
    complected_at: "2025-03-01",
  },
];

export function MyProfilePage() {
  const [roleName, setRoleName] = useState("User");

  useEffect(() => setRoleName(mockRole.role_name), []);

  return (
    <section
      className="bg-fourth flex justify-center
    xs:mx-3 sm:mx-5 md:mx-10 lg:mx-20 xl:mx-32 2k:mx-48 4k:mx-64 my-6
    xs:rounded-md lg:rounded-lg p-4 xs:p-6 sm:p-8 lg:p-10 xl:p-12 2k:p-16"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row gap-8 w-full max-w-[1920px] mx-auto"
      >
        <motion.div
          className="flex flex-col items-center lg:items-start gap-6"
          whileHover={{ scale: 1.05 }}
        >
          <div
            className="relative rounded-full overflow-hidden shadow-2xl border-4
          border-fifth
          w-28 xs:w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 2k:w-52 4k:w-64 h-28
          xs:h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 2k:h-52 4k:h-64"
          >
            <img
              src={avatar}
              alt={mockUser.login}
              className="object-cover xs:size-full"
            />
            {!mockUser.is_verified && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-2 -right-2 bg-red-500 rounded-full w-8 h-8
                flex items-center justify-center shadow-lg"
              >
                <IoWarningOutline className="text-white text-lg" />
              </motion.div>
            )}
          </div>
          <h2
            className="font-Tektur text-25 xs:text-28 sm:text-33 lg:text-36 xl:text-42 2k:text-42
          text-sixth text-center lg:text-left"
          >
            {mockUser.full_name}
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6 lg:gap-8 flex-1">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex items-center gap-3 font-Jura px-5 py-3 rounded-3xl shadow-xl text-lg
              ${
                mockUser.is_verified
                  ? `bg-linear-to-r from-emerald-400/30 via-emerald-500/20
                    to-emerald-400/30 text-fifth shadow-emerald-400/40`
                  : `bg-linear-to-r from-red-400/30 via-red-500/20 to-red-400/30 text-red-400 shadow-red-400/40`
              }`}
          >
            {mockUser.is_verified ? (
              <BiCheckShield className="text-2xl" />
            ) : (
              <IoWarningOutline className="text-2xl" />
            )}
            <span>
              {mockUser.is_verified
                ? "You are verified"
                : "You are not verified"}
            </span>
          </motion.div>

          <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-fifth p-4 rounded-2xl shadow-md text-sixth"
            >
              <span className="font-semibold">Email:</span> {mockUser.email}
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-fifth p-4 rounded-2xl shadow-md text-sixth"
            >
              <span className="font-semibold">Login:</span> {mockUser.login}
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-fifth p-4 rounded-2xl shadow-md text-sixth"
            >
              <span className="font-semibold">Role:</span> {roleName}
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-fifth p-4 rounded-2xl shadow-md text-sixth"
            >
              <span className="font-semibold">UF ID:</span> {mockUser.uf_id}
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-fifth p-4 rounded-2xl shadow-md text-sixth"
            >
              <span className="font-semibold">Balance:</span>{" "}
              {mockFinance.balance} {mockFinance.currency}
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-fifth p-4 rounded-2xl shadow-md text-sixth"
            >
              <span className="font-semibold">Subscription:</span>{" "}
              {mockSubscription.status} ({mockSubscription.start_date} -{" "}
              {mockSubscription.end_date})
            </motion.div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <h3 className="font-Tektur text-22 text-sixth">Course Progress</h3>
            {mockEnrollments.map((e, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
              >
                <span className="text-sixth font-Jura">{`Course ${e.course_id} - ${e.progress}% (${e.status})`}</span>
                <div className="w-full h-4 bg-third rounded-xl mt-1 overflow-hidden">
                  <div
                    className="h-full bg-fifth rounded-xl"
                    style={{ width: `${e.progress}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
