const mongoose = require("mongoose")

const reqString = {
    type: String,
    require: true
}

const serverSettingsSchema = new mongoose.Schema({
    _id: reqString,
    prefix: reqString,
    slash: Boolean
})

module.exports = mongoose.model('serverSettings', serverSettingsSchema)