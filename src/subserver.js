const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

const logData = (req, res) => {
  console.log(req.body);
};

app.post('/test1', logData);

app.post('/test2', logData);

const PORT = process.env.SUBPORT || 9000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
