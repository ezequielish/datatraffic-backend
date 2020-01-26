const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").Server(app);
const helmet = require("helmet");
const cors = require("cors");
const db = require("./db");
const { host_app, port_serve } = require("./config");
const { routes } = require('./network/routes')

const corsOptions = { origin: "*" };
const port = process.env.PORT || 3000;
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

db()
routes(app)

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middlewares/errorHandlers.js');
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);


app.listen(port, () =>{
    console.log(`Escuchando en el puerto ${port}`)
})
