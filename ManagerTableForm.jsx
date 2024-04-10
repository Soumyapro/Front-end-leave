import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const ManagerTableForm = () => {
    const location = useLocation();
    const managerId = location.state;
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [navColor, setNavColor] = useState('#3b0f00');
    const [searchDate, setSearchDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(7);
    const [disabledButtons, setDisabledButtons] = useState(() => {
        const storedDisabledButtons = JSON.parse(localStorage.getItem('disabledButtons')) || [];
        return storedDisabledButtons;
    });

    useEffect(() => {
        const fetchData = async (managerId) => {
            try {
                const response = await axios.get(`http://localhost:8080/employee/get-form-data/${managerId}`);
                setFormData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData(managerId);
    }, [managerId]);

    const accept = (leaveId) => {
        axios.put(`http://localhost:8080/employee/accept/${leaveId}`)
            .then(response => {
                setDisabledButtons(prevState => {
                    const newState = [...prevState.filter(_id => _id !== leaveId), leaveId];
                    localStorage.setItem('disabledButtons', JSON.stringify(newState));
                    return newState;
                });
                setFormData(prevFormData => prevFormData.map(item => {
                    if (item._id === leaveId) {
                        return { ...item, status: 'Accepted' };
                    }
                    return item;
                }));
            })
            .catch(error => {
                console.error('Error Accepting leave:', error);
            });
    };

    const reject = (leaveId) => {
        axios.put(`http://localhost:8080/employee/reject/${leaveId}`)
            .then(response => {
                setDisabledButtons(prevState => {
                    const newState = [...prevState.filter(_id => _id !== leaveId), leaveId];
                    localStorage.setItem('disabledButtons', JSON.stringify(newState));
                    return newState;
                });
                setFormData(prevFormData => prevFormData.map(item => {
                    if (item._id === leaveId) {
                        return { ...item, status: 'Rejected' };
                    }
                    return item;
                }));
            })
            .catch(error => {
                console.error('Error Rejected leave:', error);
            });
    };

    const filteredFormData = formData.filter(data => {
        if (searchDate === '') return true;
        return data.startDate.includes(searchDate) || data.endDate.includes(searchDate);
    });

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredFormData.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const goBack = () => {
        window.history.back(); // Navigate back to the previous page
    };


    if (loading) {
        return <div>Loading...</div>;
    }


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
                    <div>
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
                        <tr className="text-white bg-gray-800">
                            <th className="border px-4 py-2">Serial No.</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Start Date</th>
                            <th className="border px-4 py-2">End Date</th>
                            <th className="border px-4 py-2">Reason</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((data, index) => (
                            <tr key={data._id} className="bg-gray-100">
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{data.email}</td>
                                <td className="border px-4 py-2">{data.startDate}</td>
                                <td className="border px-4 py-2">{data.endDate}</td>
                                <td className="border px-4 py-2">{data.reason}</td>
                                <td className="border px-4 py-2">{data.status}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => accept(data._id)}
                                        disabled={disabledButtons.includes(data._id)}
                                        className={`mr-4 px-4 py-2 rounded-md text-white font-semibold transition-colors duration-300 ease-in-out ${data.status === 'Accepted' ? 'bg-gray-600' : 'bg-green-500 hover:bg-green-600'}`}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => reject(data._id)}
                                        disabled={disabledButtons.includes(data._id)}
                                        className={`mr-4 px-4 py-2 rounded-md text-white font-semibold transition-colors duration-300 ease-in-out ${data.status === 'Rejected' ? 'bg-gray-600' : 'bg-red-500 hover:bg-red-600'}`}
                                    >
                                        Reject
                                    </button>
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
                        style={{ fontSize: '0.9rem' }}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <ul className="flex gap-2">
                        {Array.from({ length: Math.ceil(filteredFormData.length / recordsPerPage) }, (_, i) => (
                            <li key={i}>
                                <button
                                    onClick={() => paginate(i + 1)}
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
                        style={{ fontSize: '0.9rem' }}
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManagerTableForm;
