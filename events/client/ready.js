const mongo = require("../../mongo")

module.exports = async (client, Discord) => {
  console.log(`${client.user.tag} is ready`);

  await mongo().then(mongoose => {
    try {
      console.log(info(`Connected to MongoDB`))
    } finally {
      mongoose.connection.close()
    }
  })
};
