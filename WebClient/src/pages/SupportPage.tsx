import { motion, type Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
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
    <section className="w-full min-h-screen px-6 py-12 bg-linear-to-b
      from-fourth/80 via-third to-fourth flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            custom={index}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
            className="bg-fourth/60 backdrop-blur-xl border border-white/10
                       rounded-3xl p-6 w-full max-w-sm text-sixth cursor-pointer
                       transition-all duration-300"
          >
            <h2 className="text-2xl font-Jura font-bold mb-3">{card.title}</h2>
            <p className="text-sixth/70 text-sm leading-relaxed">{card.desc}</p>
            <button
              className="mt-6 px-5 py-2 bg-primary text-sixth rounded-xl font-semibold
                               shadow-lg hover:scale-105 hover:shadow-2xl transition-all"
            >
              Learn More
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
