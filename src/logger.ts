import winston from 'winston';
import { format as winstonFormat } from 'winston';
import { format as dateFnsFormat } from 'date-fns';

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  http: 'magenta',
  debug: 'white',
};

const dateFormat = 'dd/MM/yyyy, HH:mm:ss';

const timestampFormatter = winstonFormat((info) => {
  info.timestamp = dateFnsFormat(new Date(), dateFormat);
  return info;
});

const colorizer = winston.format.colorize({ colors });


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    timestampFormatter(),
    colorizer,
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}]\t${level} ==> ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export default logger;
