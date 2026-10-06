/* Route: /confirmation

confirmation number 
movie 
cinema 
showtime 
seats 
total 
receipt 
booking confirmation 


confirmation page 
    BookingConfirmation
        reference 
        movie 
        cinema 
        showtime 
        seats 
        total 
         */

import { useLocation } from "react-router-dom";
import BookingConfirmation from "../components/BookingConfirmation";
import {link} from "react-router-dom";

function ConfirmationPage() {
    const location = useLocation();
    const booking = location.state?.booking;

    if (!booking) {
        return <p>No booking found.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6">
            <BookingConfirmation booking={booking} />
        

        <div className="flex gap-4 justify-center mt-6">

            <Link
                to="/"
                className="bg-red-600 text-white px-5 py-3 rounded"
            >
                Back to Home
            </Link>

            <Link
                to="/my-bookings"
                className="bg-yellow-400 text-black px-5 py-3 rounded"
            >
                My Bookings
            </Link>

        </div>
    </div>
    );
}

export default ConfirmationPage;