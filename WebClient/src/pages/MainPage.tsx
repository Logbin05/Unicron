import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useAuthModalStore } from "@store/auth";
import { ImageMainSvg } from "@shared/image_main";
import { LoginForm } from "@features/auth/login/login";
import { SignUpForm } from "@features/auth/registration/registration";
import { BiLogIn, BiUserPlus, BiMenu, BiX } from "react-icons/bi";
import { FaTelegramPlane, FaGithub, FaYoutube } from "react-icons/fa";
import { ModalPortal } from "@components/portal/portal";

export function MainPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { modal, openLogin, openRegister, close } = useAuthModalStore();

  return (
    <>
      <header className="xs:p-5 relative z-50">
        <nav className="flex justify-between items-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="xs:text-2xl lg:text-4xl font-Tektur text-fifth select-none"
          >
            Unicron
          </motion.span>

          <ul className="xs:hidden md:flex items-center gap-4">
            <li>
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={openLogin}
                className="text-sixth font-Jura flex items-center gap-2 xs:text-16 lg:text-20 hover:text-fifth active:scale-95"
              >
                <BiLogIn />
                Login
              </motion.button>
            </li>
            <li>
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={openRegister}
                className="text-sixth font-Jura flex items-center gap-2 xs:text-16 lg:text-20 hover:text-fifth active:scale-95"
              >
                <BiUserPlus />
                Sign Up
              </motion.button>
            </li>
          </ul>

          <motion.button
            className="md:hidden text-sixth text-3xl active:scale-90"
            onClick={() => setMenuOpen(!menuOpen)}
            animate={{ rotate: menuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {menuOpen ? <BiX /> : <BiMenu />}
          </motion.button>
        </nav>

        <ModalPortal>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-16 left-0 w-full bg-[#0a0a0a]
              border-t border-gray-800 flex flex-col items-center gap-4 py-6 lg:hidden"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setMenuOpen(false);
                    openLogin();
                  }}
                  className="text-sixth font-Jura flex items-center gap-2 text-lg"
                >
                  <BiLogIn />
                  Login
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setMenuOpen(false);
                    openRegister();
                  }}
                  className="text-sixth font-Jura flex items-center gap-2 text-lg"
                >
                  <BiUserPlus />
                  Sign Up
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </ModalPortal>
      </header>

      <main className="flex flex-col lg:flex-row lg:justify-between lg:items-center xs:mt-10 lg:h-[80vh] lg:px-20">
        <div className="w-full lg:w-1/2 flex justify-center xs:mb-8 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-[85%] sm:w-[60%] md:w-[45%] lg:w-[80%] max-w-[500px]"
          >
            <ImageMainSvg />
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-sixth font-Jura xs:text-20 lg:text-3xl"
          >
            A new generation platform, learn the way it suits you!
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-sixth font-Jura xs:text-18 lg:text-2xl"
          >
            Unicron: Learning that changes the rules
          </motion.span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-fifth text-primary font-Tektur xs:px-5 xs:py-2 lg:px-14 lg:py-3 lg:text-2xl"
            onClick={openRegister}
          >
            Start learning
          </motion.button>
        </div>
      </main>

      <ModalPortal>
        <AnimatePresence>
          {modal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white p-6 rounded-2xl w-11/12 max-w-md relative"
              >
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={close}
                >
                  <BiX size={24} />
                </button>

                {modal === "login" && <LoginForm action={close} />}
                {modal === "register" && <SignUpForm action={close} />}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </ModalPortal>

      <footer className="xs:my-10 xs:px-6 xs:py-8 bg-[#0a0a0a] text-sixth">
        <nav className="flex xs:flex-col sm:flex-row sm:justify-between gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="font-Tektur text-fifth text-3xl">Unicron</h3>
            <p className="font-Jura text-gray-400 max-w-xs">
              A new generation learning platform helping you grow.
            </p>
          </div>

          <div>
            <h4 className="text-fifth font-semibold">Navigation</h4>
            <ul className="text-gray-400">
              {["Home", "Courses", "About", "Contact"].map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-fifth font-semibold">Legal</h4>
            <ul className="text-gray-400">
              {["Privacy", "Terms", "Cookies"].map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-6 text-2xl">
            <Link to="https://t.me/" target="_blank">
              <FaTelegramPlane />
            </Link>
            <Link to="https://github.com/" target="_blank">
              <FaGithub />
            </Link>
            <Link to="https://youtube.com/" target="_blank">
              <FaYoutube />
            </Link>
          </div>
        </nav>
      </footer>
    </>
  );
}
