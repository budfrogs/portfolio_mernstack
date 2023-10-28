const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = { origin: '*', optionsSuccesStatus: 200 };
require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5001;
app.use(cors(corsOptions));
app.use(express.json());
app.use(require('./routes/movie'));

//get the driver connection
const dbo = require('./db/conn');

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
