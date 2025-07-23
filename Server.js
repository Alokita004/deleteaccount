const express = require('express');
const bodyParser = require('body-parser');
const deleteRoute = require('./routes/deleteAccount');

const app = express();
app.use(bodyParser.json());

app.use('/api', deleteRoute); // Endpoint will be /api/delete-account

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
