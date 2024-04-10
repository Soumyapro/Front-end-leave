import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import LoginPage from './LoginPage';
import axios from 'axios';

const SignupPage2 = () => {
    const [managerName, setManagerName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        const userData = {
            managerName: managerName,
            email: email,
            password: password
        };
        await axios.post("http://localhost:8080/manager/SignupPage2", userData)
            .then((res) => { console.log(res.data) })
            .catch((error) => { console.log(error) })
        setSubmissionMessage("Signed Up Successfully")
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className='mt-6'>
                    <img src="https://www.avanseus.com/wp-content/uploads/2022/08/avanseus-logo-colored.svg" alt="Image Not Found" className="w-60 h-60 absolute top-0 left-1/2 transform -translate-x-1/2" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold px-12 bg-gradient-to-r from-red-700 to-black inline-block text-transparent bg-clip-text">Sign up for an account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="managerName-address" className="sr-only">Manager Name</label>
                            <input
                                id="managerName-address"
                                name="managerName"
                                type="text"
                                autoComplete="managerName"
                                required
                                value={managerName}
                                onChange={(e) => setManagerName(e.target.value)}
                                //onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                                placeholder="Manager Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                //onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                //onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                                placeholder="Password"
                            />
                            {submissionMessage && <p className="text-green-600">{submissionMessage}</p>}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Sign up as a Manager?
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="/" className="font-medium text-gradient-from-red-700-to-black hover:text-red-900">
                                Back to Main Page?
                            </a>
                        </div>
                    </div>


                    <div>
                        <button
                            type="submit"
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-gradient-to-r from-red-700 to-black text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-500 ease-in-out transform ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            disabled={isLoading}
                        //onClick={() => navigate("/LoginPage2")}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                {isLoading ? (
                                    <svg
                                        className="animate-spin h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V2.83a.75.75 0 111.5 0V4a8 8 0 01-8 8z"
                                        ></path>
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.5-6.5a1.5 1.5 0 113 0V13h-3v-1.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </span>
                            {isLoading ? 'Signing up...' : 'Sign up'}
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-sm">
                            Already have an account?{' '}
                            <a href="/LoginPage2" className="font-medium text-gradient-from-red-700-to-black hover:text-red-900">
                                Log in
                            </a>
                        </p>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default SignupPage2;
