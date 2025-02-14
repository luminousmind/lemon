const express = require("express");
const session = require("express-session");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes")
const PrismaSessionStore = require("./utils/prismaSessionStore");
const cleanupSessions = require("./utils/cleanupSessions");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://127.0.0.1:5173", credentials: true}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    name: "qid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(),
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

setInterval(() => {
    cleanupSessions();
}, 1000 * 60 * 60 * 24);

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log("Server is running at", PORT);
});