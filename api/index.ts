import express from "express";
import dotenv from "dotenv";
import routes from "./routes.ts";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

declare module "express-session" {
  interface SessionData {
    user?: {
      email: string;
      role: string;
      id: number;
    };
  }
}

export const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET_SESSION!,
    name: "sessionID",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: new Date(Date.now() + 1000 * 60 * 60),
      maxAge: 1000 * 60 * 60,
      path: "/",
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

routes(app);

app.listen(process.env.PORT, (e) => {
  console.log(e ? e : `app listening on  http://localhost:${process.env.PORT}`);
});
