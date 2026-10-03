import {BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import MyBookingPage from "./pages/MyBookingPage";
import ConfirmationPage from "./pages/ConfirmationPage";

/* function App() {
  return (
    <h1 className="text-4xl font-bold">
      Cinema Booking App
    </h1>
  );
} */

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<HomePage/>} />

                <Route path = "/search" element = {<SearchPage/>} />

                <Route path = "/movie/:id" element = {<MovieDetailPage/>} />

                <Route path = "/booking" element = {<SeatSelectionPage/>} />

                <Route path = "/my-bookings" element = {<MyBookingPage/>} />

                <Route path = "/confirmation" element = {<ConfirmationPage/>} />

            </Routes>
        </BrowserRouter>
  );
} 

export default App; 