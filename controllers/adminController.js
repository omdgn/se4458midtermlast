const db = require('../db');
const applyPaging = require('../utils/paging'); 


// Yeni uçuş ekleme
exports.insertFlight = (req, res) => {
    const { origin, destination, available_dates, days_of_week, capacity } = req.body;
    console.log("req.body",req.body)
    const sql = `
    INSERT INTO flights (origin, destination, available_dates, days_of_week, capacity)
    VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            origin,
            destination,
            JSON.stringify(available_dates),
            JSON.stringify(days_of_week),
            capacity,
        ],
        (err) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ status: 'Flight added successfully' });
        }
    );
};



// Kapasiteli uçuşları raporlama
exports.getFlightReport = (req, res) => {
    const { origin, destination, capacity, dates, page = 1, limit = 10 } = req.body; 

    const sql = `
        SELECT * FROM flights 
        WHERE origin = ? 
          AND destination = ? 
          AND capacity <= ?
    `;
    db.query(sql, [origin, destination, capacity], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        // Filter flights by date range
        const flights = results.filter(flight => {
            const [flightStart, flightEnd] = flight.available_dates;
            const [myStart, myEnd] = dates;
            return new Date(flightStart) <= new Date(myStart) && new Date(flightEnd) >= new Date(myEnd);
        });


        const paginatedResults = applyPaging(flights, parseInt(page), parseInt(limit));
        res.status(200).json({ flights: paginatedResults });
    });
};










