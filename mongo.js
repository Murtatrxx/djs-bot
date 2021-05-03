const mongoose = require('mongoose')
const mongoPath = "mongodb+srv://ImRopoxPro:QWERTYUIOPĞÜ@bot.w3m9t.mongodb.net/db01?retryWrites=true&w=majority"

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  return mongoose;
}
