
import React, { useEffect, useState } from 'react'

// distance png 
import distance from "../assets/distance.png"
import flightImg from "../assets/selectedflight.jpeg"
import { FaChevronDown } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';

import { setMyState } from "../store/selected"
import { useNavigate } from 'react-router-dom';


function SelectedFlights({ selectFlights, business }) {
    const navigate = useNavigate();

    const item = useSelector(state => state.globalState.myState);

    // Drawer to show more details about flights
    const [isDrawerOpen, setIsDrawerOpen] = useState({
        id: "",
        isOpen: false,
    });

    useEffect(() => {
        console.log("global state :", item);
        console.log(stop);
    }, [item])


    // flight departure date formated  Thu, Sep 26 like this
    const [departureFormat, setDepartureFormat] = useState("");

    const [lowestTotal, setTowestTotal] = useState();

    useEffect(() => {
        if (item.length > 0) {
            const dateString = item[0]?.legs[0].departure.split("T")[0].slice(0, 10); // date in yyyy-mm-dd format
            const date = new Date(dateString);

            // Use Intl.DateTimeFormat to format the date
            const formattedDate = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(date);
            console.log(typeof formattedDate);
            setDepartureFormat(formattedDate);
        }

    }, [])

    useEffect(() => {

        if (item.length > 0) {
            const lowestPrice = item.reduce((min, item) => {
                return item.price.raw < min ? item.price.raw : min;
            }, Infinity);
            setTowestTotal(Math.floor(lowestPrice) + 1)
            console.log(Math.floor(lowestPrice) + 1);
        }


    }, [item])


    return (
        <div className='my-6 px-4 sm:px-2 md:px-10 lg:px-20 mb-8'>
            {/* <h2 className='text-left text-xl font-semibold mb-4'>{(business === 'economy' | business === 'business') ? "Best departing flights" : "Departing flights"}</h2> */}
            <h1 className='text-center text-2xl md:text-3xl font-bold mb-10'>My Flights</h1>


            {item.length > 0 &&
                <div className='flex flex-col mb-6 gap-1'>

                    <div className='flex justify-between'>
                        <div className='flex flex-col items-center md:justify-start md:items-center md:flex-row gap-3 '>
                            <h1 className='text-xl md:text-2xl font-bold'>{item[0]?.legs[0].origin.city}</h1>
                            <FaArrowRightArrowLeft className='text-slate-600 rotate-90 md:rotate-0 ' />
                            <h1 className='text-xl md:text-2xl font-bold text-start'>{item[0]?.legs[0].destination.city}</h1>
                        </div>
                        <div className='flex flex-col gap-1 items-end'>
                            <h2 className='text-xl md:text-2xl font-bold'>${lowestTotal}</h2>
                            <p className='text-sm text-slate-500'>Lowest total price</p>
                        </div>
                    </div>
                    <div className=' flex items-center justify-start gap-3 text-slate-500'>
                        <p>Round Trip</p>
                        <p>Economy</p>
                    </div>
                </div>
            }

            <div className='flex flex-col gap-2'>

                {/* <hr className='mb-8 border-1 border-slate-700' /> */}
                {
                    item.length === 0 && <div className='flex justify-center mt-4' >
                        <img src={flightImg} alt="flyng_flight" className='w-[350px] rounded-xl' />
                    </div>
                }

                {item.length > 0 ?
                    <h2 className='text-lg font-semibold '>Selected flights</h2> :
                    <h2 className='text-lg font-semibold text-center mt-2'>You are not Selected  any flights ✈️✈️. Let's start your journey right now.</h2>

                }

                {
                    item?.map((ele, index) => (
                        <div key={index} className='border border-black rounded-xl p-4 '>
                            <div className='flex  flex-col gap-2 md:flex-row md:justify-between items-start p-2'>
                                <div className='flex justify-between md:justify-normal gap-8 w-full '>
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

                                    <div className='flex items-start gap-6 md:gap-4'>
                                        {
                                            (isDrawerOpen?.id === ele.id && isDrawerOpen?.isOpen) &&
                                            <div>
                                                <button className='border border-slate-600 px-4 rounded-full hover:bg-slate-200 font-semibold py-1' onClick={(e) => {
                                                    navigate("/")
                                                }}>Change Flight</button>
                                            </div>
                                        }
                                        <div className='flex items-center gap-4'>
                                            <h2 className='font-bold text-green-600'>{ele.price.formatted}</h2>
                                            <button onClick={() => setIsDrawerOpen({ id: ele.id, isOpen: !isDrawerOpen.isOpen })}><FaChevronDown /></button>
                                        </div>


                                    </div>


                                </div>

                            </div>



                            {/* Drop down details */}

                            {
                                isDrawerOpen?.id === ele.id && isDrawerOpen?.isOpen &&

                                <div className={`transition-all duration-500 ease-in-out opacity-0 translate-y-4 ${isDrawerOpen ? 'opacity-100 translate-y-0' : ''}`}>
                                    <div className='border-t-2 border-slate-600 mt-2'>

                                        {/* no stops and with stops */}
                                        {
                                            ele.legs[0].stopCount === 0 ?
                                                <div className='mt-6 flex'>

                                                    {/* distance image div */}
                                                    <div className=''>
                                                        <img src={distance} alt="distance_img" className='h-20' />
                                                    </div>
                                                    {/* airport start and end names */}
                                                    <div className='flex flex-col gap-1'>
                                                        <div className='flex items-center gap-1 font-semibold'>
                                                            <span>{ele.legs[0].departure.split("T")[1].slice(0, 5)}</span>
                                                            <span>{ele.legs[0].origin.name}</span>({ele.legs[0].origin.displayCode})
                                                        </div>

                                                        <p className='text-sm  text-slate-600'>
                                                            Trave time: {Math.floor(ele.legs[0].durationInMinutes / 10)} hr  {ele.legs[0].durationInMinutes % 10} min
                                                        </p>

                                                        <div className='flex items-center gap-1 font-semibold '>
                                                            <span>{ele.legs[0].arrival.split("T")[1].slice(0, 5)}</span>
                                                            <span>{ele.legs[0].destination.name}</span>({ele.legs[0].destination.displayCode})
                                                        </div>


                                                        {/* flight name and seat type */}
                                                        <div className='flex justify-start  items-center gap-2 text-sm text-slate-400'>
                                                            <p className=' '>{ele.legs[0].carriers.marketing[0].name}</p>
                                                            <p className='capitalize'>{business}</p>
                                                            <p>{ele.legs[0].segments[0].flightNumber}</p>
                                                        </div>
                                                    </div>
                                                </div> :

                                                <div>
                                                    {
                                                        ele.legs[0].segments.map((ele, index) => (

                                                            <div key={index}>

                                                                <div className='mt-6 flex mb-4 '>

                                                                    {/* distance image div */}
                                                                    <div className=''>
                                                                        <img src={distance} alt="distance_img" className='h-20' />
                                                                    </div>
                                                                    {/* airport start and end names */}
                                                                    <div className='flex flex-col gap-1 '>
                                                                        <div className='flex items-center gap-1 font-semibold'>
                                                                            <span>{ele.departure.split("T")[1].slice(0, 5)}</span>
                                                                            <span>{ele.origin.name}</span>({ele.origin.displayCode})
                                                                        </div>

                                                                        <p className='text-sm  text-slate-600'>
                                                                            Trave time: {Math.floor(ele.durationInMinutes / 10)} hr  {ele.durationInMinutes % 10} min
                                                                        </p>

                                                                        <div className='flex items-center gap-1 font-semibold '>
                                                                            <span>{ele.arrival.split("T")[1].slice(0, 5)}</span>
                                                                            <span>{ele.destination.name}</span>({ele.destination.displayCode})
                                                                        </div>

                                                                        {/* flight name and seat type */}
                                                                        <div className='flex  items-center gap-2 text-sm text-slate-400 mt-4 '>
                                                                            <p className=' '>{ele.marketingCarrier.name}</p>  <span className='text-2xl font-semibold'> ·</span>
                                                                            <p className='capitalize'>{business}</p>
                                                                            <p>{ele.flightNumber}</p>

                                                                        </div>

                                                                    </div>

                                                                </div>
                                                                <hr className=' mb-4 border-1 border-slate-700 w-full mt-4 px-4' />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    ))
                }
                {item.length > 0 &&
                    <hr className='mt-8 border-1 border-slate-700' />
                }
            </div>


            {item.length > 0 &&
                <div>
                    <p className='text-center text-slate-600 text-sm  pt-4' >&copy;Sunil, All rights are reserved.</p>
                </div>
            }
        </div >
    )
}

export default SelectedFlights