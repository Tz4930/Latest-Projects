const express = require("express") ;
const mongoose = require('mongoose');
const cors =require("cors") ;
const dotenv = require('dotenv');
const routes = require('./src/routes');
const {handleError} =require('./src/utils/error')
const bodyParser = require('body-parser')
// MiddleWare Configuration
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(handleError);

// Route Configuration
app.use("/api/v1/",routes);

const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}
).then(() =>{
    app.listen(PORT,()=> console.log(`Server Is Running On Port : ${PORT}`))
}).catch((err)=> console.log(`PORT : ${err} did not connect`))
