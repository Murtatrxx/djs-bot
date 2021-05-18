const mongo = require("../../mongo")
const serverSettingsSchema = require("../../Schema/serversettings")

module.exports = async (client, Discord) => {
  console.log(`${client.user.tag} is ready`);

  await mongo().then(mongoose => {
    try {
      console.log(`Connected to MongoDB`)
      serverSettingsSchema.find({}).then(m => {
        m.forEach(g => {
          client.cache.set(g._id, g)
        })
      })
    } catch (e){
      console.log(e)
    }
  })
};
