import { Link, useNavigate, useLocation } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const email = location.state?.email || user?.email; // Use email from location or user

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 p-4 shadow-md">
      <ul className="flex justify-between items-center text-white text-lg font-medium">
        <div className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">About</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </li>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="font-bold">{user.displayName}</span>

              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full"
                />
              )}
            </>
          ) : (
            <span className="font-bold">{email}</span> // Display email from location or localStorage
          )}
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default DashBoard;
