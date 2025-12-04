import { motion, type Variants, AnimatePresence } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.1, type: "spring", stiffness: 120, damping: 14 },
  }),
  hover: { scale: 1.05, y: -5, boxShadow: "0 25px 35px rgba(0,0,0,0.3)" },
};

export function SupportPage() {
  const cards = [
    { id: 1, title: "FAQ", desc: "Find answers to common questions" },
    { id: 2, title: "Contact Us", desc: "Reach our support team anytime" },
    { id: 3, title: "Guides", desc: "Step-by-step tutorials and tips" },
  ];

  return (
    <section className="min-h-screen px-6 py-16 bg-linear-to-b from-fourth/80 via-third to-fourth flex justify-center items-start">
      <div className="w-full max-w-7xl text-center">
        <h1 className="text-4xl sm:text-5xl font-Jura font-bold text-sixth mb-4">
          Support Center
        </h1>

        <p className="text-sixth/70 text-lg sm:text-xl mb-12">
          We’re here to help you get the most out of our platform
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <AnimatePresence>
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={cardVariants}
                className="relative w-full max-w-md bg-fourth/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-300"
              >
                <div>
                  <h2 className="text-2xl sm:text-3xl font-Jura font-bold text-sixth mb-3">
                    {card.title}
                  </h2>
                  <p className="text-sixth/70 text-sm sm:text-base leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <button
                  className="mt-6 px-6 py-2 bg-primary text-sixth rounded-xl font-semibold shadow-lg
                             relative overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
                >
                  <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-30 blur-xl transition-all" />
                  Learn More
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
