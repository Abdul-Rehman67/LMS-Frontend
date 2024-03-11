import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedBook } from "../store/reducers/book";
import axios from '../apis/axios'
import moment from "moment";

import { useEffect } from "react";
import TopBar from "../components/TopBar";

import { useParams } from 'react-router-dom';
import { CHECK_IN, GET_SINGLE_BOOK } from "../apis/apiRoutes";
const CheckIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ CheckOutDate: new Date().toISOString().split('T')[0] });
    const [selectedBook, setSelectedBook] = useState({})
    const [penalty, setPenalty] = useState(null)
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            let response = await axios.get(`${CHECK_IN}/${id}`)
            console.log(response)
            if (response?.data?.success) {
                setLoading(false)
                alert(response.data.message)
                navigate("/")
            }
        }
        catch (e) {
            setLoading(false)

        }



    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };
    const getSingleData = async () => {
        const response = await axios.get(`${GET_SINGLE_BOOK}/${id}`);
        setSelectedBook(response?.data?.payload)
        CalculatePenalty(response?.data?.payload.checkedOutBy?.date)
    }

    const CalculatePenalty = (date) => {

        const currentDate = moment();

        const checkoutMoment = moment(date);


        const differenceInDays = currentDate.diff(checkoutMoment, 'days');

        let lateBusinessDays = 0;
        for (let i = 0; i < differenceInDays; i++) {
            const dateToCheck = checkoutMoment.clone().add(i, 'days');
            if (dateToCheck.day() !== 0 && dateToCheck.day() !== 6) {
                lateBusinessDays++;
            }
        }

        lateBusinessDays -= 15;

        console.log(lateBusinessDays)

        if (lateBusinessDays < 0) {
            lateBusinessDays = 0;
        }


        const penaltyPerDay = 5;
        const calculatedPenalty = lateBusinessDays * penaltyPerDay;
        console.log(calculatedPenalty)
        setPenalty(calculatedPenalty)
    }


    useEffect(() => {

        getSingleData()
    }, []);

    return (
        <>
            <div className="bg-gray-200 min-h-screen flex flex-col">
                <TopBar />

                <div className="container md:w-5/12 w-full mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full mt-5 h-[35rem] overflow-y-scroll">
                        <div>
                            <form >

                                <h1 className="mb-8 text-3xl text-center">Check In</h1>



                                <label className="text-xs text-gray-400">Name</label>
                                <input

                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4 text-gray-400"
                                    name="name"
                                    placeholder="Name"
                                    onChange={handleChange}
                                    value={selectedBook?.checkedOutBy?.name}
                                    disabled={true}

                                />
                                <label className="text-xs text-gray-400">Mobile</label>
                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4 text-gray-400"
                                    name="mobile"
                                    placeholder="Mobile No"
                                    onChange={handleChange}
                                    value={selectedBook?.checkedOutBy?.mobileNumber}
                                    disabled={true}
                                />
                                <label className="text-xs text-gray-400">National ID</label>

                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4 text-gray-400"
                                    name="nationalId"
                                    placeholder="National ID"
                                    onChange={handleChange}
                                    value={selectedBook?.checkedOutBy?.nationalID}
                                    disabled={true}
                                />
                                <label className="text-xs text-gray-400">Checkout Date</label>
                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4 text-gray-400"
                                    placeholder="Date"
                                    value={selectedBook?.checkedOutBy?.date}
                                    disabled={true}



                                />
                                <label className="text-xs text-gray-400">Penalty</label>
                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4 text-gray-400"
                                    placeholder="penalty"
                                    value={penalty}
                                    disabled={true}



                                />
                                <button

                                    className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none my-1"
                                    onClick={handleSubmit}
                                >
                                    {loading ? "Please wait..." : "Check-In"}

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

export default CheckIn;
