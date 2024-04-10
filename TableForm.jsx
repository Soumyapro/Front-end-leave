import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const TableForm = () => {
    const location = useLocation();
    const email = location.state;
    console.log(email);
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [navColor, setNavColor] = useState('#3b0f00');
    const [searchDate, setSearchDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(7);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async (email) => {
            try {
                const response = await axios.get(`http://localhost:8080/employee/get-employee-form-data/${email}`);
                setFormData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        if (email) {
            fetchData(email);
        }
    }, [email]);

    const deleteLeave = (leaveId) => {
        axios.delete(`http://localhost:8080/employee/${leaveId}`)
            .then(response => {
                alert("Leave deleted successfully! Please refresh MyLeave.");
                window.location.reload();
            })
            .catch(error => {
                console.error('Error deleting leave:', error);
            });
    };

    const editLeave = (data) => {
        navigate('/LeaveForm', { state: { formData: data } });
    };

    const handleNavbarColor = () => {
        setNavColor('#3b0f00'); // Set navbar color to desired color
    };

    const filteredFormData = formData.filter(data => {
        // Filter based on searchDate
        if (searchDate === '') return true;
        return data.startDate.includes(searchDate) || data.endDate.includes(searchDate); // Adjust based on date format
    });

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredFormData.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Loading...</div>;
    };

    const goBack = () => {
        window.history.back(); // Navigate back to the previous page
    };

    return (
        <div className="min-h-screen">
            <nav style={{ backgroundColor: navColor }} className="p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <span className="text-white font-semibold text-lg">Leave Application</span>
                    <div>
                        {/* Add additional navbar items if needed */}
                    </div>
                </div>
            </nav>
            <button onClick={goBack} className='bg-gradient-to-r from-red-600 to-black rounded-md hover:bg-red-700' style={{ color: 'white', padding: '10px 20px', marginTop: '20px', marginLeft: '20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Go Back</button>
            <div className="container mx-auto mt-8">
                <div className="mb-4 flex justify-center">
                    <div style={{ marginTop: '-20px' }}>
                        <input
                            type="text"
                            placeholder="Search by date"
                            value={searchDate}
                            onChange={(e) => setSearchDate(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md mr-2"
                        />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => setSearchDate('')}>
                            Clear
                        </button>
                    </div>
                </div>
                <table className="table-auto w-full md:w-4/5 lg:w-4/5 xl:w-4/5 border-collapse border border-gray-300 bg-white shadow-md rounded-md mx-auto">
                    <thead>
                        <tr style={{ backgroundColor: navColor }} className="text-white">
                            <th className="border px-4 py-2 w-1/12">Serial No.</th>
                            <th className="border px-4 py-2 w-2/12">Email ID</th>
                            <th className="border px-4 py-2 w-1/6">Manager ID</th>
                            <th className="border px-4 py-2 w-1/6">Start Date</th>
                            <th className="border px-4 py-2 w-1/6">End Date</th>
                            <th className="border px-4 py-2 w-2/6">Reason</th>
                            <th className="border px-4 py-2 w-1/6">Status</th>
                            <th className="border px-4 py-2 w-1/6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((data, index) => (
                            <tr className="bg-gray-100" key={data._id}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{data.email}</td>
                                <td className="border px-4 py-2">{data.manager}</td>
                                <td className="border px-4 py-2">{data.startDate}</td>
                                <td className="border px-4 py-2">{data.endDate}</td>
                                <td className="border px-4 py-2">{data.reason}</td>
                                <td className={`border px-4 py-2 ${data.status === 'Accepted' ? 'text-green-600' : 'text-red-600'}`}>
                                    {data.status}
                                </td>
                                <td className="border px-4 py-2 flex gap-4">
                                    <div>
                                        <button
                                            onClick={() => editLeave(data)}
                                            disabled={data.status === 'Accepted' || data.status === 'Rejected'}
                                            className={`px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 text-white  ${data.status === 'Accepted' || data.status === 'Rejected' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => deleteLeave(data._id)}
                                            disabled={data.status === 'Accepted' || data.status === 'Rejected'}
                                            className={`px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 
                                            ${data.status === 'Accepted' || data.status === 'Rejected' ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 flex justify-center items-center">
                    <button
                        onClick={() => setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-blue-500 hover:bg-blue-600"
                        style={{ fontSize: '0.9rem' }}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <ul className="flex gap-2">
                        {Array.from({ length: Math.ceil(filteredFormData.length / recordsPerPage) }, (_, i) => (
                            <li key={i}>
                                <button
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white ${currentPage === i + 1 ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => setCurrentPage(prevPage => prevPage < Math.ceil(filteredFormData.length / recordsPerPage) ? prevPage + 1 : prevPage)}
                        disabled={currentPage === Math.ceil(filteredFormData.length / recordsPerPage)}
                        className="px-3 py-1 rounded-md ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-blue-500 hover:bg-blue-600"
                        style={{ fontSize: '0.9rem' }}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableForm;
