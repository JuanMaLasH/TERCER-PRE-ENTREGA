import express from 'express';
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import passport from 'passport';
import { Server } from "socket.io";
import { initializePassport  } from "./config/passport.config.js";
import cors from "cors";
import path from "path";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import userRouter from"./routes/user.router.js";
import { __dirname } from './utils/hashbcrypt.js';//
import './db/database.js';

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//PASSPORT
app.use(passport.initialize());
initializePassport(); 
app.use(cookieParser());

//AUTHMIDDLEWARE
import authMiddleware from "./middleware/authmiddleware.js";
app.use(authMiddleware);//

//HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//ROUTES
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", userRouter);
app.use("/", viewsRouter);

//LISTEN
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`SERVER UP ON PORT ${PORT}`);
});

//WEBSOCKETS
import SocketManager from "./sockets/socketmanager.js";
new SocketManager(httpServer);
const socketServer = new Server(httpServer);