const express = require("express");
const session = requrie("express-session")
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse HTTP responses
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configuration for session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    resave: true,
    saveUninitialized: false,
    secure: process.env.NODE_ENV == "production"
}));

app.listen(PORT, () => {
    console.log("Server is running at", PORT);
});