# Airline Company API Project

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

1. Clone the repository:
   ```bash
   git clone <repository-url>
