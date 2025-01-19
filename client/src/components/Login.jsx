import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import girl from "../assets/girl.jpg";
import logo from "../assets/logo.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const api = process.env.REACT_APP_API_URL || 'http://localhost:5000';


  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const idToken = await result.user.getIdToken();
      
      const response = await fetch(`${api}/api/auth/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Google login failed');
      }

      // Store tokens and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data._id);
      localStorage.setItem('accountType', data.accountType);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Google login error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${api}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data._id);
      localStorage.setItem('accountType', data.accountType);
      
      if (rememberMe) {
        localStorage.setItem('email', formData.email);
      } else {
        localStorage.removeItem('email');
      }

      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 rounded shadow-md bg-gray-100">
      <div className="flex flex-col lg:flex-row min-h-screen max-w-7xl mx-auto">
        <div className="w-full lg:w-2/5 flex flex-col p-4 sm:p-6 md:p-8 bg-white">
          <div className="max-w-md w-full mx-auto flex flex-col flex-grow">
            <div className="flex justify-start mb-6">
              <img
                src={logo}
                alt="SignIn"
                className="w-16 h-16 sm:w-24 sm:h-24 object-contain"
              />
            </div>

            <div className="mb-8">
              <p className="text-gray-700 text-base sm:text-lg mb-2">Welcome Back 👋</p>
              <h3 className="text-xl sm:text-2xl font-bold">Login to your account</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <button 
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                <FcGoogle className="mr-2 text-xl" />
                Google
              </button>
              <button 
                type="button"
                disabled={isLoading}
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                <FaFacebook className="mr-2 text-xl" />
                Facebook
              </button>
            </div>

            <div className="flex items-center mb-8">
              <hr className="flex-grow border-gray-300" />
              <p className="px-4 text-gray-500 text-sm">Or Login Using</p>
              <hr className="flex-grow border-gray-300" />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                  Email/Phone Number
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter your Email/Phone Number"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter your Password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Logging in...' : (
                  <>
                    Login <FaLongArrowAltRight className="ml-2" />
                  </>
                )}
              </button>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-gray-700 text-sm">
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 text-sm transition-colors duration-200"
                >
                  Forgot Password?
                </a>
              </div>
            </form>

            <p className="mt-8 text-center text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup1"
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
              >
                SignUp
              </a>
            </p>
          </div>
        </div>

        <div className="hidden lg:block w-3/5 bg-gray-100">
          <div className="h-full w-full">
            <img
              src={girl}
              alt="Login Visual"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;