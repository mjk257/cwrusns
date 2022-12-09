const app = require('./app.js');

app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("CWRU SNS Server is Running");
});