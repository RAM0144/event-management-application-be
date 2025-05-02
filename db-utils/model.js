import { Schema, model } from "mongoose";

const eventSchema = new Schema({
    name: {
        type: String,
         required: true 
    },
    id: {
        type: String,
        required : true,
    },
    date:{
        type: Date,
         required: true 
    },
    type:{
        type: String, 
        enum: ['ceremony', 'reception', 'custom'], 
        required: true
    },
  
      
})

const eventModel = new model("event", eventSchema, "events")

const userSchema = new Schema({
    username: {
        type: String,
         required: true 
    },
    userId: {
        type: String,
        required: true,
        unique: true,
      },
    email:{
        type: String,
         required: true,
         unique: true,
    },
    password:{
        type: String, 
        required: true
    },
   
  })

  const userModel = new model("user", userSchema, "users")

  const vendorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    details: {
        type: String,
    },
    id: {
        type: String,
        required: true,
    },
});

const vendorModel = new model("vendor", vendorSchema, "vendors");

const bookingSchema = new Schema({
    id: {
        type: String,
        unique: true,
      },  
    eventId: {
        type: String, // Use ObjectId to reference the event
        required: true,
      },
      eventName: {
        type: String, 
        required: true,             // You can store event name if needed
      },
      vendorId: {
        type: String, // Use ObjectId to reference the vendo
        required: true,
      },
      vendorName: {
        type: String, 
        required: true,             // You can store vendor name if needed
      },
      status: {
        type: String,
        default: "booked",
      },
  });
  
  const bookingModel = new model("booking", bookingSchema, "bookings");

  export { eventModel, userModel, vendorModel, bookingModel }