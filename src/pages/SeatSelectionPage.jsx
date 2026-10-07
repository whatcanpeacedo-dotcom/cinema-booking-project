/* required- 3 cinemas

    showtime selection
            2pm
            5:30pm
            7pm
            9:30pm

    seatGrid
            A1-A15
            B1-B15
            C1-C15
            D1-D15
            E1-E15
            F1-F15
            G1-G15
            H1-H15
            I1-I15
            J1-J15

    Booking summary
        movie
        cinema
        showtime
        seats
        price
*/

import {useState} from "react";
import CinemaSelector from "../components/CinemaSelector";
import SeatGrid from "../components/SeatGrid";
import {useNavigate, useLocation} from "react-router-dom";
import calculatePrice from "../utils/pricing";
import generateBookingId from "../utils/booking";
import {saveBooking} from "../utils/storage";

function SeatSelectionPage(){

    const [selectedCinema, setSelectedCinema] = useState("");
    const [selectedShowtime, setSelectedShowtime] = useState("");
    const [selectedSeats, setSelectedSeats] = useState([]);

    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);

    const showtimes = ["2:00 PM", "5:30 PM", "7:00 PM", "9:30 PM"];

    const location = useLocation();
    const movie = location.state?.movie;
    const navigate = useNavigate();

    function applyPromoCode() {
        if (promoCode === "STUDENT20") {
            setDiscount(20);
        } else {
            setDiscount(0);
        }
    }

    function handleBooking() {

        const price = calculatePrice(selectedSeats.length);
        const total = price * (1 - discount / 100);

        const booking = {
            id: generateBookingId(),
            movieTitle: movie?.title,
            cinema: selectedCinema,
            showtime: selectedShowtime,
            seats: selectedSeats,
            total: total,
            createdAt: new Date().toISOString()
        };

        saveBooking(booking);

        navigate("/confirmation", {
            state: {booking}
        });
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6">

            <h1 className="text-3xl font-bold text-red-500 mb-6"> Book your slot </h1>

            {movie && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-3"> {movie.title} </h2>
                    <img className="w-40 rounded-lg mb-4" src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}/>
                </div>
            )}

            <CinemaSelector selectedCinema={selectedCinema} setSelectedCinema={setSelectedCinema} />

            <h2 className="text-2xl font-bold text-red-500 mb-3"> Select Showtime </h2>

            {showtimes.map((time) => (
                <button
                    key={time}
                    onClick={() => setSelectedShowtime(time)}
                    className={
                        selectedShowtime === time
                        ? "bg-yellow-400 text-black px-4 py-2 m-1 rounded"
                        : "bg-gray-700 text-white px-4 py-2 m-1 rounded hover:bg-gray-600"
                }> {time} </button>
            ))}

            <SeatGrid selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />

            {selectedSeats.length>0 &&(
                <p className="text-yellow-400 mt-6">
                        Recommended: Choose seats around your selected seat for you and your group
                </p>
            )}
            <h2 className="text-2xl font-bold mt-8 mb-4"> Booking Summary </h2>

            <p>Movie: {movie?.title}</p>

            <p>Cinema: {selectedCinema}</p>

            <p>Showtime: {selectedShowtime}</p>

            <p>Seats: {selectedSeats.join(", ")}</p>

            <div className="mt-4">

                <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="p-2 text-black bg-white border-2 border-red-600 rounded" />

                <button onClick={applyPromoCode} className="bg-white text-red-600 font-bold px-4 py-2 ml-2 rounded" > Apply </button>

            </div>

            <p className="mt-4"> Price: £{calculatePrice(selectedSeats.length)} </p>

            <p> Discount: {discount}% </p>

            <p className="font-bold"> Total: £{calculatePrice(selectedSeats.length) * (1 - discount / 100)} </p>

            <button
                onClick={handleBooking}
                disabled={
                    !selectedCinema ||
                    !selectedShowtime ||
                    selectedSeats.length === 0
                }
                className="bg-red-600 text-white px-6 py-3 rounded-lg disabled:bg-gray-600 mt-4" > Confirm </button> <br />

            <button
                onClick={() => navigate("/")}
                className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4 mb-6"
            >
                Back to Home
            </button>

        </div>
    );
}

export default SeatSelectionPage;