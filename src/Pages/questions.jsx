import React from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


function FreQuestions() {
    return (
        < div className='w-full mt-8'>

            <h1 className='text-xl font-semibold'>Frequently asked questions</h1>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-start">How can I find last-minute flight deals?</AccordionTrigger>
                    <AccordionContent className="text-start">
                        Finding last-minute flights is easy on Google Flights.
                        Select your departure and destination cities in the form on the top of the page, and use the calendar to pick travel dates and find the lowest fares available.
                        You can even check for flights departing today.
                        To find the cheapest fares, it’s usually best to book at least a few weeks in advance for domestic flights and a few months in advance for international travel.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-start">How can I find cheap flights for a weekend getaway?</AccordionTrigger>
                    <AccordionContent className="text-start">
                        It’s easy to use Google Flights to find deals on weekend getaways or even weeklong trips.
                        Just enter your departure and destination cities near the top of the page. Then, open the date selector and choose a trip length to see how the round-trip fare changes on different days. Adjust the trip type to see one-way fares. The cheapest available flights are highlighted and easy to spot. Once you settle on dates, select Search to see flight options and book the deal.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-start">How can I find flight deals if my travel plans are flexible?</AccordionTrigger>
                    <AccordionContent className="text-start">
                        You can track flight prices for specific dates or, if your plans are flexible, any dates. To get flight alerts for a specific round trip, choose your dates and flights and select Search. Then, you can turn on price tracking.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default FreQuestions