const express = require('express');
const {config} = require('dotenv');
const cors = require('cors');
const logger = require('./utils/logger').getLogger('read-directory-api');
const directoryRouter = require('./directoryRouter');

const app = express();

config();

const corsOptions = {
    origin: process.env.ALLOWED_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions))
app.use('/api/', directoryRouter);

const port = parseInt(process.env.APP_LISTENER_PORT) || 3000;

app.listen(port, () => {
    logger.info(`Server is listening on ${port}`);
})