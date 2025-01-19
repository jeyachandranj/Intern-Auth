import { useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { MdFactory } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaLongArrowAltRight } from "react-icons/fa";
import logo from "../assets/girl.jpg";
import { useNavigate } from "react-router-dom";

const SignUp2 = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("Personal");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    companyName: "",
    industryField: "",
    employeeCount: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('https://online-signature.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountType,
          ...formData
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      localStorage.setItem('token', data.token);
      
      navigate('/dashboard', { state: { email: data.email } });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex flex-col lg:flex-row h-full max-w-7xl mx-auto rounded-xl shadow bg-white">
        <div className="flex flex-col w-full lg:w-3/6 p-4 sm:p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-base sm:text-lg text-gray-500">
              Welcome to <br />
              <p className="font-bold text-xl sm:text-2xl md:text-3xl text-black">
                SignLock, Your Trusted Digital Signature Partner!
              </p>
            </h2>
          </div>

          <p className="text-gray-600 text-xs sm:text-sm mb-6">
            Let's get you started. Create your account below to secure and sign
            your documents with ease.
          </p>

          <div className="mb-6">
            <h3 className="text-xs sm:text-sm font-semibold mb-3">Type of Account</h3>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="button"
                className={`rounded-xl py-3 px-4 w-full sm:w-48 ${
                  accountType === "Personal"
                    ? "bg-blue-200 text-blue-600"
                    : "bg-gray-200 text-black"
                } hover:bg-blue-200 hover:text-blue-600 flex items-center justify-center`}
                onClick={() => setAccountType("Personal")}
              >
                <IoPersonSharp className="mr-2" /> Personal
              </button>
              <button
                type="button"
                className={`rounded-xl py-3 px-4 w-full sm:w-48 ${
                  accountType === "Corporate"
                    ? "bg-blue-200 text-blue-600"
                    : "bg-gray-200 text-black"
                } hover:bg-blue-200 hover:text-blue-600 flex items-center justify-center`}
                onClick={() => setAccountType("Corporate")}
              >
                <MdFactory className="mr-2" /> Corporate
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
                {error}
              </div>
            )}
            
            {accountType === "Personal" ? (
              <>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="w-full">
                    <label className="block text-xs font-bold mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your First Name"
                      className="w-full p-2.5 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-xs font-semibold mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your Last Name"
                      className="w-full p-2.5 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full p-2.5 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-xs font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your Full Name"
                    className="w-full p-2.5 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold mb-1">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter your Company Name"
                    className="w-full p-2.5 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="w-full">
                    <label className="block text-xs font-bold mb-1">Industry Field</label>
                    <input
                      type="text"
                      name="industryField"
                      value={formData.industryField}
                      onChange={handleChange}
                      placeholder="Enter your Industry Field"
                      className="w-full p-2.5 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-xs font-semibold mb-1">Employee Count</label>
                    <input
                      type="number"
                      name="employeeCount"
                      value={formData.employeeCount}
                      onChange={handleChange}
                      placeholder="Enter Employee Count"
                      className="w-full p-2.5 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold mb-1">Work Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full p-2.5 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </>
            )}

            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-2.5 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full p-2.5 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center mb-6">
              <input type="checkbox" className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label className="text-xs">
                I agree to the{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center bg-blue-600 text-white w-full py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 mb-6"
            >
              Get Started
              <FaLongArrowAltRight className="ml-2" />
            </button>
          </form>
        </div>

        <div className="hidden lg:flex flex-col items-center justify-center w-3/6 bg-gray-100">
          <img
            src={logo}
            alt="SignLock"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp2;