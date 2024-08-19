import './complaintHistory.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './adminNav';

const AllRequests = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [allRequests, setAllRequests] = useState([]);
    const [zeroComplaints, setZeroComplaints] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchComplaints();
    }, [])

    const updateStatus = async (requestId) => {
        setLoading(true);
        try {
            const token = cookies.token;
            const res = await axios.patch('https://swachh-backend.onrender.com/request/update', 
                { _id: requestId }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.status === 200) {
                alert("Successfully approved!");
                fetchComplaints();
            } else if (res.status === 403) {
                alert(res.data.message);
                navigate('/');
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error("Error updating status", error);
            alert("An error occurred while updating the status.");
        } finally {
            setLoading(false);
        }
    }

    const fetchComplaints = async () => {
        setLoading(true);
        try {
            const token = cookies.token;
            const res = await axios.get('https://swachh-backend.onrender.com/request/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status === 200) {
                setAllRequests(res.data);
            } else if (res.status === 204) {
                setZeroComplaints(true);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error("Error fetching complaints", error);
            alert("An error occurred while fetching complaints.");
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = () => {
        removeCookie('token');
        navigate("/login");
    };

    return (
        <>
            <div>
                <AdminNavbar onLogout={handleLogout} />
                <h1 className='page-heading' style={{ color: 'orange', fontWeight: 'bold' }}>Unresolved Queries</h1>
                {zeroComplaints ? (
                    <div className='not-found-div'>
                        <h4>All good! No complaints were found.</h4>
                    </div>
                ) : (
                    <div className="container">
                        <table className='table table-fixed'>
                            <thead>
                                <tr>
                                    <th scope="col" className="col-xs-3">Description</th>
                                    <th scope="col" className="col-xs-3">Type</th>
                                    <th scope="col" className="col-xs-3">Pickup Date</th>
                                    <th scope="col" className="col-xs-3">Pickup Time</th>
                                    <th scope="col" className="col-xs-3">Status</th>
                                    <th scope="col" className="col-xs-3">Change Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allRequests.filter(val => !val.isResolved).map((val, index) => (
                                    <tr className='table-item' key={index}>
                                        <td className='col-xs-6'>{val.description}</td>
                                        <td className={`c-type ${val.wasteType === 'dry' ? 'brown-text' : val.wasteType === 'wet' ? 'blue-text' : ''}`}>{val.wasteType}</td>
                                        <td>{val.pickupDate ? val.pickupDate.substring(0, 10) : ""}</td>
                                        <td>{val.pickupTime}</td>
                                        <td><span className='status yellow'>Pending</span></td>
                                        <td>
                                            <button
                                                style={{
                                                    backgroundColor: '#007bff',
                                                    color: 'white',
                                                    padding: '4px 8px',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => updateStatus(val._id)}
                                                disabled={loading}
                                            >
                                                Mark as complete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <br />
                        <br />

                        <h1 className='page-heading' style={{ color: 'green', fontWeight: 'bold' }}>Resolved Queries</h1>
                        <table className='table table-fixed'>
                            <thead>
                                <tr>
                                    <th scope="col" className="col-xs-3">Description</th>
                                    <th scope="col" className="col-xs-3">Type</th>
                                    <th scope="col" className="col-xs-3">Pickup Date</th>
                                    <th scope="col" className="col-xs-3">Pickup Time</th>
                                    <th scope="col" className="col-xs-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allRequests.filter(val => val.isResolved).map((val, index) => (
                                    <tr className='table-item' key={index}>
                                        <td className='col-xs-6'>{val.description}</td>
                                        <td className={`c-type ${val.wasteType === 'dry' ? 'brown-text' : val.wasteType === 'wet' ? 'blue-text' : ''}`}>{val.wasteType}</td>
                                        <td>{val.pickupDate ? val.pickupDate.substring(0, 10) : ""}</td>
                                        <td>{val.pickupTime}</td>
                                        <td><span className='status green'>Completed</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

export default AllRequests;
