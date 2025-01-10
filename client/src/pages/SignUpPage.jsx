import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User, Phone } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    localStorage.setItem("mobile", mobile);
    try {
      await signup(email, password, name, mobile);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  // Animation variants for input fields
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }} // Slide from the left
      animate={{ opacity: 1, x: 0 }} // Fade in and center the component
      exit={{ opacity: 0, x: "100%" }} // Slide out to the right on exit
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-orange-400 from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Create Account
        </h2>

        <form onSubmit={handleSignUp}>
          {/* Name Input */}
          <motion.div initial="hidden" animate="visible" variants={inputVariants}>
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </motion.div>

          {/* Email Input */}
          <motion.div initial="hidden" animate="visible" variants={inputVariants}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>

          {/* Mobile Number Input */}
          <motion.div initial="hidden" animate="visible" variants={inputVariants}>
            <Input
              icon={Phone}
              type="mobile"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </motion.div>

          {/* Password Input */}
          <motion.div initial="hidden" animate="visible" variants={inputVariants}>
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>

          {/* Error Message */}
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

          {/* Submit Button */}
          <motion.button
            className="mt-5 w-full py-3 px-4 bg-orange-400 from-green-500 to-emerald-600 text-white
						font-bold rounded-lg shadow-lg hover:from-orange-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Sign Up"}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link to={"/login"} className="text-orange-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
