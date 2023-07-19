const express=require("express")
const route1=require("./route")
var cors = require('cors')
const  app=express()

app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.use(route1)
app.get("/",(req,res)=>{
    res.send("API Running sucessfilly")
})

app.listen(9000,()=>{
    console.log("Server is running at 9000 port");
})