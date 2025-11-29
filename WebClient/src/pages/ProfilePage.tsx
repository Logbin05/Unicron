import { motion } from "framer-motion";
import { HiUser } from "react-icons/hi2";
import { BsBank2 } from "react-icons/bs";
import { useEffect, useState } from "react";
import avatar from "@assets/image/avatar.jpeg";
import { BiCheckShield } from "react-icons/bi";
import type { User } from "@entities/data/user";
import type { UsersFinances } from "@entities/data/user";
import type { Enrollments } from "@entities/data/course";
import { HiMail, HiUserGroup } from "react-icons/hi";
import { IoCardOutline, IoWarningOutline } from "react-icons/io5";
import type { Subscriptions } from "@entities/data/subscriptions";
import { EnrollmentStatus, SubscriptionStatus } from "@entities/data/enums";
import { MdOutlineWorkspacePremium } from "react-icons/md";

const mockUser: User = {
  user_id: 1,
  full_name: "Alexey Logbinov",
  email: "logbinov@none.com",
  login: "logbinov",
  avatar: avatar,
  is_verified: true,
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
  balance: 1535.5,
  created_at: "2024-02-15",
  updated_at: "2025-05-01",
};
const mockSubscription: Subscriptions = {
  sub_id: 1,
  user_id: 1,
  sub_item: 1,
  start_date: "01.01.2025",
  end_date: "31.12.2025",
  status: SubscriptionStatus.ACTIVE,
  created_at: "2025-01-01",
  updated_at: "2025-01-01",
};

const mockEnrollments: Enrollments[] = [
  {
    enrollments_id: 1,
    user_id: 1,
    course_id: 1,
    progress: 100,
    status: EnrollmentStatus.COMPLETED,
    started_at: "01.02.2025",
    complected_at: "01.04.2025",
  },
  {
    enrollments_id: 2,
    user_id: 1,
    course_id: 2,
    progress: 100,
    status: EnrollmentStatus.COMPLETED,
    started_at: "2025-01-01",
    complected_at: "01.03.2025",
  },
  {
    enrollments_id: 3,
    user_id: 1,
    course_id: 3,
    progress: 0,
    status: EnrollmentStatus.ENROLLED,
    started_at: "2025-11-30",
    complected_at: "",
  },
];

export function MyProfilePage() {
  const [roleName, setRoleName] = useState("User");

  useEffect(() => setRoleName(mockRole.role_name), []);

  return (
    <section
      className="w-full flex justify-center rounded-tl-2xl
      rounded-bl-2x bg-fourth py-16 px-6 lg:px-20"
    >
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
          className="flex flex-col items-center lg:items-start gap-8 bg-fifth/40 p-8 rounded-3xl
          shadow-xl backdrop-blur-md border border-white/10"
        >
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <div className="rounded-full overflow-hidden shadow-2xl border-4 border-fifth w-44 h-44">
              <img
                src={avatar}
                alt={mockUser.login}
                className="w-full h-full object-cover"
              />
            </div>

            {!mockUser.is_verified && (
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
            {mockUser.full_name}
          </h2>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`flex items-center gap-3 font-Jura px-6 py-3 rounded-2xl text-xl shadow-lg backdrop-blur-lg border
              ${
                mockUser.is_verified
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-red-500/20 text-red-400 border-red-500/40"
              }`}
          >
            {mockUser.is_verified ? (
              <BiCheckShield className="text-3xl" />
            ) : (
              <IoWarningOutline className="text-3xl" />
            )}
            <span>
              {mockUser.is_verified ? "Your verified" : "Not Verified"}
            </span>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-2 flex flex-col gap-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Email", value: mockUser.email, icon: <HiMail /> },
              { label: "Login", value: mockUser.login, icon: <HiUser /> },
              { label: "Role", value: roleName, icon: <HiUserGroup /> },
              { label: "UF ID", value: mockUser.uf_id, icon: <BsBank2 /> },
              {
                label: "Balance",
                value: `${mockFinance.balance} ${mockFinance.currency}`,
                icon: <IoCardOutline />,
              },
              {
                label: "Subscription",
                status: `${mockSubscription.status}`,
                value: `${mockSubscription.start_date} → ${mockSubscription.end_date}`,
                icon: <MdOutlineWorkspacePremium />,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.04 }}
                className="bg-fifth/60 rounded-2xl p-5 shadow-xl text-sixth font-Jura backdrop-blur-lg border border-white/10"
              >
                <span className="font-semibold mb-1 flex flex-row items-center text-lg opacity-70">
                  {item.icon}
                  {item.label}: &nbsp;{item.status}
                </span>
                <span className="text-xl font-light">{item.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="font-Tektur text-3xl text-sixth drop-shadow-lg tracking-wide">
              Last Progress
            </h3>

            {mockEnrollments.map((e, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="bg-fifth/40 border border-white/10 p-4 rounded-xl shadow-lg backdrop-blur-lg"
              >
                <span className="text-sixth font-Jura text-lg">
                  {`Course ${e.course_id} • ${e.progress}% • ${e.status}`}
                </span>
                <div className="w-full h-4 bg-third rounded-xl mt-2 overflow-hidden shadow-inner">
                  <motion.div
                    className="h-full bg-fifth rounded-xl"
                    initial={{ width: 0 }}
                    animate={{ width: `${e.progress}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
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
