import React from 'react'
import distance from "../assets/distance.png";

function DropDownFlightDetails({ ele, isDrawerOpen, business }) {
    return (
        <div className={`transition-all duration-500 ease-in-out opacity-0 translate-y-4 ${isDrawerOpen ? 'opacity-100 translate-y-0' : ''}`}>
            <div className='border-t-2 border-slate-600 mt-2 mb-4'>

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
                        </div> 
                        :
                        <div>
                            {
                                ele.legs[0].segments.map((ele, index) => (

                                    <div key={index}>

                                        <div className='mt-6 flex'>

                                            {/* distance image div */}
                                            <div className=''>
                                                <img src={distance} alt="distance_img" className='h-20' />
                                            </div>
                                            {/* airport start and end names */}
                                            <div className='flex flex-col gap-1'>
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
    )
}

export default DropDownFlightDetails