const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Student = require("./models/Student");
const Event = require("./models/Event");
const Registration = require("./models/Registration");
const Attendance = require("./models/Attendance");
const Feedback = require("./models/Feedback");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create Event
app.post("/events", async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.send(event);
});

app.post("/students",async(req,res)=>{
    const students = new Student(req.body);
    await students.save();
    res.send(students); 
})
// Register Student
app.post("/events/:id/register", async (req, res) => {
  try {
    const registration = new Registration({
      studentId: req.body.studentId,
      eventId: req.params.id
    });
    await registration.save();
    res.send(registration);
  } catch (err) {
    res.status(400).send({ error: "Student already registered" });
  }
});

// Mark Attendance
app.post("/events/:id/attendance", async (req, res) => {
  const attendance = new Attendance({
    studentId: req.body.studentId,
    eventId: req.params.id,
    status: req.body.status
  });
  await attendance.save();
  res.send(attendance);
});

// Feedback
app.post("/events/:id/feedback", async (req, res) => {
  const feedback = new Feedback({
    studentId: req.body.studentId,
    eventId: req.params.id,
    rating: req.body.rating,
    comment: req.body.comment
  });
  await feedback.save();
  res.send(feedback);
});

// Reports - Event Popularity
app.get("/reports/popular-events", async (req, res) => {
  const results = await Registration.aggregate([
    { $group: { _id: "$eventId", totalRegistrations: { $sum: 1 } } },
    { $sort: { totalRegistrations: -1 } }
  ]);
  res.send(results);
});

// Reports - Student Participation
app.get("/reports/student/:id", async (req, res) => {
  const results = await Attendance.find({ studentId: req.params.id, status: "Present" });
  res.send({ studentId: req.params.id, eventsAttended: results.length });
});

// Reports - Average Feedback
app.get("/reports/event/:id", async (req, res) => {
  const results = await Feedback.aggregate([
    { $match: { eventId: new mongoose.Types.ObjectId(req.params.id) } },
    { $group: { _id: "$eventId", avgRating: { $avg: "$rating" } } }
  ]);
  res.send(results);
});

// Get all events
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get("/students",async (req,res)=>{
    try{
        const students = await Student.find();
        res.send(students);
    }
    catch(err){
        res.status(500).send({error:err.message});
    }
});

app.listen(process.env.PORT, () => console.log("Server running on port 5000"));
