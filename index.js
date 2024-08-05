const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 6001;

// middleware
app.use(cors());
app.use(express.jason())

app.get('/', (req, res) => {
  res.send('Hello Devlopers!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})