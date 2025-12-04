import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockPosts } from "@mock/data";
import { ListNews } from "@entities/data/post";
import { BiLike } from "react-icons/bi";
import { LiaComments } from "react-icons/lia";
import { HiEye } from "react-icons/hi2";

export function HomePage() {
  const [activeTab, setActiveTab] = useState<ListNews | "ALL">("ALL");

  const tabs: (ListNews | "ALL")[] = [
    "ALL",
    ListNews.COURSES,
    ListNews.UPDATED,
    ListNews.SUCCESS_STORY,
  ];

  const filteredPosts =
    activeTab === "ALL"
      ? mockPosts
      : mockPosts.filter((p) => p.type === activeTab);

  return (
    <section className="min-h-screen px-6 py-12 bg-linear-to-b from-fourth/80 via-third to-fourth">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-Jura font-bold text-sixth mb-4">
          Home
        </h1>
        <p className="text-sixth/70 text-lg sm:text-xl mb-12">
          Stay updated with the latest news, updates, and success stories from
          Unicorn
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl font-semibold transition-all
                ${
                  activeTab === tab
                    ? "bg-linear-to-r from-primary to-secondary text-sixth shadow-lg scale-105"
                    : "bg-fourth/30 text-sixth/70 hover:text-sixth hover:scale-105"
                }`}
            >
              {tab === "ALL"
                ? "All"
                : tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.post_id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 20px 35px rgba(0,0,0,0.25)",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                  delay: index * 0.05,
                }}
                className="relative w-full max-w-md bg-fourth/60 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex flex-col cursor-pointer transition-all duration-300"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-44 object-cover rounded-2xl mb-4"
                />
                <h2 className="text-xl sm:text-2xl font-Jura font-bold text-sixth mb-2">
                  {post.title}
                </h2>
                <p className="text-sixth/70 text-sm sm:text-base line-clamp-4 mb-3">
                  {post.body}
                </p>

                <div className="flex items-center justify-between mt-auto text-sixth text-sm">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar_url}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex gap-3">
                    <span>
                      <BiLike size={25} /> {post.likes_count}
                    </span>
                    <span>
                      <LiaComments size={25} /> {post.comments_count}
                    </span>
                    <span>
                      <HiEye size={25} /> {post.views_count}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs sm:text-sm bg-primary/20 text-sixth px-2 py-1 rounded-lg"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
