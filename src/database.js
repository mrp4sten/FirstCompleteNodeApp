const mongoose = require("mongoose");

const tempMongoUri = "mongodb+srv://mrp4sten:MiCuent4Mongo239@firstcompletenodeapp.ch50k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(process.env.MONGO_URI || tempMongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error("An error ocurred:" + err));
