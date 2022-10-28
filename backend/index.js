const express = require('express');
require('dotenv').config();

const connectDB = require('./config/db.js');
const { errorHandler } = require('./middleware/errorMiddleware');

const port = process.env.PORT || 4000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
