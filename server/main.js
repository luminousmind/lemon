const express = require("express");
const session = require("express-session")
const authRoutes = require("./routes/authRoutes")
const PrismaSessionStore = require("./utils/prismaSessionStore");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse HTTP responses
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configuration for session middleware
app.use(session({
    name: "qid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(),
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
}));

// Server routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log("Server is running at", PORT);
});