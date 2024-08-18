import './complaints.css';
import React, { useContext, useState} from 'react';
import { useCookies } from 'react-cookie';

import axios from 'axios';
import CustomNavbar from './Navbar';
import { useParams } from 'react-router-dom';
import { DataContext } from '../context/DataProvider';
export const getAccessToken = ()=>{
    return sessionStorage.getItem('accesstoken');

}

const Complaints = () => {
    //const [cookies] = useCookies(['token']);
    const {account} = useContext(DataContext);
    console.log(account.email);
    const [inputValue, setInputValue] = useState({
        
        email:account.email,
        wasteType: "",
        description: "",
        pickupTime: "",
        pickupDate: ""
    });
    const { email,wasteType, description, pickupTime, pickupDate } = inputValue;

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        const trimmedValue = value.trimEnd()
        setInputValue({
            ...inputValue,
            [name]: trimmedValue,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const token = cookies.token;
             console.log("hello");
            const { data } = await axios.post('http://localhost:8000/request/',
                {
                    ...inputValue
                },
                // {
                //     headers: {
                //         "Authorization": `${getAccessToken()}`
                //     }
                // },
               
            );
            console.log("end");
            const { success, message } = data;
            if (success) {
                alert(message);
            } else {
                alert("error in filing complaint");
            }
            setInputValue({
                email:"",
                wasteType: "",
                description: "",
                pickupTime: "",
                pickupDate: ""
            });
        } catch (err) {
            alert("something went wrong")
            console.log(err);
        }

    }



    return (
        <>
            <CustomNavbar />
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="heading">
                        <h2>New Complaint</h2>
                        <p className='head'>Raise a new complaint</p>
                    </div>

                    <div className="input-group">
                        <label for="wasteType" id="lab">Waste Type</label>
                        <select
                            name="wasteType"
                            value={wasteType}
                            id="wasteType"
                            className="input-field"
                            onChange={handleOnChange} >
                            <option value="">Select an option...</option>
                            <option value="wet">Wet Waste</option>
                            <option value="dry">Dry Waste</option>
                        </select>
                    </div>

                    <div className='input-group' style={{ display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="pickupDate" id="lab">Pickup Date:</label>
                        <input type="date" id="pickupDate" className='input-field' name="pickupDate" value={pickupDate} onChange={handleOnChange} />
                    </div>

                    <div className="input-group">
                        <label for="pickupTime" id="lab">Pickup Time</label>
                        <select
                            name="pickupTime"
                            value={pickupTime}
                            id="pickupTime"
                            className="input-field"
                            onChange={handleOnChange} >
                            <option value="">Select an option...</option>
                            <option value="morning">9:00 am - 12:00 pm</option>
                            <option value="afternoon">12:00 pm - 3:00 pm</option>
                            <option value="evening">3:00 pm - 6:00 pm</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label for="description" id="lab">Description</label>
                        <textarea
                            name="description"
                            value={description}
                            id="description"
                            className="input-field"
                            placeholder="Describe your issue..."
                            onChange={handleOnChange}
                            rows="5" />
                    </div>

                    <div className="input-group">
                        <button className="btn">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Complaints;