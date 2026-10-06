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

function ConfirmationPage() {
    const location = useLocation();
    const booking = location.state?.booking;

    if (!booking) {
        return <p>No booking found.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6">
            <BookingConfirmation booking={booking} />
        </div>
    );
}

export default ConfirmationPage;