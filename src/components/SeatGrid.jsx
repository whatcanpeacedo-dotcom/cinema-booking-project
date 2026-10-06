/* SeatGrid.jsx

Creates the:

A–J
1–15

interactive seating arrangement. */

import {useState } from "react";

function generateBookedSeats() {
    const booked = [];
    const count = Math.floor(Math.random()*(150*0.3));

    for (let i = 0; i < count; i++ ) {
        const row = String.fromCharCode(65 + Math.floor(Math.random()* 10));
        const seat = Math.floor(Math.random()*15) + 1;

        booked.push(row + seat);
    }
    return booked;
    }

 function SeatGrid({ selectedSeats, setSelectedSeats }) {
  
    const [bookedSeats] = useState(generateBookedSeats());

    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

    function handleSeatClick(seat) {
        if (bookedSeats.includes(seat)){
            return;
        }

          if (selectedSeats.includes(seat)) {
                setSelectedSeats(
                    selectedSeats.filter(
                        (selectedSeat) => selectedSeat !== seat
                    )
                );
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    }
    return (
        <div>
            <h2> Choose Seat: </h2>

            {rows.map((row) => (
                <div key = {row}>
                    {Array.from ({length: 15}, (_, index) => {
                        const seat = `${row}${index + 1}`;

                        const isBooked = bookedSeats.includes(seat);
                        const isSelected = selectedSeats.includes(seat);

                    return (
                        <button 
                            key = {seat}
                            onClick = {() => handleSeatClick(seat)}
                            disabled = {isBooked}
                            className = {
                                isBooked
                                    ? "bg-red-500 text-white m-1 p-2"
                                    : isSelected
                                    ? "bg-yellow-400 text-white m-1 p-2"
                                    : "bg-green-500 text-black m-1 p-2"
                            }
                        >
                            {seat}
                        </button>
                    );
                })}
        </div>
    ))}

   </div>
   );
}
export default SeatGrid;