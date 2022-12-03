const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const knex = require("./database/connection")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get("/carretos",(req,res) =>{

    knex.select(["id","name","email"]).table("frete").then((data)=>{
        res.status(200)
        res.json(data)
    }).catch(err =>{
        console.log(err)
        res.status(404)
    })

   
})

app.get("/carreto/:id",(req,res) =>{
   
    var id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400)
    }else{

        var id = parseInt(id)
        knex.select(["id","name","email"]).where({"id":id}).table("frete").then(data =>{
       
            var data = data

            var frete = data.find(g => g.id == id)
            if(frete != undefined){
               res.status(200)
                res.json(data)
            }else{
                res.sendStatus(404)
            }
       

        })
    }
})

app.post("/carretos",(req,res) =>{
 var {id,name,email} = req.body



 knex.insert({name,email}).table("frete").then(() =>{
    res.sendStatus (200);  
 }).catch(() =>{
    res.sendStatus(404);
 })
    
})

app.delete("/games/:id",(req,res) => {

    var id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400)
    }else{

        var id = parseInt(id)
        knex.select(["id","name","email"]).where({"id":id}).table("frete").then(data =>{
       
            var data = data

            var frete = data.find(g => g.id == id)
            if(frete != undefined){
               res.status(200)
                res.json(data)
            }else{
                res.sendStatus(404)
            }
       
        })
    }

})


app.listen(8080,()=>{
    console.log("Api Rondando")
})