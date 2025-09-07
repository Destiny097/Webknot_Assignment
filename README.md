This is a NodeJS based Project made in accordance with the Campus Drive Assignment given by Webknot Technologies.
The main aim of this Repository/Project is make the Campus Event Managaement Platform API and endpoints that allows colleges to manage student registrations, event attendance, and feedback for campus events. The platform provides RESTful APIs for creating events, registering students, marking attendance, submitting feedback, and generating reports.

Features
-Student Management : Add and View Students.
-Event Management : Create and View Events.
-Registration : Register students for events.
-Attendance : Mark student attendance for events.
-Feedback: Submit feedback and ratings for events.
-Reports: Generate reports for popular events, student participation, top students, and average event feedback.

Technologies Used
-NodeJs
-ExpressJs
-MongoDB(via Mongoose)
-dotenv

How to Get Started ?
Prerequisites

-[Node.js](https://nodejs.org/) (v18 or above recommended)
-[MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB instance)

Installation

1. Clone the repository:

   sh
   git clone <your-repo-url>
   cd WebKnot_Assignment
   

2. Install dependencies:

   sh
   npm install
   

3. Configure environment variables:

   - Edit the `.env` file with your MongoDB connection string and desired port.
   - Example `.env`:
     ```
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```

4. Seed the database (optional, for sample data):

   sh
   node seed.js
   

5. Start the server:

   sh
   npm start
   

   The server will run on the port specified in `.env` (default: 5000).

API Endpoints

Students

- `POST /students` — Add a new student
- `GET /students` — Get all students

Events

- `POST /events` — Create a new event
- `GET /events` — Get all events

Registration

- `POST /events/:id/register` — Register a student for an event

Attendance

- `POST /events/:id/attendance` — Mark attendance for a student

Feedback

- `POST /events/:id/feedback` — Submit feedback for an event

Reports

- `GET /reports/popular-events` — Get events sorted by number of registrations
- `GET /reports/student/:id` — Get number of events attended by a student
- `GET /reports/event/:id` — Get average feedback rating for an event
- `GET /reports/top-students` — Get top 3 students by attendance

Project Structure

```
.env
.gitignore
package.json
seed.js
server.js
models/
  Attendance.js
  Event.js
  Feedback.js
  Registration.js
  Student.js
```

Notes

- Make sure your MongoDB URI in `.env` is correct and accessible.
- The sample data can be seeded using `node seed.js`.
- All API requests and responses are in JSON format.
