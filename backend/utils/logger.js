const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, prettyPrint } = format;
const loggers = [];

function getLogger(forContext) {
    let context = forContext ?? 'default-context';

    let existingLogger = loggers?.find((logger) => {
        return logger.forContext === context;
    })

    if (existingLogger) {
        return existingLogger.logger;
    }

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

    loggers.push([{forContext: context, logger: logger}]);

    return logger;
}

module.exports = {
    getLogger
}
