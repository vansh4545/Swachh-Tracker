import './complaintHistory.css';
import axios from 'axios';
import React, { useEffect, useState} from 'react';
import CustomNavbar from './Navbar';
import { useSelector } from 'react-redux';

const ComplaintHistory = () => {
     console.log('complaintHistory');
    const [history, setHistory] = useState([]);
    const [zeroComplaints, setZeroComplaints] = useState(false);
    const userInfo = useSelector((state) => state.user.userInfo);
    
    console.log(userInfo);
    
    useEffect(() => {
        fetchComplaints();
    },[]);

    const fetchComplaints = async () => {
        
        const res = await axios.get(`https://swachh-backend.onrender.com/request/history`, {
            headers: {
                Authorization: `Bearer `
            }
        });
        if (res.status === 200) {
            setHistory(res.data.complaints);
        } else if (res.status === 204) {
            setZeroComplaints(true);
        } else {
            alert(res.data.message);
        }
    }

    return (
        <>
            <CustomNavbar />
            <div className='hist'>
                <h1 className='page-heading'>Your Pickup Requests History</h1>
                {zeroComplaints &&
                    <div className='not-found-div'>
                        <h4>All good! No complaints were found.</h4>
                    </div>
                }
                {!zeroComplaints &&
                    <div className="container">
                        <table className='table table-fixed'>
                            <thead>
                                <tr>
                                    <th scope="col" class="col-xs-6">Description</th>
                                    <th scope="col" class="col-xs-3">Type</th>
                                    <th scope="col" class="col-xs-3">Pickup Date</th>
                                    <th scope="col" class="col-xs-3">Pickup Time</th>
                                    <th scope="col" class="col-xs-3">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {!zeroComplaints && history.filter((val) => val.email === userInfo.email).map((val, index) => {
                                    console.log(val);
                                    return (
                                        (<tr className='table-item' key={index}>
                                            <td className='col-xs-6'>{val.description.trimEnd()}</td>
                                            
                                            <td className={`c-type ${val.wasteType === 'dry' ? 'brown-text' : val.wasteType === 'wet' ? 'blue-text' : ''}`}>{val.wasteType}</td>
                                            <td>{val.pickupDate !== null ? val.pickupDate.substring(0, 10) : ""}</td>
                                            <td>{val.pickupTime}</td>
                                            <td><span className={val.isResolved ? 'status green' : 'status yellow'}>{val.isResolved ? "Resolved" : "In Process"}</span></td>
                                        </tr>)
                                       
                                    )
                                })
                                }
                            </tbody>

                        </table>
                    </div>
                }
            </div>
        </>
    );
}

export default ComplaintHistory;