import React from 'react'

// react icons
import { FaFilter } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';



// function makes onsStop --> One Stop
function convertCamelCaseToSpaced(str) {
    if (typeof str !== "string") {
        return ''; // Return empty string if not valid
    }
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (char) {
        return char.toUpperCase();
    });
}

function FilterFlights({ stopSelection, setStopSelection, price, setPrice }) {
    return (
        <div className='mt-6'>
            <h2 className='text-lg font-semibold  flex items-center gap-2'> <FaFilter />All Filter</h2>
            < div className='w-full grid grid-cols-2 gap-4 md:flex md:items-center md:gap-2 mt-4 text-sm text-slate-600 ' >

                {/* Dropdown for stops filtering */}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className=' flex gap-2 items-center p-2 px-4   hover:bg-slate-100 rounded-lg capitalize font-semibold border border-slate-400 hover:text-black' >
                            {/* Stop {convertCamelCaseToSpaced(stopSelection)} <FaCaretDown /> */}
                            Stop {stopSelection} <FaCaretDown />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={stopSelection} onValueChange={setStopSelection}>

                            <div className='py-2 px-4'>
                                <DropdownMenuRadioItem value="direct">Direct only</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="oneStop">1 stop only</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="twoStops">2 stops or more</DropdownMenuRadioItem>
                            </div>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Dropdown for price filtering */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className=' flex gap-2 items-center p-2 px-4   hover:bg-slate-100 rounded-lg capitalize font-semibold border border-slate-400 hover:text-black' >
                            Price {price !== 10000 && `${price}`}   {price !== 10000 && <RxCross1 />} <FaCaretDown />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup >
                            <div className='py-2 px-4'>
                                <p className='mb-4'>Price</p>
                                <p className='text-sm text-blue-600 mb-2'>  {price !== 10000 ? `up to $${price}` : "All prices"}</p>
                                <input
                                    type="range"
                                    name="price"
                                    id="price"
                                    min={100}
                                    max={10000}
                                    step={100}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default FilterFlights