const express = require('express');
const {config} = require('dotenv');
const logger = require('./utils/logger').getLogger('read-directory-api');
const directoryRouter = require('./directoryRouter');

const app = express();

config();

app.use('/', directoryRouter);

const port = parseInt(process.env.APP_LISTENER_PORT) || 3000;

app.listen(port, () => {
    logger.info(`Server is listening on ${port}`);
})