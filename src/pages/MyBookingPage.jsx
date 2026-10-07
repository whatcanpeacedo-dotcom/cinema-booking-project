/* route : /my-bookings
Previous bookings
Information retrieved from localStorage
Booking reference
Movie
Seats
Total
Date/time

If there are no bookings: No bookings yet. */

import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getBookings} from "../utils/storage";

function MyBookingPage(){
    const [bookings, setBookings] = useState([]);
    useEffect (() => {
        const savedBookings = getBookings ();
        setBookings (savedBookings);
    
    }, []);
    return(
        <div className="min-h-screen bg-gray-950 text-white p-6">

            <div className="max-w-3xl mx-auto">
                
                <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

                <div className="grid gap-6">
                    {bookings.length === 0 ? (
                        <p className="text-gray-400">
                            No bookings yet.
                        </p>
                    ) : (
                    <div className="grid gap-6">
                        {bookings.map((booking) => (
                            <div
                                key={booking.id}
                               className="bg-black border-2 border-red-600 rounded-lg p-6"
                            >
                                <h2 className="text-l font-bold mb-4">
                                    {booking.movieTitle}
                                </h2>

                                <p>Booking ID: {booking.id}</p>
                                <p>Cinema: {booking.cinema}</p>
                                <p>Showtime: {booking.showtime}</p>
                                <p>Seats: {booking.seats.join(", ")}</p>
                                <p className="font-bold mt-3">
                                    Total: £{booking.total}
                                </p>
                                <p>
                                    Date: {new Date(booking.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                </div>
                
                <Link
                    to="/"
                    className="inline-block mb-6 bg-white text-black px-4 py-2 rounded-lg mt-4"
                >
                     Back to Home
                </Link>

            </div>
        </div>
    );
}

export default MyBookingPage;