// logger defintion 

const { mkdirSync, existsSync } = require('fs');
const safeStringify = require('fast-safe-stringify');
const { winston } = require("@strapi/logger");
const moment = require('moment');
require('winston-daily-rotate-file');

const APP_NAME = 'LINZAKA_SERVICE'
const NODE_ENV = process.env.NODE_ENV
const LOGPATH = './logs/'
const LOG_FILE_NAME = `${LOGPATH}/${APP_NAME}-%DATE%-{{suffix}}.log`

const { printf, combine, timestamp, label } = winston.format;

// Our Custom Format of Logging

const logCustomFormat = printf(

    ({ level, message, label, timestamp, stack, info }) => {

        return safeStringify({
            timestamp,
            label,
            message,
            info: info,
            stack,

        });

    }

);

if (NODE_ENV === 'development') {

    module.exports = {
        transports: [
            new winston.transports.Console({
                format: combine(label({ label: APP_NAME }), timestamp(), logCustomFormat),
            }),

        ],

    }

} else {

    module.exports = {

        format: winston.format.combine(label({ label: APP_NAME }), timestamp(), logCustomFormat),
        transports: [

            new winston.transports.DailyRotateFile({
                filename: LOG_FILE_NAME.replace('{{suffix}}', process.env.CONTAINER_ID),
                datePattern: 'YYYY-MM-DD',
                timestamp: moment().format('DD/MM/YYYY'),
                prepend: true,
                handleExceptions: true
            })

        ]

    }

}