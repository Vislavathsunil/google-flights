import React, { useContext, useEffect, useState } from 'react'

// distance png 
import distance from "../assets/distance.png"
import { FaChevronDown } from "react-icons/fa";
import SelectedFlights from './selectedFlights';
import { useDispatch, useSelector } from 'react-redux';

import { setMyState } from "../store/selected";
import { useNavigate } from 'react-router-dom';
import DropDownFlightDetails from './dropDownFlightDetails';


function FlightsDetails({ flightDetails, business, stopSelection }) {

    // selected flights
    const [selectFlights, setSelectFlights] = useState([]);


    // flight departure date formated  Thu, Sep 26 like this
    const [departureFormat, setDepartureFormat] = useState("");

    useEffect(() => {
        const dateString = flightDetails[0].legs[0].departure.split("T")[0].slice(0, 10); // date in yyyy-mm-dd format
        const date = new Date(dateString);

        const formattedDate = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(date);
        console.log(typeof formattedDate);
        setDepartureFormat(formattedDate);
    }, [])

    // global selected flights
    const item = useSelector(state => state.globalState.myState);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [isDrawerOpen, setIsDrawerOpen] = useState({
        id: "",
        isOpen: false,
    });

    return (
        <div className='my-10'>

            <div className=' w-full flex justify-between text-center mb-4'>
                <h2 className='text-left text-lg md:text-xl font-semibold '>{(business === 'economy' | business === 'business') ? "Best departing flights" : "Departing flights"}</h2>
                {
                    item.length > 0 &&
                    <button className='border border-slate-400 px-4 py-2 rounded-lg hover:bg-gray-100 font-semibold' onClick={() => navigate("/selectedFlights")}>Saved Flights</button>

                }
            </div>

            <div className='flex flex-col gap-2'>

                {/* <hr className='mb-8 border-1 border-slate-700' /> */}
                {
                    flightDetails?.map((ele, index) => (
                        <div key={index} className='border border-black rounded-xl p-4 cursor-pointer' onClick={() => {
                            dispatch(setMyState(ele))
                            navigate("/selectedFlights")
                        }}>
                            <div className='flex  flex-col gap-2 md:flex-row md:justify-between items-start p-2'>
                                <div className='flex justify-between md:justify-evenly  gap-8 w-full '>
                                    {/* airline logo */}
                                    <div>
                                        <img src={ele.legs[0].carriers.marketing[0].logoUrl} alt="flight logo" className='w-10 rounded-lg' />
                                    </div>

                                    {/* time start and end */}
                                    {
                                        (isDrawerOpen?.id === ele.id && isDrawerOpen?.isOpen) ?
                                            <div>
                                                <h2 className='font-semibold'> Departure <span className='text-2xl font-semibold '> · </span> {departureFormat}</h2>
                                            </div> :

                                            <div className='flex flex-col gap-1'>
                                                <div className='flex gap-2 font-semibold'>
                                                    <h2>{ele.legs[0].departure.split("T")[1].slice(0, 5)} {ele.legs[0].departure.split("T")[1].slice(0, 2) < 11 ? "AM" : "PM"}</h2> -
                                                    <h2>{ele.legs[0].arrival.split("T")[1].slice(0, 5)} {ele.legs[0].departure.split("T")[1].slice(0, 2) < 11 ? "AM" : "PM"}</h2>
                                                </div>
                                                <p className='text-sm text-slate-400'>{ele.legs[0].carriers.marketing[0].name}</p>
                                            </div>
                                    }
                                </div>

                                <div className='w-full flex justify-between '>
                                    {
                                        (isDrawerOpen?.id === ele.id && isDrawerOpen?.isOpen) ? <div></div> :
                                            <div className='flex items-start gap-4'>
                                                {/* Total journey duration  */}
                                                <div className='flex flex-col gap-1'>
                                                    <h2 className=' font-semibold'> {Math.floor(ele.legs[0].durationInMinutes / 10)} hr  {ele.legs[0].durationInMinutes % 10} min</h2>
                                                    <div className='text-sm text-slate-400 flex gap-1'>
                                                        <p>{ele.legs[0].origin.displayCode}</p> -
                                                        <p>{ele.legs[0].destination.displayCode}</p>
                                                    </div>
                                                </div>

                                                {/* Stop or nonstop */}
                                                <div className='font-semibold '>
                                                    {ele.legs[0].stopCount === 0 ? "NonStop" : "Stop"}
                                                </div>
                                            </div>
                                    }

                                    {/* Flight journey price */}
                                    <div className='flex justify-between  items-start gap-6 md:gap-4'>
                                        {
                                            (isDrawerOpen?.id === ele.id && isDrawerOpen?.isOpen) &&
                                            <div>
                                                <button className='border border-slate-600 px-4 rounded-full hover:bg-slate-200 font-semibold py-1' onClick={(e) => {
                                                    e.stopPropagation()
                                                    dispatch(setMyState(ele))
                                                }}>Select Flight</button>
                                            </div>
                                        }
                                        <div className='flex items-center gap-4'>
                                            <h2 className='font-bold text-green-600'>{ele.price.formatted}</h2>
                                            <button onClick={(e) => {
                                                e.stopPropagation();
                                                setIsDrawerOpen({ id: ele.id, isOpen: !isDrawerOpen.isOpen })
                                            }}><FaChevronDown /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Drop down details component */}
                            {
                                isDrawerOpen?.id === ele.id && isDrawerOpen?.isOpen && <DropDownFlightDetails ele={ele} isDrawerOpen={isDrawerOpen} business={business} />
                            }
                        </div>
                    ))
                }
                <hr className='mt-8 border-1 border-slate-700' />
            </div>
        </div >
    )
}

export default FlightsDetails;