# Airline Company API Project and Project Presentation

1)Airline Company API Project

This project is an API for a fictitious airline company where admins can manage flights, and clients can perform ticketing operations via a mobile app.

## Project Overview

### Admin Features:
1. **Insert Flight**: Create new flights with details like origin, destination, dates, and capacity.
2. **Report Flights with Capacity**: Generate reports for flights based on capacity and other filters.

### Mobile App Features:
1. **Query Flights**: Search for flights based on dates, origin, and destination.
2. **Buy Ticket**: Book tickets for available flights.
3. **Check-in**: Mark a flight ticket as checked-in.

### Other Features:
- **Authentication**: Admin actions require JWT-based authentication.
- **Paging**: Certain endpoints support paging for results.

- ** "available_dates" assumes that flights are in the date range and "days_of_week" assumes that flights are repeated on which days of the week.

---

## API Endpoints

### Admin Endpoints (Require Authentication)
- **POST /api/admin/flights**: Insert a new flight.
- **POST /api/admin/creports**: Generate flight reports.

### Mobile App Endpoints
- **GET /api/flights**: Query available flights.
- **POST /api/tickets/buy**: Buy a ticket for a flight.
- **POST /api/tickets/checkin**: Check-in for a flight.

### Authentication Endpoints
- **POST /api/auth/login**: Generate a JWT token for admin authentication.

---

## Assumptions
1. Flights have recurring schedules and specific capacity constraints.
2. Authentication is only required for admin actions.
3. Tickets are booked without payment processing.

---

## Database Schema

**Tables**:
1. `flights`: Stores flight details.
2. `tickets`: Stores ticket details, including passenger names and check-in status.

---

## Installation and Setup

2) Project Presentation

*** Output images: https://drive.google.com/drive/folders/1yEDzd0YauPKRX5uOXGkkbiUABOdPRcnD?usp=drive_link ***

Firstly, i created "swagger.json" for documentation. It outlines paths like /api/admin/flights (for inserting flights) and /api/tickets/buy (for ticket booking). Each path includes information about the required parameters, request body, and potential responses.

"authController"  I implemented a secure login system. If the provided username and password match the credentials (e.g., "admin" and "password"), a JWT token is generated with a 1-hour expiration. This token includes the user's role, allowing protected access to admin operations.

            jwt.verify(token, secretKey, (err, user) => {
                if (err) return res.status(403).json({ error: "Invalid or expired token." });
                req.user = user;
                next();
            });

Admin Panel: "adminController" contains 2 functions. These are for "insert" and "capacity_check" operations. In all my functions, I manage my database with sql commands. I also wrote a function to generate reports on flights. You can filter flights based on their origin, destination, capacity, and availability within a date range. Pagination is applied to handle large data sets efficiently.

"flightController", This feature lets users search for flights based on specific criteria—like date, origin, and destination. Only flights with available capacity are returned. I added a filter to ensure flights fall within the selected date range.

            const flights = results.filter(flight => {
                const [flightStart, flightEnd] = flight.available_dates;
                return new Date(flightStart) <= new Date(date) && new Date(flightEnd) >= new Date(date);
            });


"ticketController" "buy_Ticket" I made it easy to book tickets. The system checks for flights with available seats and then generates a unique ticket ID based on the passenger's name. Once a ticket is booked, the flight's capacity is decreased to reflect the booking.

            const ticketId = nameToNumber(passenger_name) + filteredFlight[0].id;
            db.query(sqlInsertTicket, [ticketId, passenger_name], ...);

For checked_in:
            
            const sql = `UPDATE tickets SET checked_in = TRUE WHERE flight_id = ?`;
            db.query(sql, [ticket_id], ...);

For paging:

            const applyPaging = (results, page = 1, limit = 10) => {
                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;
                return results.slice(startIndex, endIndex);
            };


I set up the connection to the MySQL database using mysql2

            const db = mysql.createConnection({
                host: '34.69.212.53',   //google cloud IP
                port: '3306',
                user: 'root',
                password: 'se4458midterm',
                database: 'airplane',
            });
  
For Heroku Error Procfile and .env




