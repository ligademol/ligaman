const express = require('express');
const bodyParser  = require('body-parser');
const cors = require('cors');
const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use('/api', require('./routes/api'));

var server = app.listen(process.env.PORT || 3000, ()=> 
console.log(`ligademol app listening  ${server.address().port}`));