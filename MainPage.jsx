import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-red-900 to-black">
            <h1 className="text-5xl text-white font-bold mb-8 animate-bounce">Welcome to Avanseus Leave Portal</h1>
            <div className="flex justify-center items-center space-x-8">
                <a href="/SignupPage2" className="bg-white text-gray-800 py-4 px-8 rounded-full text-xl font-bold shadow-lg hover:bg-gray-200 transition duration-300">Manager</a>
                <a href="/SignupPage" className="bg-white text-gray-800 py-4 px-8 rounded-full text-xl font-bold shadow-lg hover:bg-gray-200 transition duration-300">Employee</a>
            </div>
        </div>
    );
};

export default MainPage;
