import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ImageMainSvg } from "@shared/image_main";
import { LoginForm } from "@features/auth/login/login";
import { BiLogIn, BiUserPlus, BiMenu, BiX } from "react-icons/bi";
import { SignUpForm } from "@features/auth/registration/registration";
import { FaTelegramPlane, FaGithub, FaYoutube } from "react-icons/fa";

export function MainPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

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
                onClick={() => setLoginModal(true)}
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
                onClick={() => setSignupModal(true)}
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
            aria-label="Toggle menu"
            animate={{ rotate: menuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {menuOpen ? <BiX /> : <BiMenu />}
          </motion.button>
        </nav>

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
              transition={{ duration: 0.2 }}
              onClick={() => setLoginModal(true)}
              className="text-sixth font-Jura flex items-center gap-2 text-lg hover:text-fifth active:scale-95"
            >
              <BiLogIn />
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSignupModal(true)}
              className="text-sixth font-Jura flex items-center gap-2 text-lg hover:text-fifth active:scale-95"
            >
              <BiUserPlus />
              Sign Up
            </motion.button>
          </motion.div>
        )}
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
            className="text-sixth font-Jura xs:text-20 lg:text-3xl xs:w-4/5 lg:w-full"
          >
            A new generation platform, learn the way it suits you!
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-sixth font-Jura xs:text-18 lg:text-2xl xs:w-4/5 lg:w-full"
          >
            Unicron: Learning that changes the rules
          </motion.span>

          <motion.button
            whileHover={{ scale: 1.05, borderRadius: "0.75rem" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-fifth text-primary font-Tektur xs:px-5 xs:py-2 lg:px-14 lg:py-3 lg:text-2xl transition-all duration-300"
          >
            Start learning
          </motion.button>
        </div>
      </main>

      {loginModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-11/12 max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setLoginModal(false)}
            >
              <BiX size={24} />
            </button>
            <LoginForm action={() => setLoginModal(false)} />
          </div>
        </div>
      )}

      {signupModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-11/12 max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setSignupModal(false)}
            >
              <BiX size={24} />
            </button>
            <SignUpForm action={() => setSignupModal(false)} />
          </div>
        </div>
      )}

      <footer className="xs:my-10 xs:px-6 xs:py-8 bg-[#0a0a0a] text-sixth">
        <nav
          className="flex xs:flex-col sm:flex-row sm:justify-between sm:items-start
          xs:gap-8 sm:gap-12 max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2 xs:text-center sm:text-left"
          >
            <h3 className="font-Tektur text-fifth xs:text-3xl">Unicron</h3>
            <p className="font-Jura xs:text-14 text-gray-400 max-w-xs">
              A new generation learning platform helping you grow and achieve
              your goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-col gap-2 font-Jura text-center sm:text-left"
          >
            <h4 className="text-fifth font-semibold">Navigation</h4>
            <ul className="flex flex-col gap-1 text-gray-400">
              {["Home", "Courses", "About", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-fifth transition-colors active:scale-95"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col gap-2 font-Jura text-center sm:text-left"
          >
            <h4 className="text-fifth font-semibold">Legal</h4>
            <ul className="flex flex-col gap-1 text-gray-400">
              {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-fifth transition-colors active:scale-95"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex justify-center gap-6 mt-10"
          >
            <Link
              to="https://t.me/"
              target="_blank"
              className="text-gray-400 hover:text-fifth transition-colors text-2xl active:scale-95"
            >
              <FaTelegramPlane />
            </Link>
            <Link
              to="https://github.com/"
              target="_blank"
              className="text-gray-400 hover:text-fifth transition-colors text-2xl active:scale-95"
            >
              <FaGithub />
            </Link>
            <Link
              to="https://youtube.com/"
              target="_blank"
              className="text-gray-400 hover:text-fifth transition-colors text-2xl active:scale-95"
            >
              <FaYoutube />
            </Link>
          </motion.div>
        </nav>

        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500 font-Jura text-sm">
          © 2025 Unicron. All rights reserved.
        </div>
      </footer>
    </>
  );
}
