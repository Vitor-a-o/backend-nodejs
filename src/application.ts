import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { promises as fs } from "fs";
import winston from "winston";
import router from '../main/routes/account.route';

const { readFile, writeFile } = fs;

//Criação do logger

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "caixa_eletronico.log" })
    ],
    format: combine(
        label({ label: " caixa eletronico " }),
        timestamp(),
        myFormat
    )
});

dotenv.config()

const application = express()

application.use(bodyParser.text())
application.use(express.json())
application.use(express.urlencoded({ extended: false }))
application.use(cors())
application.use(router) 

application.get('/', (req, res) => {
    res.send('Hello World!')
})

application.set('port', process.env.APP_PORT || 5000)

export { application, logger}