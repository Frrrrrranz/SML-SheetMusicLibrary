const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const composersRouter = require('./routes/composers');
// const worksRouter = require('./routes/works');
// const recordingsRouter = require('./routes/recordings');

app.use('/api/composers', composersRouter);
// app.use('/api/works', worksRouter);
// app.use('/api/recordings', recordingsRouter);

app.get('/', (req, res) => {
    res.send('SML Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
