const express = require ('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require ('cors')
const knex = require("./database/connection")

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

/////////////////////////////Ganho/////////////////////////////////////////
app.post("/ganhos",(req,res) =>{
    var {id,nome,valor} = req.body

    if(nome == undefined || nome == ""){
        res.status(400)
        res.json({err: "O nome invalido!"})
        return
    }

    if(valor == isNaN || valor == undefined || valor == ""){
        res.status(400)
        res.json({err: "So numero e não pode esta vazio"})
        return
    }



    knex.insert({nome,valor}).table("ganho").then(() =>{
        res.sendStatus(200)
    }).catch(() =>{
        res.sendStatus(404)
    })

})


app.get("/ganhos",(req,res) =>{
    knex.select(["id","nome","valor"]).table("ganho").then((data) =>{
        res.status(200)
        res.json(data)
    }).catch(err =>{
        console.log(err)
        res.status(404)
    })
})



app.get("/ganhos/:id",(req,res) =>{
   
    var id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400)
    }else{

        var id = parseInt(id)
        knex.select(["id","nome","valor"]).where({"id":id}).table("ganho").then(data =>{
       
            var data = data

            var ganho = data.find(g => g.id == id)
            if(ganho != undefined){
               res.status(200)
                res.json(data)
            }else{
                res.sendStatus(404)
            }
       

        })
    }
})


//Deletando

app.delete("/ganhos/:id",(req,res) => {

    var id = req.params.id;
    var id = parseInt(id)

 
      knex.select(["id"]).where({"id":id}).table("ganho").then(data =>{
          var data = data
          var index = data.findIndex(g => g.id == id)

          if(index == -1){
            res.sendStatus(404)
        }else{
            knex.delete().where({"id":id}).table("ganho").then(()=>{
                  
            })
            res.sendStatus(200)
        }
        })
       

})

//Update

app.put("/ganhos/:id",(req,res) =>{

    var id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400)
    }else{

        var id = parseInt(id)
        knex.select(["id","nome","valor"]).where({"id":id}).table("ganho").then(data =>{
       
            var data = data

            var ganho = data.find(j => j.id == id)

            var  {nome, valor} = req.body

            if(ganho != undefined){
                knex.update({"nome":nome,"valor":valor}).where({"id":id}).table("ganho").then((data)=>{
                    console.log(data)
                    res.sendStatus(200)
                })

            }else{

                res.sendStatus(404)
            }
       

        })
    }
})



/////////////////////////////Gasto/////////////////////////////////////////
app.post("/gastos",(req,res) =>{
    var {id,gasto,valor} = req.body

    if(gasto == undefined || gasto == ""){
        res.status(400)
        res.json({err: "O gasto é invalido!"})
        return
    }

    if(valor == isNaN || valor == undefined || valor == ""){
        res.status(400)
        res.json({err: "So numero e não pode esta vazio"})
        return
    }



    knex.insert({gasto,valor}).table("gasto").then(() =>{
        res.sendStatus(200)
    }).catch(() =>{
        res.sendStatus(404)
    })

})


app.get("/gastos",(req,res) =>{
    knex.select(["id","gasto","valor"]).table("gasto").then((data) =>{
        res.status(200)
        res.json(data)
    }).catch(err =>{
        console.log(err)
        res.status(404)
    })
})



app.get("/gastos/:id",(req,res) =>{
   
    var id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400)
    }else{

        var id = parseInt(id)
        knex.select(["id","gasto","valor"]).where({"id":id}).table("gasto").then(data =>{
       
            var data = data

            var custo = data.find(g => g.id == id)
            if(custo != undefined){
               res.status(200)
                res.json(data)
            }else{
                res.sendStatus(404)
            }
       

        })
    }
})


//Deletando

app.delete("/gastos/:id",(req,res) => {

    var id = req.params.id;
    var id = parseInt(id)

    if(id == isNaN ){
        res.sendStatus(404)
        res.json({err: "So numero e não pode esta vazio"})
        
    }else{

      knex.select(["id"]).where({"id":id}).table("gasto").then(data =>{
          var data = data
          var index = data.findIndex(g => g.id == id)

          if(index == -1){
            res.sendStatus(404)
        }else{
            knex.delete().where({"id":id}).table("gasto").then(()=>{
                  
            })
            res.sendStatus(200)
        }
        })
       }

})

//Update

app.put("/gastos/:id",(req,res) =>{

    var id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400)
    }else{

        var id = parseInt(id)
        knex.select(["id","gasto","valor"]).where({"id":id}).table("gasto").then(data =>{
       
            var data = data

            var ganho = data.find(j => j.id == id)

            var  {gasto, valor} = req.body

            if(ganho != undefined){
                knex.update({"gasto":gasto,"valor":valor}).where({"id":id}).table("gasto").then((data)=>{
                    console.log(data)
                    res.sendStatus(200)
                })

            }else{

                res.sendStatus(404)
            }
       

        })
    }
})



