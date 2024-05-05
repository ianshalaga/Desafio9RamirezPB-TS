/** External */
import express, { Express } from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import socketMessages from "./websockets/socketMessages";
// Utils
import connectDB from "./config/db.config";
import { rootPath } from "./utils/paths";

import middlewares from "./middlewares/middlewares"; // Middlewares
import routes from "./routes/routes"; // Routes
import config from "./config/env.config";

const PORT = config.port;

const app: Express = express(); // Express.js application instance creation

// Express.js server start
const httpServer = app.listen(PORT, () =>
  console.log(`Servidor de Express.js corriendo en el puerto: ${PORT}`)
);

// Socket.IO server start in same port that httpServer
const io = new Server(httpServer);

// Handlebars configuration
app.set("views", rootPath + "/src/views"); // Sets the path where Express will look for the views of the application
app.engine("handlebars", handlebars.engine()); // Sets up Handlebars as the template engine for Express.js. Allows to use Handlebars template files (*.handlebars).
app.set("view engine", "handlebars"); // Sets Handlebars to view engine for Express application

app.use(middlewares); /** MIDDLEWARES */
app.use(routes); /** ROUTES */

/** WEBSOCKETS */
socketMessages(io);

connectDB(); // MongoDB
