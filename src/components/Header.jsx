/* Navigation.
Home, Search , My Bookings
 */

import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="bg-red-700 text-white p-2 sm:p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">

                <Link to="/" className="text-lg sm:text-2xl font-bold hover:text-yellow-300">
                    Cinema Booking
                </Link>

                <nav className="flex gap-1 sm:gap-4 text-xs sm:text-base">
                    <Link to="/" className="hover:text-yellow-300">
                        Home
                    </Link>

                    <Link to="/search" className="hover:text-yellow-300">
                        Search
                    </Link>

                    <Link to="/my-bookings" className="hover:text-yellow-300">
                        My Bookings
                    </Link>
                </nav>

            </div>
        </header>
    );
}

export default Header;