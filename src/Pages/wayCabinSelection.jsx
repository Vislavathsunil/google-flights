import React from 'react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// react icons
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";


function WayCabinSelection({ wayType, setWayType, position, setPosition, business }) {
    return (

        <div className='px-4 mt-2 flex items-center gap-2  '>
            {/* Trip selection */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className=' flex gap-2 items-center p-2 px-4   hover:bg-slate-100 rounded-lg capitalize font-semibold' >
                        {wayType === 'roundTrip' ? <FaArrowRightArrowLeft /> : <FaArrowRight />} {wayType} <FaCaretDown />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={wayType} onValueChange={setWayType}>
                        <DropdownMenuRadioItem value="roundTrip" className="flex gap-1">    Round trip</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="oneWay">One Way</DropdownMenuRadioItem>

                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>


            {/* Cabin or seat selection */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className=' flex gap-2 items-center p-2 px-2 hover:bg-slate-100 rounded-lg capitalize font-semibold' > <MdAirlineSeatReclineExtra />{business} <FaCaretDown /></button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                        <DropdownMenuRadioItem value="economy">Economy</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="premium_economy">Premium economy</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="business">Business</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="first">First</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default WayCabinSelection