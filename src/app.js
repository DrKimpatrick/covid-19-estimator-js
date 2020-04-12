const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const Routes = require('./routes');

dotenv.config();

// Initialize the app
const app = express();

app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/v1', Routes);

// Setup server port
const PORT = process.env.PORT || 3000;

// Launch app to listen to a specific port
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Running Banka on port ${PORT}`);
});

module.exports = app;
