require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./src/routes/routes');
const PORT = process.env.PORT || 3306;
const environment = process.env.NODE_ENV || 'development';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });


    return;
});

app.use(routes);

app.get('*', (req, res) => {
	res.status(404).send('Not found');
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));