function generateBookingId() {
    return Math.random().toString(36).substring(2,11).toUpperCase();
}
export default generateBookingId;