const express = require('express')
const cors = require('cors')
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const app = express()
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());

app.use(cors())

app.use('/user', userRouter)
app.use('/admin',adminRouter)


app.listen(port, ()=>{
    console.log("server running")
})