import React from "react";
import { HashRouter, Route, Routes, Link } from "react-router-dom";
import Login from './components/Login';
import SignUp1 from './components/SignUp1';
import SignUp2 from './components/SignUp2';
import DashBoard from "./components/DashBoard";

const App = () => {
    return (
        <HashRouter>
            <div className="min-h-screen bg-gray-200">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup1" element={<SignUp1 />} />
                    <Route path="/signup2" element={<SignUp2 />} />
                    <Route path="/dashboard" element={<DashBoard/>}/>
                </Routes>
            </div>
        </HashRouter>
    );
};

export default App;