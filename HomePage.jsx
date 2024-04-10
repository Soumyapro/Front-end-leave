import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const location = useLocation();
    const email = location.state.email;
    return (
        <div className="bg-gradient-to-br from-red-900 to-black min-h-screen flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-200 mb-4">Welcome, Office Employee!</h1>
                    <p className="text-lg text-gray-200">Apply for leave</p>
                </div>

                {/* Quick Links Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                        <h2 className="text-xl font-semibold mb-4">Leave Rules</h2>
                        <a href="/LeaveRule" className="text-blue-500 hover:text-blue-700">Read More</a>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                        <h2 className="text-xl font-semibold mb-4">Leave Portal</h2>
                        <Link className='text-blue-500 hover:text-blue-700' to="/TableForm" state={email}>Access Now</Link>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                        <h2 className="text-xl font-semibold mb-4">Log Out</h2>
                        <a href="/LoginPage" className="text-blue-500 hover:text-blue-700">Exit</a>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                        <h2 className="text-xl font-semibold mb-4">Apply</h2>
                        <a href="/LeaveForm" className="text-blue-500 hover:text-blue-700">Click Here</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
