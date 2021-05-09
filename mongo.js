const mongoose = require('mongoose');
const { mongoPass } = process.env.MONGOPASS

module.exports = async () => {
    await mongoose.connect(mongoPass, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    return mongoose
}