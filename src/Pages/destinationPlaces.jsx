import React from 'react'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

// images  data
import { DestinationImages } from "../data/destinationImages";

function DestinationPlaces() {
    return (
        <div className='w-full mt-8'>
            <h2 className='text-xl font-semibold mb-4'>Popular destinations</h2>

            <div className='px-10'>

                <Carousel className="w-full  ">
                    <CarouselContent className="-ml-1">
                        {DestinationImages.map((ele, index) => (
                            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                <div className="p-1 relative">
                                    <CardContent className="flex items-center justify-center h-[225px]">
                                        <img src={ele.image} alt={ele.place} className="w-full h-full    object-fill rounded-xl" />
                                    </CardContent>
                                    <h3 className="absolute bottom-6 left-6 text-white font-semibold p-2  rounded-md">
                                        {ele.place}
                                    </h3>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )
}

export default DestinationPlaces