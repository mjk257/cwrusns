const mongoose = require('mongoose');
const dbURL = process.env.MONGODB_URL;

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}

mongoose.connect(dbURL, options);