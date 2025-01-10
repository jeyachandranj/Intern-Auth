import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false); // State for fade-out effect

  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate(); // For navigation to signup page

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleSignupRedirect = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      navigate("/signup"); // Navigate after the fade-out
    }, 600); // Ensure transition completes before navigation
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }} // Fade-in from left to center
      exit={{ opacity: 0, x: "-100%" }} // Slide out to the left when exiting
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden fixed top-50 left-67" // Fixed position
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="p-8"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-orange-400 from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>

          <div className="flex items-center mb-6">
            <Link to="/forgot-password" className="text-sm text-orange-400 hover:underline">
              Forgot password?
            </Link>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 font-semibold mb-2"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-orange-400 from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-orange-500 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin mx-auto" />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center"
      >
        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={handleSignupRedirect} // Redirect on click
            className="text-orange-400 hover:underline"
          >
            Sign up
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
