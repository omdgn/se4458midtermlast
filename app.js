const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const flightRoutes = require('./routes/flightRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const authRoutes = require('./routes/authRoutes'); 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');



const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/auth', authRoutes); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
