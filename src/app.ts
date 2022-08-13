/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import btoa from "btoa";
import axios from "axios";
import fs from "fs";
import https from "https";
import cron from "node-cron";
import querystring from "querystring";
import bodyParser from "body-parser";
import routes from "./routes";

dotenv.config();

/**
 * App Variables
 */

const PORT: number = parseInt(process.env.PORT as string, 10) || 42069;
const app = express();
const PRIVATEKEY: Buffer = fs.readFileSync("./config/keys/privatekey.pem");
const CERTIFICATE: Buffer = fs.readFileSync("./config/keys/certificate.pem");

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined"));
app.set("trust proxy", true);

app.use("/v2", routes);

app.use((req, res, next) => {
  res.redirect("https://czerwoniakplus.pl");
});

const SERVER: https.Server = https.createServer(
  {
    key: PRIVATEKEY,
    cert: CERTIFICATE,
  },
  app
);

/**
 * Server Activation
 */
SERVER.listen(PORT, () => {
  console.log(`HTTPS server listening on port ${PORT}`);
});
