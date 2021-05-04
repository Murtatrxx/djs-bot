const express = require('express');

const app = express();

app.post('/restart/'+process.env.RESTART, (req, res) => {
		res.sendStatus(200)
		process.exit(2)
})

app.listen(4000, () => {
  console.log('server started');
});