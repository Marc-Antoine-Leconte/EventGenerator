// defining the server port
const DEFAULT_PORT = 5000

// initializing installed dependencies
const express = require('express')
require('dotenv').config()
const axios = require('axios')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv');
app.use(cors())

var googleSheetAPI = require('./googleSheetApi.js');

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || DEFAULT_PORT;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
    // Priority serve any static files.
    app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

    // API request
    app.get('/', (req,res)=>{    
    
        googleSheetAPI.GetGoogleSheet(function (response) {
            console.log('SUCCESS -> ', response);
            res.json(response);
        }, function (error) {
            console.error(error);
        });
    });

    // All remaining requests return the React app, so it can handle routing.
    app.get('*', function(request, response) {
        response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
    });

    app.listen(PORT, function () {
        console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
      });
}