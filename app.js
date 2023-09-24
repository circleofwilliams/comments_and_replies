require('dotenv').config();
const express = require ('express');
const mongoose = require('mongoose');
const commentRoute = require('./routes/commentRoutes.js');

const app = express();
const port = process.env.PORT;
const dbURI = process.env.DB_URL + '/' + process.env.DB_NAME;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200);
  res.send('Welcome to the root URL')
})

app.use('/comment', commentRoute)

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to Database successfully!', dbURI);
    app.listen(port, (error) => {
      if (error) {
        console.log('Error launching server', error);
      }
      else {
          console.log('Server sucessfully launched on port', port);
      }
    });
  })
  .catch((error) => {
    console.log('An error occured while connecting to Database...', dbURI);
    console.log('Cannot start server, connection with database not established...');
  })



