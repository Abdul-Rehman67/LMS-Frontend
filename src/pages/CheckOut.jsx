import { React, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Checkout } from "../apis/apiFunctions";
import TopBar from "../components/TopBar";
import axios from '../apis/axios'
import { CHECK_OUT } from "../apis/apiRoutes";
// 12-1231234

const CheckOut = () => {
    // name, mobileNumber, nationalID
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ CheckOutDate: new Date().toISOString().split('T')[0] });
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);
    // const Id = localStorage.getItem('id')
    const { id } = useParams();


    const validateCheckoutPayload = (payload) => {
        console.log("payload", payload)
        const errors = [];
        if (!payload) {
            alert('all fields are required')
            return
        }
        if (!payload.name || payload.name.trim() === '') {
            errors.push('Name is required');
        }
        const mobileRegex = /^\d{2}-\d{7}$/;

        if (!payload.mobileNumber || !mobileRegex.test(payload.mobileNumber)) {

            errors.push('Mobile number must be in the format xx-xxxxxxx');
        }
        const nationalIdRegex = /^[0-9]{11}$/;
        if (!payload.nationalID || !nationalIdRegex.test(payload.nationalID)) {
            errors.push('National ID must be numeric and 11 digits');
        }
        return errors;
    };


    const handleSubmit = async (e) => {
        const validationErrors = validateCheckoutPayload(formData);
        if (validationErrors.length > 0) {
            alert(validationErrors.join('\n'));
            return
        }
        e.preventDefault()

        try {
            setLoading(true)
            let response = await axios.post(`${CHECK_OUT}/${id}`, { formData })
            if (response.data.success) {
                setLoading(false)
                alert(response.data.message)
                navigate('/')
            }
            else {
                setLoading(false)
                alert(response.data.message)

            }

        }
        catch (e) {
            console.log(e)
            alert(e.payload.message)
            setLoading(false)
        }


    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };
    const handleChangeDate = (event) => {
        setSelectedDate(event.target.value);
        setFormData({
            ...formData,
            date: event.target.value ? event.target.value : selectedDate,
        })
    };

    useEffect(() => { }, []);
    return (
        <>
            <div className="bg-gray-200 min-h-screen flex flex-col">
                <TopBar />

                <div className="container md:w-5/12 w-full mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <div>
                            <form>
                                <h1 className="mb-8 text-3xl text-center">Check Out</h1>
                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="name"
                                    placeholder="Name"
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="mobileNumber"
                                    placeholder="Mobile No"
                                    onChange={handleChange}
                                />

                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="nationalID"
                                    placeholder="National ID"
                                    onChange={handleChange}
                                />
                                <input
                                    type="date"
                                    className="block border border-grey-light w-full p-3 rounded mb-4 text-gray-400"
                                    placeholder="Select date"
                                    value={selectedDate}
                                    name="date"
                                    disabled={true}

                                    onChange={handleChangeDate}
                                />
                                <button

                                    className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none my-1"
                                    onClick={handleSubmit}
                                >
                                    {loading ? "Please wait..." : "Check-out"}
                                </button>
                                <p className="text-sm underline text-blue-400 cursor-pointer" onClick={() => navigate('/')}>dashboard</p>

                            </form>


                        </div>
                    </div>
                </div >
            </div >
        </>
    );
};

export default CheckOut;
