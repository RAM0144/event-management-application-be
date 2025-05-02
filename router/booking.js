import express from "express";
import { bookingModel, eventModel, vendorModel } from "../db-utils/model.js";

const bookingRouter = express.Router();


bookingRouter.post("/", async (req, res) => {

    const { eventId, vendorId } = req.body;
  
    try {
      // Use .findOne({ id }) since you're using custom string IDs
      const event = await eventModel.findOne({ id: eventId });
      const vendor = await vendorModel.findOne({ id: vendorId });
  
      if (!event || !vendor) {
        return res.status(400).send({ msg: "Invalid event or vendor selected." });
      }
  
      // Generate custom unique ID
      const bookingId = Date.now().toString();
  
      const newBooking = new bookingModel({
        id: bookingId,
        eventId: event.id,
        eventName: event.name,
        vendorId: vendor.id,
        vendorName: vendor.name,
        status: "booked",
      });
  
      await newBooking.save();
  
      res.status(201).send({ msg: "Booking created successfully", booking: newBooking });
    } catch (error) {
      console.error("Booking creation failed:", error);
      res.status(500).send({ msg: "Internal Server Error", error: error.message });
    }
  });

bookingRouter.get("/", async (req, res) => {
  try {

    const bookingData = await bookingModel.find(populate("eventId").populate("vendorId"));

    //const bookingData = await bookingModel.find({},{_id: 0, __v: 0 });
    
    res.send({ msg: "bookings: ", bookingData })
  } catch (error) {
    res.status(500).send({ msg: "Error creating booking", error });
  }
});

bookingRouter.get("/bookings", async (req, res) => {
  try {
    const bookings = await bookingModel.find({}, { _id: 0, __v: 0 });

    const enrichedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const event = await eventModel.findOne({ id: booking.eventId });
        const vendor = await vendorModel.findOne({ id: booking.vendorId });

        return {
          ...booking._doc,
          eventDetails: event || {},
          vendorDetails: vendor || {},
        };
      })
    );

    res.send({ msg: "Bookings fetched successfully", bookings: enrichedBookings });
  } catch (error) {
    console.log("Error getting bookings:", error);
    res.status(500).send({ msg: "Error fetching bookings", error });
  }
});


// Update booking status

bookingRouter.patch("/:id", async (req, res) => {
  try {
      const { status } = req.body;  // Assume we're updating the status of the booking
      const bookingId = req.params.id;

      // Find the booking by id
      const updatedBooking = await bookingModel.findOneAndUpdate(
          { id: bookingId },  // Use custom 'id' field here
          { status },  // Update only the status field
          { new: true } // Returns the updated document
      );

      if (!updatedBooking) {
          return res.status(404).send({ msg: "Booking not found" });
      }

      res.status(200).send({ msg: "Booking updated successfully", booking: updatedBooking });
  } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Internal Server Error", error: error.message });
  }
});


bookingRouter.delete("/:id", async (req, res) => {
  try {
    const deleteBooking = await bookingModel.findByIdAndDelete(req.params.id)
    if (!deleteBooking) {
      return res.status(404).json({ error: "booking not found" });
    }
    res.send({ msg: "booking deleted successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Error saving bookings", error })
  }
})

export default bookingRouter