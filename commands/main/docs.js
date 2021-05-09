const error = require('../../utils/error')
const fetch = require('node-fetch')

module.exports = {
  name: "ping",
  minArgs: 1,
  maxArgs: 2,
  perms: [""],
  execute(client, message, args) {
    try {
        let source = args.find(m => /^(--src|-s)\w*$/ig.test(m.trim().toLowerCase()))?.replace(/^(--src|-s)(\w*)$/, "$2") ?? "stable";
        let poss = ["master", "stable", "collection", "commando", "rpc", "akairo", "akairo-master"]
        fetch(`https://djsdocs.sorta.moe/v2/embed?src=${source}&q=${args[0]}`)
            .then(res => res.json()).catch(e => e.send("Errors: "+e))
            .then(m => {

            }).catch(e => e.send("Errors: "+e))
    }catch (e) {
      error.send("Errors:"+e.stack)
    }
  },
};
