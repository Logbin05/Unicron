import { motion, AnimatePresence } from "framer-motion";
import { BiX } from "react-icons/bi";
import type { PopUp } from "@entities/ui/popup";

export function PopUp({
  id,
  title,
  description,
  image,
  price,
  onClose,
}: PopUp) {
  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="
          fixed inset-0 z-50 flex items-center justify-center
          bg-black/40 backdrop-blur-md
        "
      >
        <motion.div
          key={id}
          initial={{ scale: 0.7, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.6, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          className="
            relative bg-fourth/60 backdrop-blur-2xl
            rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.1)]
            border border-white/10 w-full max-w-2xl p-8
            overflow-hidden
          "
        >
          <div
            className="
            absolute inset-0 opacity-30 pointer-events-none
            bg-linear-to-br from-primary/10 via-transparent to-sixth/10
          "
          ></div>

          <motion.button
            onClick={onClose}
            whileHover={{ rotate: 90, scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="
              absolute top-5 right-5 text-sixth text-4xl
              hover:text-primary transition-all z-20
            "
          >
            <BiX />
          </motion.button>

          <div className="relative z-10">
            {image && (
              <div className="w-full h-72 rounded-2xl overflow-hidden mb-6">
                <motion.img
                  src={image}
                  alt={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.08, filter: "brightness(1.1)" }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-fifth font-Jura text-4xl font-bold mb-4 text-center"
            >
              {title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-left mb-8"
            >
              <span className="text-fifth text-xl font-semibold">
                Description:
              </span>
              <p className="text-sixth/90 mt-3 leading-relaxed text-lg">
                {description}
              </p>
            </motion.div>

            <motion.button
              onClick={() => {}}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(255,255,255,0.25)",
              }}
              whileTap={{ scale: 0.95 }}
              className="
                bg-primary text-sixth font-semibold
                py-4 w-full rounded-xl shadow-inner
                transition-all text-xl
              "
            >
              Buy for ${price}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
