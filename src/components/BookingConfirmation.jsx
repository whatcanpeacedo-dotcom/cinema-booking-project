/* BookingConfirmation.jsx

Displays the completed booking/receipt information. */

function BookingConfirmation({ booking }) {
    return (
        <div className="max-w-xl mx-auto bg-red-900 rounded-lg p-6 shadow-lg">
            <h1 className="text-3xl font-bold text-yellow-400 mb-6">
                Booking Confirmed!
            </h1>

            <h2 className="text-xl font-bold mb-4">
                {booking.movieTitle}
            </h2>

            <p className="mb-2">
                Booking Reference: {booking.id}
            </p>

            <p className="mb-2">
                Cinema: {booking.cinema}
            </p>

            <p className="mb-2">
                Showtime: {booking.showtime}
            </p>

            <p className="mb-2">
                Seat(s): {booking.seats.join(", ")}
            </p>

            <p className="mb-6">
                Total: £{booking.total}
            </p>
            <hr />
                <h2 className="font-bold mb-2 mt-2">
                    Receipt
                </h2>

                <p className="mt-4">
                    Thanks for booking with us.
                </p>
        
        </div>
    );
}

export default BookingConfirmation;