const express=require("express")
const verification=require("./authorization")
const route=express.Router()
const {register,login}=require("./register")
route.post("/register",register)
route.post("/login",login)

module.exports=route
