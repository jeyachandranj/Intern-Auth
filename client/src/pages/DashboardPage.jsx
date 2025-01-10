import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";

const DashboardPage = () => {
	const { user, logout } = useAuthStore();

	const handleLogout = () => {
		logout();
	};

	return (
		<div className='bg-gray-900 min-h-screen'>
			{/* Navbar */}
			<motion.nav
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='fixed top-0 left-0 w-full bg-gray-800 shadow-md z-50'
			>
				<div className='flex items-center justify-between p-4 max-w-7xl mx-auto'>
					{/* Logo */}
					<div className='text-2xl font-bold text-orange-500'>
						AppLogo
					</div>

					{/* Navigation and Search */}
					<div className='flex items-center space-x-6'>
						{/* Search Bar */}
						<input
							type='text'
							placeholder='Search...'
							className='px-4 py-2 bg-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
						/>

						{/* Navigation Links */}
						<a
							href='#'
							className='text-gray-300 hover:text-orange-400 transition'
						>
							Home
						</a>
						<a
							href='#'
							className='text-gray-300 hover:text-orange-400 transition'
						>
							Products
						</a>
						<a
							href='#'
							className='text-gray-300 hover:text-orange-400 transition'
						>
							{user.name}
						</a>

						{/* Logout Button */}
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={handleLogout}
							className='py-2 px-4 bg-gradient-to-r from-orange-500 to-emerald-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-orange-500'
						>
							Logout
						</motion.button>
					</div>
				</div>
			</motion.nav>

			
		</div>
	);
};

export default DashboardPage;
