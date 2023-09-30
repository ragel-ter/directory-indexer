const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, prettyPrint } = format;

function getLogger(forContext) {
    let context = forContext ?? 'default-context';

    let logger = createLogger({
        level: 'debug',
        format: combine(
            timestamp(),
            colorize({colors: { debug: 'blue', error: 'red', warn: 'yellow'}}),
            prettyPrint({depth: 1, colorize: true}),
        ),
        defaultMeta: { context: `${context}` },
        transports: [
            new transports.File({ filename: 'error.log', level: 'error' }),
            new transports.File({ filename: 'combined.log' }),
        ],
    });

    if (process.env.NODE_ENV !== 'production') {
        logger.add(new transports.Console({
            format: format.simple(),
        }));
    }

    return logger;
}

module.exports = {
    getLogger
}
