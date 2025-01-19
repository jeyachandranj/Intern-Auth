import React from "react";
import { HashRouter, Route, Routes, Link } from "react-router-dom";
import Login from './components/Login';
import SignUp1 from './components/SignUp1';
import SignUp2 from './components/SignUp2';

const App = () => {
    return (
        <HashRouter>
            <div className="min-h-screen bg-gray-200">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup1">Sign Up 1</Link>
                        </li>
                        <li>
                            <Link to="/signup2">Sign Up 2</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup1" element={<SignUp1 />} />
                    <Route path="/signup2" element={<SignUp2 />} />
                </Routes>
            </div>
        </HashRouter>
    );
};

export default App;