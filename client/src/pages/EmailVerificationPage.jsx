import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import axios from "axios";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const sendVerificationToken = async (mobile) => {
    try {

        const response = await axios.post("/api/auth/send-otp", { mobile });
        alert(response.data.message); 
    } catch (error) {
        console.error("Error sending verification token:", error);
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    const mobile = localStorage.getItem("mobile");
    try {
      await verifyEmail(verificationCode);
      await sendVerificationToken(mobile);
      navigate("/");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  const sentence = "Enter the 6-digit code sent to your email address.";

  return (
    <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'
      >
        <h2 className='text-3xl font-bold mb-6 text-center bg-orange-400 from-green-400 to-emerald-500 text-transparent bg-clip-text'>
          Verify Your Email
        </h2>

        <p className='text-center text-gray-300 mb-6'>
          {sentence}
        </p>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='flex justify-between'>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type='text'
                maxLength='1'
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-12 text-center text-2xl font-bold border-2 ${
                  digit ? "bg-orange-400" : "bg-gray-600"
                } bg-gray-700 text-white rounded-lg focus:outline-none`}
              />
            ))}
          </div>
          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='submit'
            disabled={isLoading || code.some((digit) => !digit)}
            className={`w-full text-white font-bold py-3 px-4 rounded-lg shadow-lg ${
              code.every((digit) => digit !== "")
                ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                : "bg-gray-600 opacity-50 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
