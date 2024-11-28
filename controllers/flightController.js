const db = require('../db');
const applyPaging = require('../utils/paging');

exports.queryFlights = (req, res) => {
    const { date, origin, destination, page = 1, limit = 10 } = req.query;

    console.log("Query Parameters:", { date, origin, destination, page, limit });

    const sql = `
    SELECT * FROM flights 
    WHERE origin = ? 
      AND destination = ?
      AND capacity > 0
    `;
    db.query(sql, [origin, destination], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const flights = results.filter(flight => {
            const [flightStart, flightEnd] = flight.available_dates;
            return new Date(flightStart) <= new Date(date) && new Date(flightEnd) >= new Date(date);
        });

        const paginatedResults = applyPaging(flights, parseInt(page), parseInt(limit));

        res.status(200).json({ flights: paginatedResults  });
    });
};
