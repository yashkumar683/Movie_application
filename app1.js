const { red } = require('colors')
const express = require('express')
const r = require('request')
const e = express()

e.set("view engine","ejs")

e.get('/', (req,res)=>{
    res.render("main.ejs")
})

e.get("/result",(req, res)=>{
    const url = ` http://www.omdbapi.com/?apikey=4ed806c3&s=${req.query.Movie}`
    r(url,function(Error, response, body){
        if(!Error && response.statusCode === 200) {
            const d = JSON.parse(body)
            //res.send(d)
            res.render('res',{moviesd : d})
        }
        else{
            res.send("OOPs! Something went wrong",red)
        }
    })
})

e.get('/result/:id', (req,res)=>{
    const url = ` http://www.omdbapi.com/?apikey=4ed806c3&i=${req.params.id}`
    r(url,function(Error, response, body){
        if(!Error && response.statusCode === 200) {
            const d = JSON.parse(body)
            res.send(d)
        }
        else{
            res.send("OOPs! Something went wrong",red)
        }
    })
})
e.get('*', (req,res)=>{
    res.send(" 404 NOT FOUND")
})

e.listen(5000, ()=>{
    console.log("Server started.")
})