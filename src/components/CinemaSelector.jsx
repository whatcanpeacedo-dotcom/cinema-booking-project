/* CinemaSelector.jsx

Displays the three simulated cinemas.
 */

function CinemaSelector({selectedCinema, setSelectedCinema}) {
    const cinemas = ["A Cinema", "B Cinema", "C Cinema"];

    return (
        <div>
            <h2 className="text-2xl font-bold text-red-500 mb-3">Choose Cinema</h2>

            {cinemas.map((cinema) => (
                <button
                    key = {cinema}
                    onClick = {() => setSelectedCinema(cinema)}
                    className={
                        selectedCinema === cinema
                            ? "bg-yellow-400 text-black font-bold px-4 py-2 m-1 rounded"
                            : "bg-white text-red-600 font-bold px-4 py-2 m-1 rounded"
                    }>
                        
                    {cinema}
                </button>
            ))}
        </div>
    );
}

export default CinemaSelector;

