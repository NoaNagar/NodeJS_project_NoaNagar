import configDotEnv from "./config";
import express, { json } from "express";
import { notFound } from "./middleware/not-found";
import { usersRouter } from "./routes/users";
import { connect } from "./database/connection";
import { errorHandler } from "./middleware/error-handler";
import morgan from "morgan";
import cors from "cors";
import { cardsRouter } from "./routes/cards";

configDotEnv();
connect();

const app = express();

app.use(cors());

app.use(express.static("public"));
// middleware chain:
app.use(json());
app.use(morgan("dev"));
app.use("/api/v1/users", usersRouter); //next(err)
app.use("/api/v1/cards", cardsRouter); //next(err)
app.use(errorHandler);
app.use(notFound);

app.listen(8080);
