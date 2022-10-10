/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import fs from "fs";
import https from "https";
import cron from "node-cron";
import bodyParser from "body-parser";
import routes from "./routes";
import refreshNews from "./utils/newsDownloader";

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
app.use(bodyParser.json({ limit: '5mb'}));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json());
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
  console.log("Refreshing news");
  refreshNews();
});

cron.schedule("*/5 * * * *", () => {
  console.log("Refreshing news");
  refreshNews();
});
