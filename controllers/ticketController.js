const db = require('../db');

function nameToNumber(name) {
    if (!name || typeof name !== "string") {
        throw new Error("Input must be a valid string");
    }
    return name.split('').reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 1000000007, 0);
}

// Bilet satın alma
exports.buyTicket = (req, res) => {
    const { date, origin, destination, passenger_name } = req.body;

    console.log("Query Parameters:", { date, origin, destination, passenger_name });

    const sql = `
        SELECT * FROM flights 
        WHERE origin = ? AND destination = ? AND capacity > 0
    `;
    db.query(sql, [origin, destination], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const filteredFlight = results.filter(flight => {
            let flightStart, flightEnd;
            try {
                [flightStart, flightEnd] = Array.isArray(flight.available_dates)
                    ? flight.available_dates
                    : flight.available_dates.split(',');
            } catch {
                console.error(`Invalid available_dates for flight ID ${flight.id}`);
                return false;
            }
            return new Date(flightStart) <= new Date(date) && new Date(flightEnd) >= new Date(date);
        });

        if (filteredFlight.length === 0) {
            return res.status(400).json({ error: 'Flight is fully booked or there is no flight' });
        }

        const ticketId = nameToNumber(passenger_name) + filteredFlight[0].id;
        const sqlInsertTicket = `INSERT INTO tickets (flight_id, passenger_name) VALUES (?, ?)`;
        const sqlUpdateCapacity = `UPDATE flights SET capacity = capacity - 1 WHERE id = ?`;

        db.query(sqlInsertTicket, [ticketId, passenger_name], (err) => {
            if (err) return res.status(500).json({ error: err.message });

            db.query(sqlUpdateCapacity, [filteredFlight[0].id], (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ 
                    status: 'Ticket booked successfully', 
                    ticket_id: ticketId, 
                    passenger_name 
                });
            });
        });
    });
};


// Check-in işlemi
exports.checkIn = (req, res) => {
    const { ticket_id } = req.body;
    const sql = `
        UPDATE tickets SET checked_in = TRUE WHERE flight_id = ?
    `;
    db.query(sql, [ticket_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ status: 'Checked in successfully' });
    });
};
