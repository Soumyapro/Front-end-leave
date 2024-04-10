import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useLocation } from "react-router-dom";
import axios from 'axios';

const EmployeeForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        email: '',
        manager: '',
        startDate: '',
        endDate: '',
        reason: '',
        status: 'pending'
    });
    const location = useLocation();
    const [submissionMessage, setSubmissionMessage] = useState('');
    useEffect(() => {
        if (location.state) {
            setFormData(location.state.formData);
        }
    }, [location.state]);

    const animationProps = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 1000 },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        const updatedFormData = {
            ...formData,
            status: 'pending'
        };
        console.log(formData.id);
        try {
            if (formData.id) {
                // If id exists, it means we are updating existing data
                await axios.put(`http://localhost:8080/employee/${formData.id}`, updatedFormData);
                setSubmissionMessage("Updated Successfully");
            } else {
                // Otherwise, it's a new submission
                const response = await axios.post("http://localhost:8080/employee/leaveForm", updatedFormData);
                console.log("POST Response:", response);
                setSubmissionMessage("Submitted Successfully");
            }
            setIsLoading(false);
            // Redirect to a different page after successful submission or update
            //window.location.href = '/success';
        } catch (error) {
            console.log("Error:", error);
            setIsLoading(false);
        }
    };

    const goBack = () => {
        window.history.back(); // Navigate back to the previous page
    };

    return (
        <div>
            <nav style={{ backgroundColor: '#3b0f00' }} className='p-4'>
                <div className="container mx-auto flex justify-between items-center">
                    <span className="text-white font-semibold text-lg">Leave Application</span>
                </div>
            </nav>
            <button onClick={goBack} className='bg-gradient-to-r from-red-600 to-black rounded-md hover:bg-red-700' style={{ color: 'white', padding: '10px 20px', marginTop: '20px', marginLeft: '20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Go Back</button>
            <animated.form style={animationProps} onSubmit={(e) => e.preventDefault()} className="max-w-xl mx-auto mt-8 bg-white shadow-lg rounded-lg overflow-hidden p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leave Application Form</h2>
                {submissionMessage && <p className="text-green-600">{submissionMessage}</p>}
                <div className="grid grid-cols-1 gap-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" id="email" className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition-colors" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="manager" className="block text-sm font-medium text-gray-700">Manager Name</label>
                        <select
                            id="manager"
                            value={formData.manager}
                            onChange={handleChange}
                            name="manager"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition-colors"
                            required
                        >
                            <option value="">Select your Manager</option>
                            <option value="id1">John</option>
                            <option value="id2">Jack</option>
                            <option value="id3">Albert</option>
                            <option value="id4">Emily</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            name="startDate"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date:</label>
                        <input
                            type="date"
                            id="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            name="endDate"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
                        <textarea type="text" name="reason" id="reason" rows={4} className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition-colors" value={formData.reason} onChange={handleChange} required></textarea>
                    </div>
                </div>
                <div className="mt-6">
                    <button onClick={() => handleSubmit()} className={`w-full px-4 py-2 text-base border border-transparent font-semibold text-white bg-gradient-to-r from-red-600 to-black rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-500 ease-in-out transform  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </animated.form>
        </div>
    );
};

export default EmployeeForm;
