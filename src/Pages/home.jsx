import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form';
import { useLazyGetFlightDetailsQuery, useLazyGetSummaryQuery } from '@/store/flights';
import FlightsDetails from './flightsDetails';

// loader svg
import loader from "../assets/loader.svg"
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { FaFilter } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import FreQuestions from './questions';

import { FaLocationDot } from "react-icons/fa6";
import FilterFlights from './filter';
import DestinationPlaces from './destinationPlaces';

// redux reeducer
import { clearMyState } from "../store/selected"
import { useDispatch } from 'react-redux';
import WayCabinSelection from './wayCabinSelection';

function Home() {

    const [flightSearch, setFlightSearch] = useState({
        originSkyId: "",
        destinationSkyId: "",
        originEntity: "",
        destinationEntity: "",
        startDate: "",
        returnDate: "",
        cabin: "",
    });

    // All aiports
    const [origin, setorigin] = useState([])
    const [destination, setDestination] = useState([])

    const [startSearch, setStartSearch] = useState("");
    const [stopSearch, setStopSearch] = useState("");

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [getSummary] = useLazyGetSummaryQuery();

    // getting flight details
    const [getFlightDetails, { error, isFetching }] = useLazyGetFlightDetailsQuery();

    // state for holding error occurs in fetching flight details
    const [errorAvaialableFlights, setErrorAvaialableFlights] = useState("");


    // After flights details from Airport1 -> Airport2
    const [originalFlightDetails, setOriginalFlightDetails] = useState([]);
    const [flightDetails, setFlightDetails] = useState([]);

    // drop down state 
    const [position, setPosition] = useState("economy")
    const [business, setBusiness] = useState("economy");

    // Way selection
    const [wayType, setWayType] = useState("roundTrip");
    const [way, setWay] = useState("roundTrip");


    //  flight Price range
    const [price, setPrice] = useState(10000);

    // stop selection
    const [stopSelection, setStopSelection] = useState("direct");

    // to show filter buttons
    const [showFilter, setShowFilter] = useState(false);


    // state for holding error while filtering
    const [filterError, setFilterError] = useState("");

    // useDispatch for calling redux reduxer
    const dispatch = useDispatch();

    // useEffect for settng position
    useEffect(() => {
        setBusiness(position);
    }, [position])

    useEffect(() => {
        setWay(wayType);

    }, [wayType])


    useEffect(() => {
        aiportSearch1();
    }, [startSearch])

    useEffect(() => {
        aiportSearch2();
    }, [stopSearch])


    useEffect(() => {
        const filled = Object.entries(flightSearch)
            .every(([key, value]) => {
                if (key === "returnDate") {
                    return true;
                }
                return value.trim() !== "";
            });
        if (filled) {
            avaialableFlights();
        }
    }, [flightSearch])

    // When page loads filter flights by price
    useEffect(() => {
        if (originalFlightDetails.length > 0) {
            const filteredFlights = originalFlightDetails.filter((value) => value.price.raw < price);

            if (filteredFlights.length > 0) {
                setFlightDetails(filteredFlights);
                setFilterError('')
            }
            else {
                console.log(`No flights for upto $${price} of ${stopSelection} stop`);
                setFilterError(`No flights for  ${convertCamelCaseToSpaced(stopSelection)}  ${price === 10000 ? '.' : `upto $ ${price}`}`);
            }
        }
    }, [price, originalFlightDetails]);


    // when page loads filter flights by stop selection
    useEffect(() => {
        console.log(stopSelection);
        let filteredFlights;
        if (originalFlightDetails.length > 0) {
            if (stopSelection === "direct") {
                filteredFlights = originalFlightDetails.filter((value) => value.legs[0].stopCount === 0);
            }
            if (stopSelection === "oneStop") {
                filteredFlights = originalFlightDetails.filter((value) => value.legs[0].stopCount === 1);
            }
            if (stopSelection === "twoStops") {
                filteredFlights = originalFlightDetails.filter((value) => value.legs[0].stopCount >= 2);
            }
            if (filteredFlights.length > 0) {
                setFlightDetails(filteredFlights);
                setFilterError('')
            }
            else {
                console.log(`No flights for upto $${price} of ${stopSelection} stop`);
                setFilterError(`No flights for  ${convertCamelCaseToSpaced(stopSelection)}  ${price === 10000 ? '.' : `upto $ ${price}`}`)
                setFlightDetails([])
            }
        }
    }, [stopSelection]);


    // while user inputs searches city or airports
    const aiportSearch1 = async () => {
        const { data } = await getSummary({ cityName: startSearch });
        if (data?.status) {
            console.log(data?.data);
            const Cities = data?.data
            setorigin(Cities);
        }
    }

    // while user inputs searches city or airports
    const aiportSearch2 = async () => {
        const { data } = await getSummary({ cityName: stopSearch });
        if (data?.status) {
            console.log(data?.data);
            const Cities = data?.data;
            setDestination(Cities)
        }
    }

    function onsubmit(data) {
        console.log("Form data :", data);
        setFlightSearch({
            originSkyId: origin[0].skyId,
            destinationSkyId: destination[0].skyId,
            originEntity: origin[0].entityId,
            destinationEntity: destination[0].entityId,
            startDate: data.startDate,
            returnDate: data.DepDate,
            cabin: business,
        })
    }

    // if flights are presesnt set that flights
    const avaialableFlights = async () => {
        const { data } = await getFlightDetails({
            originSkyId: flightSearch.originSkyId,
            destinationSkyId: flightSearch.destinationSkyId,
            originEntity: flightSearch.originEntity,
            destinationEntity: flightSearch.destinationEntity,
            startDate: flightSearch.startDate,
            returnDate: flightSearch.returnDate,
            cabin: business,

        });

        if (data?.status) {
            if (data?.status && data?.data.context.totalResults === 0) {
                setErrorAvaialableFlights("Sorry, no flights found for this route try for another");
                return;
            }
            dispatch(clearMyState());
            setOriginalFlightDetails(data.data.itineraries);
            setShowFilter(true);
            console.log(data.data.itineraries);
        }
        if (data?.status !== true) {
            console.log(data?.message);
            setErrorAvaialableFlights(data?.message);
        }
    }

    // function makes oneStop --> One Stop
    function convertCamelCaseToSpaced(str) {
        if (typeof str !== "string") {
            return '';
        }
        return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (char) {
            return char.toUpperCase();
        });
    }


    return (
        <section className='px-4 sm:px-2 md:px-10 lg:px-20 mb-8'>
            <div className='mt-6 '>
                <h1 className='text-center text-3xl font-bold mb-8'>Flights</h1>

                <div className='mt-4 w-full  '>

                    <div className='border border-black rounded-lg bg-gray-50 border-none'>
                        <div>
                            <WayCabinSelection wayType={wayType} setWayType={setWayType} position={position} setPosition={setPosition} business={business} />
                        </div>
                        <form className='flex flex-col  gap-2  p-4 ' onSubmit={handleSubmit(onsubmit)}>

                            {/* Airport choosing */}
                            <div className="flex flex-col lg:flex-row md:gap-4 mb-4 w-full">
                                {/* Input fields */}
                                <div className="flex flex-col gap-2 md:flex-row md:gap-4 mb-4 w-full">
                                    <Input type="text"    {...register("startAirport")} onChange={(e) => setStartSearch(e.target.value)} value={startSearch} placeholder="Where from?" list="StartAirports" className="flex-1 border border-slate-600 w-full rounded-sm focus:border-none" />
                                    <Input type="text"  {...register("destinationAirport")} onChange={(e) => setStopSearch(e.target.value)} placeholder="Where to?" list="DestAirports" className="flex-1 border-slate-600 rounded-sm focus:border-none" />
                                </div>
                                <datalist id="StartAirports">
                                    {
                                        origin?.length > 0 && origin.map((ele, index) => (
                                            <option key={index}> {ele.presentation.title}, {ele.presentation.subtitle} </option>
                                        ))
                                    }
                                </datalist>

                                <datalist id="DestAirports">
                                    {
                                        destination?.length > 0 && destination.map((ele, index) => (
                                            <option key={index}>{ele.presentation.title}, {ele.presentation.subtitle}</option>
                                        ))
                                    }
                                </datalist>

                                {/* Date chooser */}
                                <div className="flex flex-col gap-2 md:flex-row md:gap-4 mb-4 w-full">
                                    <input type="date" onFocus={(e) => e.target.showPicker()} name="startDate" {...register("startDate", { required: true })} id="OriginDate" className="flex-1 border border-slate-600 w-full rounded-sm focus:border-none px-2 text-slate-600" />
                                    {
                                        way === "roundTrip" && <input type="date" onFocus={(e) => e.target.showPicker()} name="returnDate" {...register("DepDate", { required: true })} id="DepDate" className="flex-1 border border-slate-600 w-full rounded-sm focus:border-none px-2 text-slate-600 " />
                                    }
                                </div>
                            </div>

                            <div className='flex justify-center items-center  w-full'>
                                <button type="submit" className=" bg-blue-300 hover:bg-blue-400 text-black py-2 px-4 rounded-full w-1/2 md:w-[20%] font-semibold  flex justify-center items-center gap-4"> <FaSearch className='w-6' />Explore</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            {/*filters flights detials by stops and price */}
            {(showFilter && errorAvaialableFlights.length === 0) &&
                <FilterFlights stopSelection={stopSelection} setStopSelection={setStopSelection} setPrice={setPrice} price={price} />
            }


            {/* displays errors of fetching flights details and if fetched shows flight details   */}
            {
                isFetching ? <div className='my-16 flex justify-center  w-full mb-8'>
                    <img src={loader} alt="loader_img" className='w-14' />
                </div> : (errorAvaialableFlights?.length > 0 ? <div className='my-16 flex justify-center w-full  md:text-xl font-semibold  px-6 '>{errorAvaialableFlights}</div> :
                    (
                        filterError.length > 0 ?
                            <div className='my-16 flex flex-col items-center w-full gap-2'>
                                <h3 className='md:text-2xl font-semibold'>😔 {filterError}</h3>
                                <p className='text-sm text-slate-400'>Try clearing your filters to see results</p>
                            </div> :
                            (flightDetails.length > 0 ? <FlightsDetails flightDetails={flightDetails} business={business} price={price} stopSelection={stopSelection} /> : "")
                    )
                )
            }


            {/* popular places images */}
            {
                flightDetails.length === 0 && <DestinationPlaces />
            }

            {/* Show accordion  frequently asked questiions */}
            {
                flightDetails.length === 0 && <FreQuestions />
            }

            {/* All rights are reserved */}
            {
                !isFetching &&
                <div>
                    <p className='text-center text-slate-600 text-sm  pt-4' >&copy;Sunil, All rights are reserved.</p>
                </div>
            }

        </section >
    )
}

export default Home;