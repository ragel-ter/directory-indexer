const express = require('express');
const port = process.env.READ_DIR_LISTENER || 8000;
const logger = require('./utils/logger').getLogger('read-directory-api');
const directoryRouter = require('./directoryRouter');

const app = express();

app.use('/', directoryRouter);

app.listen(port, () => {
    logger.info(`Server is listening on ${port}`);
})