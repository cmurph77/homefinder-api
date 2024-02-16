const express = require('express')
const app = express()
var bodyParser = require("body-parser")

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET")
    res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization")
    next()
})

app.use(bodyParser.urlencoded({  extended: true }));
app.use(bodyParser.json());

app.post('/authorization', (req, res)=>{
    console.log("request sucess", req.body)
    res.send({
        userInfo: req.body,
        message: 'success, server got the data',
        token: "a-fake-token" 
    })
})

app.get('/authorization', (req,res) => {
    console.log("GET request")
    res.send({
        message: 'success'
    })
})

app.listen(80,() => {
    console.log('express sever running at http://127.0.0.1')
})