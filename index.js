const express = require('express');
const app = express();
const http = require('http').createServer(app);
const router = require('./routes/router');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Set the default views directory to html folder
app.set('views', path.join(__dirname, 'views'));
// Set the folder for css & java scripts
app.use(express.static(path.join(__dirname,'/views/assets/dist')));
app.set('view engine', 'ejs');
app.use('/', router);
// set port, listen for requests
const PORT = process.env.PORT || 8091;
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});