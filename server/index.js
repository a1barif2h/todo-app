const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandlers/todoHandlers")

require("dotenv").config();

// express app initialization
const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_Name = process.env.DB_NAME;
const DB_PASS = process.env.DB_PASS;

// database connection with mongoose

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.5uytj.mongodb.net/${DB_Name}?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => console.log("connection successful"))
.catch(err => console.log(err))

// application routes

app.use("/todo", todoHandler);

// default error handler

function errorHandler(err, req, res, next) {
    if(res.headersSent) {
        return next(err)
    }

    res.status(500).json({error: err})
}

app.listen(PORT, () => {
    console.log(`app listening at port ${PORT}`)
})