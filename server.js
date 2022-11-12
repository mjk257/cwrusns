const app = require('./app.js');

// mongoose.connect("mongodb+srv://admin:W1llmgEj0SdeZTQw@cluster0.rlpardo.mongodb.net/?retryWrites=true&w=majority", {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true
// })
app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("CWRU SNS Server is Running");
});