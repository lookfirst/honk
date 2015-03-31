import winston from 'winston';
import 'colors';

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
	level: 'debug', colorize: true, timestamp: true, prettyPrint: true, handleExceptions: true
});

export default winston;
