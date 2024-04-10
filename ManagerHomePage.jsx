import React from 'react';
import { useLocation, Link } from 'react-router-dom';
const HomePage = () => {

    const location = useLocation();
    const managerId = location.state.managerId;
    console.log(managerId);

    return (
        <div className="bg-gray-100 bg-gradient-to-br from-red-900 to-black min-h-screen flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Welcome to Office Portal!</h1>
                    <p className="text-lg text-white">Apply for leave</p>
                </div>

                {/* Quick Links Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                        <h2 className="text-xl font-semibold mb-4">Manage Leaves</h2>
                        <Link className='text-blue-500 hover:text-blue-700' to="/ManagerTableForm" state={managerId}>Access Now</Link>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                        <h2 className="text-xl font-semibold mb-4">Leave Rules</h2>
                        <a href="/LeaveRule" className="text-blue-500 hover:text-blue-700">View</a>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                        <h2 className="text-xl font-semibold mb-4">Exit Office</h2>
                        <a href="/LoginPage2" className="text-blue-500 hover:text-blue-700">Click Here!</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