/////////////////////////////Galoes Quantidade/////////////////////////////////////////
app.post("/galoes",(req,res) =>{
    var {id,nome,quantidade} = req.body

    if(nome == undefined || nome == ""){
        res.status(400)
        res.json({err: "O nome invalido!"})
        return
    }

    if(quantidade == isNaN || quantidade == undefined || quantidade == ""){
        res.status(400)
        res.json({err: "So numero e não pode esta vazio"})
        return
    }



    knex.insert({nome,quantidade}).table("galao").then(() =>{
        res.sendStatus(200)
    }).catch(() =>{
        res.sendStatus(404)
    })

})

//pesquisa jogo
app.get("/galoes",(req,res) =>{
    knex.select(["id","nome","quantidade"]).table("galao").then((data) =>{
        res.status(200)
        res.json(data)
    }).catch(err =>{
        console.log(err)
        res.status(404)
    })
})

//pesquisa id

app.get("/galoes/:id",(req,res) =>{
   
    var id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400)
    }else{

        var id = parseInt(id)
        knex.select(["id","nome","quantidade"]).where({"id":id}).table("galao").then(data =>{
       
            var data = data

            var quantidade = data.find(g => g.id == id)
            if(quantidade != undefined){
               res.status(200)
                res.json(data)
            }else{
                res.sendStatus(404)
            }
       

        })
    }
})


//Deletando

app.delete("/galoes/:id",(req,res) => {

    var id = req.params.id;
    var id = parseInt(id)

    if(id == isNaN ){
        res.sendStatus(404)
        res.json({err: "So numero e não pode esta vazio"})
        
    }else{

      knex.select(["id"]).where({"id":id}).table("galao").then(data =>{
          var data = data
          var index = data.findIndex(g => g.id == id)

          if(index == -1){
            res.sendStatus(404)
        }else{
            knex.delete().where({"id":id}).table("galao").then(()=>{
                  
            })
            res.sendStatus(200)
        }
        })
       }

})

//Update

app.put("/galoes/:id",(req,res) =>{

    var id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400)
    }else{

        var id = parseInt(id)
        knex.select(["id","nome","quantidade"]).where({"id":id}).table("galao").then(data =>{
       
            var data = data

            var ganho = data.find(j => j.id == id)

            var  {nome, quantidade} = req.body

            if(ganho != undefined){
                knex.update({"nome":nome,"quantidade":quantidade}).where({"id":id}).table("galao").then((data)=>{
                    console.log(data)
                    res.sendStatus(200)
                })

            }else{

                res.sendStatus(404)
            }
       

        })
    }
})


/////////////////////////////Fiado/////////////////////////////////////////
app.post("/fiados",(req,res) =>{
    var {id,nome,valor} = req.body

    if(nome == undefined || nome == ""){
        res.status(400)
        res.json({err: "O nome invalido!"})
        return
    }

    if(valor == isNaN || valor == undefined || valor == ""){
        res.status(400)
        res.json({err: "So numero e não pode esta vazio"})
        return
    }



    knex.insert({nome,valor}).table("fiado").then(() =>{
        res.sendStatus(200)
    }).catch(() =>{
        res.sendStatus(404)
    })

})


app.get("/fiados",(req,res) =>{
    knex.select(["id","nome","valor"]).table("fiado").then((data) =>{
        res.status(200)
        res.json(data)
    }).catch(err =>{
        console.log(err)
        res.status(404)
    })
})



app.get("/fiados/:id",(req,res) =>{
   
    var id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400)
    }else{

        var id = parseInt(id)
        knex.select(["id","nome","valor"]).where({"id":id}).table("fiado").then(data =>{
       
            var data = data

            var ganho = data.find(g => g.id == id)
            if(ganho != undefined){
               res.status(200)
                res.json(data)
            }else{
                res.sendStatus(404)
            }
       

        })
    }
})


//Deletando

app.delete("/fiados/:id",(req,res) => {

    var id = req.params.id;
    var id = parseInt(id)

    if(id == isNaN ){
        res.sendStatus(404)
        res.json({err: "So numero e não pode esta vazio"})
        
    }else{

      knex.select(["id"]).where({"id":id}).table("fiado").then(data =>{
          var data = data
          var index = data.findIndex(g => g.id == id)

          if(index == -1){
            res.sendStatus(404)
        }else{
            knex.delete().where({"id":id}).table("fiado").then(()=>{
                  
            })
            res.sendStatus(200)
        }
        })
       }

})

//Update

app.put("/fiados/:id",(req,res) =>{

    var id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400)
    }else{

        var id = parseInt(id)
        knex.select(["id","nome","valor"]).where({"id":id}).table("fiado").then(data =>{
       
            var data = data

            var ganho = data.find(j => j.id == id)

            var  {nome, valor} = req.body

            if(ganho != undefined){
                knex.update({"nome":nome,"valor":valor}).where({"id":id}).table("fiado").then((data)=>{
                    console.log(data)
                    res.sendStatus(200)
                })

            }else{

                res.sendStatus(404)
            }
       

        })
    }
})






app.listen(8686,()=>{
    console.log("Api Rodando")
})